import { db } from "../database/Mongodb.js";


export const SendMessage = async(req, res) => {
    const {message, sender, receiver} = req.body;
    if(message.length > 255) {
        return res.status(401).send({msg: 'Message too long'});
    }
    if(!sender || !receiver) return res.status(404).send({msg: 'Error'});
    const ChatName = [sender, receiver];
    ChatName.sort();  
    const ChatCollection = db.collection(`${ChatName[0]}${ChatName[1]}`);
    await ChatCollection.insertOne({
        message: message,
        sender: sender,
    })
}

export const GetChat = async(req, res) => {
    const {sender, receiver} = req.body;
    if(!sender || !receiver) return res.status(404).send({msg: 'Error'});
    const ChatName = [sender, receiver];
    ChatName.sort();  
    const ChatCollection = db.collection(`${ChatName[0]}${ChatName[1]}`);
    const Chat = await ChatCollection.find({}).sort({_id: -1 }).toArray();
    return res.status(200).send({Chat});
}
