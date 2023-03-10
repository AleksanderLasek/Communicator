import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import axios from "axios";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
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

const generateRefreshToken = (name, surname, email) => {
    return jwt.sign({name, surname, email}, process.env.JWT_SECRET_KEY, {expiresIn: '864000s'});
}
const generateAccessToken = (name, surname, email, avatar) => {
    return jwt.sign({name, surname, email, avatar}, process.env.JWT_SECRET_ACCESS_KEY, {expiresIn: '15s'});
}

const refreshToken = async(req, res) => {
    try {
        const { refreshToken } = req.body;
        if(!refreshToken) return res.status(401).send({msg: 'Token error'});
        const user = await Users.findOne({refreshToken: refreshToken});
        if(!user) return res.status(402).send({msg: 'Cannot find user with this token'});
        const tokenVerify = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        if(!tokenVerify) {
            return res.status(403).send({msg: 'Token verification went wrong'});
        }else{
            console.log(user.avatar);
            const accessToken = generateAccessToken(user.name, user.surname, user.email, user.avatar);
            return res.status(200).send({accessToken});
        }
    }catch(err){
        console.log(err);
    }
}

const Register = async(req, res) => {
    const { name, surname, password, email, avatar } = req.body;
    if(!name || !surname || !password || !email) {
        return res.status(401).send({msg: 'Invalid data'});
    }
    const ifUserIsInDB = await Users.findOne({email: email});
    if(ifUserIsInDB) {
        return res.status(402).send({msg: 'This email address is taken!'});
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    try {
        await Users.insertOne({
            name: name,
            surname: surname,
            password: encryptedPassword,
            email: email,
            avatar: avatar,
            refreshToken: ''
        })
        return res.status(200).send({msg: 'Registered successfully'});
    }catch(err){
        return res.status(400).send({msg: 'Something went wrong'});
    }
}
const Login = async(req, res) => {
    const {email, password} = req.body;
    if(!password || !email) {
        return res.status(401).send({msg: 'Invalid data'});
    }
    const user = await Users.findOne({email: email});
    if(!user) {
        return res.status(402).send({msg: 'User not found'});
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        return res.status(403).send({msg: 'Wrong password'});
    }
    const refreshToken = generateRefreshToken(user.name, user.surname, user.email);
    console.log(refreshToken);
    await Users.updateOne({email: email}, {
        $set: {refreshToken: refreshToken}
    });
    return res.status(200).send({msg: 'Logged succesfully', refreshToken});
}

const EditUser = async(req, res) => {
    const {avatar, name, surname, refreshToken} = req.body;
    console.log(avatar)
    if(!refreshToken) return res.status(401).send({msg: 'Token error'});
    const user = await Users.findOne({refreshToken: refreshToken});
    console.log(user);
    if(!user) return res.status(402).send({msg: 'Cannot find user with this token'});
    if(name && surname) {
        await Users.updateOne({refreshToken: refreshToken}, {
            $set: {name: name, surname: surname}
        });
        return res.status(200).send({msg: 'Name updated successfully'});
    }
    if(avatar){
        
        await Users.updateOne({refreshToken: refreshToken}, {
            $set: {avatar: avatar}
        }); 
        return res.status(200).send({msg: 'Avatar updated successfully'});
    }
}



app.post('/users/register', Register);
app.post('/users/login', Login);
app.post('/users/token', refreshToken);
app.post('/users/edit', EditUser);

app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT} `);
})

