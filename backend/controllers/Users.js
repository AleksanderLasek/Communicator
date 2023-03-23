import { Users } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const GetUsers = async(req, res) => {
    const {refreshToken} = req.body;
    if(!refreshToken) return res.status(404).send({msg: 'Token error'});
    const UsersList = await Users.find({}).toArray();
    return res.status(200).send({UsersList});
}

const generateRefreshToken = (name, surname, email) => {
    return jwt.sign({name, surname, email}, process.env.JWT_SECRET_KEY, {expiresIn: '864000s'});
}
const generateAccessToken = (name, surname, email, avatar) => {
    return jwt.sign({name, surname, email, avatar}, process.env.JWT_SECRET_ACCESS_KEY, {expiresIn: '15s'});
}

export const refreshToken = async(req, res) => {
    try {
        const { refreshToken } = req.body;
        if(!refreshToken) return res.status(401).send({msg: 'Token error'});
        const user = await Users.findOne({refreshToken: refreshToken});
        if(!user) return res.status(402).send({msg: 'Cannot find user with this token'});
        const tokenVerify = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        if(!tokenVerify) {
            return res.status(403).send({msg: 'Token verification went wrong'});
        }else{
            const accessToken = generateAccessToken(user.name, user.surname, user.email, user.avatar);
            return res.status(200).send({accessToken});
        }
    }catch(err){
        return res.status(404).send({msg: 'Something went wrong'});
    }
}

export const Register = async(req, res) => {
    const { name, surname, password, email, avatar } = req.body;
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
            avatar: avatar,
            refreshToken: ''
        })
        return res.status(200).send({msg: 'Registered successfully'});
    }catch(err){
        return res.status(400).send({msg: 'Something went wrong'});
    }
}
export const Login = async(req, res) => {
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
    const refreshToken = generateRefreshToken(user.name, user.surname, user.email);
    console.log(refreshToken);
    await Users.updateOne({email: email}, {
        $set: {refreshToken: refreshToken}
    });
    return res.status(200).send({msg: 'Logged succesfully', refreshToken});
}

export const EditUser = async(req, res) => {
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