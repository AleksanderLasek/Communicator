import { db } from "../database/Mongodb.js";

export const AddFriend = async(req, res) => {
    const {email, friendEmail} = req.body;
    if(!email || !friendEmail) return res.status(401).send({msg: 'Error'});
    const FriendCollection = db.collection(email);
    const checkIfUserIsInDB = await FriendCollection.findOne({friendEmail: friendEmail});
    if(checkIfUserIsInDB) return res.status(404).send({msg: 'User is alraedy a friend'});
    FriendCollection.insertOne({
        friendEmail: friendEmail
    })
    return res.status(200).send({msg: 'Friend added successfully!'});
}

export const DeleteFriend = async(req, res) => {
    const {email, friendEmail} = req.body;
    if(!email || !friendEmail) return res.status(401).send({msg: 'Error'});
    
}

export const ShowFriends = async(req, res) => {
    const {email} = req.body;
    if(!email) return res.status(401).send({msg: 'Error'});
    const FriendCollection = db.collection(email);
    
    const Friends = await FriendCollection.find({}).toArray();
    
    return res.status(200).send({Friends});
}