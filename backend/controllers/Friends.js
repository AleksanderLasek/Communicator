import { db } from "../database/Mongodb.js";
import axios from 'axios';

export const AddFriend = async(req, res) => {
    const {email, friendEmail} = req.body;
    if(!email || !friendEmail) return res.status(401).send({msg: 'Error'});
    const UserCollection = db.collection(email);
    const checkIfUserIsInDB = await UserCollection.findOne({friendEmail: friendEmail});
    if(checkIfUserIsInDB) return res.status(404).send({msg: 'User is alraedy a friend'});
    UserCollection.insertOne({
        friendEmail: friendEmail
    })
    return res.status(200).send({msg: 'Friend added successfully!'});
}

export const DeleteFriend = async(req, res) => {
    const {email, friendEmail} = req.body;
    if(!email || !friendEmail) return res.status(401).send({msg: 'Error'});
    const UserCollection = db.collection(email);
    const checkIfUserIsInDB = await UserCollection.findOne({friendEmail: friendEmail});
    const FriendCollection = db.collection(friendEmail);
    const checkIfFriendIsInDB = await FriendCollection.findOne({friendEmail: email});
    if(!checkIfFriendIsInDB || !checkIfUserIsInDB) return res.status(404).send({msg: 'This user is not a friend'})
    UserCollection.deleteOne({
        friendEmail: friendEmail
    })
    FriendCollection.deleteOne({
        friendEmail: email
    })
    return res.status(200).send({msg: 'Friend deleted successfully!'});
} 

export const ShowFriends = async(req, res) => {
    const {email} = req.body;
    if(!email) return res.status(401).send({msg: 'Error'});
    const FriendCollection = db.collection(email);
    
    const Friends = await FriendCollection.find({}).toArray();
    
    return res.status(200).send({Friends});
}