import { db } from "../database/Mongodb.js";

export const AddFriend = async(req, res) => {
    const {name, friendName} = req.body;
    if(!name || !friendName) return res.status(401).send({msg: 'Error'});
    const FriendCollection = db.collection(name);
    FriendCollection.insertOne({
        friendName: friendName
    })
}

export const ShowFriends = async(req, res) => {
    const {name} = req.body;
    if(!name) return res.status(401).send({msg: 'Error'});
    const FriendCollection = db.collection(name);
    
    const Friends = await FriendCollection.find({}).toArray();
    
    return res.status(200).send({Friends});
}