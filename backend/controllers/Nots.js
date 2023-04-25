import { db } from '../database/Mongodb.js';
import { Users } from '../models/UserModel.js';
export const AddNotification = async(req, res) => {
    const { receiver, sender, type } = req.body;
    if(!receiver || !sender || !type) return res.status(400).send({msg: 'Error'});
    const notsCollection = db.collection(`${receiver}Nots`);
    let expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);
    const user = await Users.findOne({email: sender});

    await notsCollection.insertOne({
        sender: sender,
        senderName: user.name,
        senderAvatar: user.avatar,
        type: type,
        expireAt: expireDate
    })
    return res.status(200).send({msg: 'Notification added'});
}
export const ShowNotifications = async(req,res) => {
    const { email } = req.body;
    if(!email) return res.status(400).send({msg: 'Error'});
    const notsCollection = db.collection(`${email}Nots`);
    const Nots = await notsCollection.find({}).sort({_id: -1 }).toArray();
    console.log(email, Nots);
    return res.status(200).send({Nots});
}