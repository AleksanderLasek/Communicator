import axios from "axios";
import { db } from "../database/Mongodb.js";


export const SendMessage = async(req, res) => {
    const {message, path, receiver, sender, fileId, fileName, miniature} = req.body;
    if(message.length > 255) {
        return res.status(401).send({msg: 'Message too long'});
    }
    if(!path) return res.status(404).send({msg: 'Error'});
    const ChatCollection = db.collection(`${path}`);
    const ress = await ChatCollection.insertOne({
        message: message,
        sender: sender,
        fileId: fileId,
        fileName: fileName,
        miniature: miniature
    })
    await axios.post('http://localhost:5000/nots/add', {receiver: receiver, sender: sender, type: 3});
    return res.status(200);
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
