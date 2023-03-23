import { db } from "../database/Mongodb.js";

export const AddFriend = async(req, res) => {
    const {email, friendEmail} = req.body;
    if(!email || !friendEmail) return res.status(401).send({msg: 'Error'});
    const FriendCollection = db.collection(email);
    FriendCollection.insertOne({
        friendEmail: friendEmail
    })
}

export const ShowFriends = async(req, res) => {
    const {email} = req.body;
    if(!email) return res.status(401).send({msg: 'Error'});
    const FriendCollection = db.collection(email);
    
    const Friends = await FriendCollection.find({}).toArray();
    
    return res.status(200).send({Friends});
}