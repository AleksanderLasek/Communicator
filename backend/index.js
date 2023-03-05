import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import axios from "axios";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = 5000;

const MONGO_USERNAME = "Ciczau";
const MONGO_PASSWORD = "Chattly1234";

const connectionString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.036klqp.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const connectToDB = await client.connect();
const db = await connectToDB.db();
const Users = db.collection("users");

const generateRefreshToken = (name, surName, email) => {
    return jwt.sign({name, surName, email}, process.env.JWT_SECRET_KEY, {expiresIn: '864000s'});
}

const Register = async(req, res) => {
    const { name, surname, password, email } = req.body;
    if(!name || !surname || !password || !email) {
        return res.status(201).send({msg: 'Invalid data'});
    }
    const ifUserIsInDB = await Users.findOne({email: email});
    if(ifUserIsInDB) {
        return res.status(202).send({msg: 'This email address is taken!'});
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    try {
        await Users.insertOne({
            name: name,
            surname: surname,
            password: encryptedPassword,
            email: email,
            refreshToken: ''
        })
        return res.status(200).send({msg: 'Registered successfully'});
    }catch(err){
        return res.status(203).send({msg: 'Something went wrong'});
    }
}
const Login = async(req, res) => {
    const {email, password} = req.body;
    if(!password || !email) {
        return res.status(201).send({msg: 'Invalid data'});
    }
    const user = await Users.findOne({email: email});
    if(!user) {
        return res.status(202).send({msg: 'User not found'});
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        return res.status(203).send({msg: 'Wrong password'});
    }
    const refreshToken = generateRefreshToken(user.name, user.surName, user.email);
    await Users.updateOne({email: email}, {
        $set: {refreshToken: refreshToken}
    });
    return res.status(200).send({msg: 'Logged succesfully', refreshToken});
}
app.use(express.json());
app.use(cors());
app.post('/users', Register);
app.post('/users/login', Login);


app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT} `);
})

