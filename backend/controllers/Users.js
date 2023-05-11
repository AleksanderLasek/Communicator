import { Users } from "../models/UserModel.js";
import { db } from "../database/Mongodb.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import axios from "axios";

export const GetUsers = async(req, res) => {
    const {refreshToken, filter, email} = req.body;
    
    if(!refreshToken) return res.status(404).send({msg: 'Token error'});
    const filtering = {email: {$in: filter}};
    
    let UsersList = await Users.find({}).toArray();
    if(filter) { 
        UsersList = await Users.find(filtering).toArray(); 
    }
    const BlockedCollection = db.collection(`${email}Blocked`);
    const BlockedFromCollection = db.collection(`${email}BlockedFrom`);
    let BlockedList = await BlockedCollection.find({}).toArray();
    BlockedList = BlockedList.map((obj) => obj.email);
    BlockedList.push(email);
    let BlockedFromList = await BlockedFromCollection.find({}).toArray();
    BlockedFromList = BlockedFromList.map((obj) => obj.email);
    UsersList = UsersList.filter((element) => !BlockedFromList.includes(element.email))
    UsersList = UsersList.filter((element) => !BlockedList.includes(element.email))
    
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

export const BlockUser = async(req, res) => {
    const { email, blockedEmail } = req.body;
    if(!email || !blockedEmail) return res.status(404).send({msg: 'Error'});
    const blockedUsers = db.collection(`${email}Blocked`);
    blockedUsers.insertOne({
        email: blockedEmail
    })
    const blockedFrom = db.collection(`${blockedEmail}BlockedFrom`);
    blockedFrom.insertOne({
        email: email,
    })
    await axios.post('http://localhost:5000/friends/delete', {email: email, friendEmail: blockedEmail});
    return res.status(200).send({msg: 'User blocked'});
}

export const UnblockUser = async(req, res) => {
    const { email, blockedEmail } = req.body;
    if(!email || !blockedEmail) return res.status(404).send({msg: 'Error'});
    const blockedUsers = db.collection(`${email}Blocked`);
    blockedUsers.deleteOne({
        email: blockedEmail
    })
    const blockedFrom = db.collection(`${blockedEmail}BlockedFrom`);
    blockedFrom.deleteOne({
        email: email,
    })
    return res.status(200).send({msg: 'User unblocked'});
}

export const GetBlocked = async(req, res) => {
    const { email } = req.body;
    if(!email) return res.status(404).send({msg: 'Error'});
    const blockedUsers = db.collection(`${email}Blocked`);
    const blockedList = await blockedUsers.find({}).toArray();
    return res.status(200).send({blockedList});
}