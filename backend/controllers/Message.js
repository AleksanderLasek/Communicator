import axios from "axios";
import { db } from "../database/Mongodb.js";


export const SendMessage = async(req, res) => {
    const {message, path, receiver, sender, fileId, fileName, miniature} = req.body;
    if(message.length > 255) {
        return res.status(401).send({msg: 'Message too long'});
    }
    if(!path) return res.status(404).send({msg: 'Error'});
    let addName = '';
    const usersInChat = path.split('.');
    const ChatCollection = db.collection(`${path}`);
    const lastMessage = await ChatCollection.findOne({}, { sort: {_id: -1}});
    if(usersInChat.length > 2 && lastMessage){
        
        if(lastMessage.sender !== sender && lastMessage){
        addName = 'true';
        }
    }
    if(usersInChat.length > 2 && lastMessage === null){
        addName = 'true';
    }
    
    const ress = await ChatCollection.insertOne({
        message: message,
        sender: sender,
        fileId: fileId,
        fileName: fileName,
        miniature: miniature,
        addName: addName,
    })
    const today = new Date();
    
    for(let i = 0; i<usersInChat.length; i++){
        const userChats = db.collection(`${usersInChat[i]}Chats`);
        await userChats.updateOne({chat: path}, {
            $set: {date: today}
        })
    }
    try {
        await axios.post('http://localhost:5000/nots/add', {receiver: receiver, sender: sender, type: 3});
    }catch(err){
        console.log(err)
    }
    return res.status(200).send({msg: 'Success'});
}

export const GetChat = async(req, res) => {
    const { path} = req.body;
    if(!path) return res.status(404).send({msg: 'Error'}); 
    console.log(path)
    const ChatCollection = db.collection(`${path}`);
    const Chat = await ChatCollection.find({}).sort({_id: -1 }).toArray();
    return res.status(200).send({Chat});
}

export const GetDateOfLastMessage = async(req, res) => {
    const {path} = req.body;
    if(!path) return res.status(404).send({msg: 'Error'});
    const ChatCollection = db.collection(`${path}`);
    const MessageDate = await ChatCollection.findOne({}, { sort: { _id: -1 } });
    return res.status(200).send({MessageDate});
}

export const CreateNewChat = async(req, res) => {
    const { collectionName } = req.body;
    const isCollectionInDB = await db.listCollections({name: collectionName}).toArray();

    if(isCollectionInDB.length > 0) return res.status(400).send({msg: 'Error'});
    db.createCollection(collectionName);
    
    const users = collectionName.split('.');
    const today = new Date();
    for(let i=0; i<users.length; i++){
        const userChats = db.collection(`${users[i]}Chats`);
        await userChats.insertOne({
            chat: collectionName,
            date: today,
            name: '',
            avatar: '',
        })
    }
    return res.status(200).send({msg: 'Success'});
}

export const GetChats = async(req,res) => {
    const { email } = req.body;
    if(!email) return res.status(400);
    const userChats = db.collection(`${email}Chats`);
    const chats = await userChats.find({}).sort({date: -1 }).toArray();
    return res.status(200).send({chats});
}

export const ChangeChatName = async(req, res) => {
    const { collectionName, chatName} = req.body;
    const users = collectionName.split('.');
    const today = new Date();
    for(let i = 0; i< users.length; i++){
        const userChats = db.collection(`${users[i]}Chats`);
        await userChats.updateOne({ chat: collectionName }, {
            $set: {date: today, name: chatName}
        })
    }
    return res.status(200).send({msg: 'Success'});
}

export const ChangeChatAvatar = async(req, res) => {
    const {collectionName, avatar} = req.body;
    if(!collectionName || !avatar) return res.status(400).send({msg: 'Error'});
    const users = collectionName.split('.');
 
    for(let i=0; i<users.length; i++){
        const userChats = db.collection(`${users[i]}Chats`);
        await userChats.updateOne({chat: collectionName}, {
            $set: {avatar: avatar}
        })
    }
    return res.status(200).send({msg: "Success"});
}