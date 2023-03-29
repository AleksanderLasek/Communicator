import { db } from "../database/Mongodb.js";

export const InviteFriend = async(req, res) => {
    const { email, invitedEmail } = req.body;
    if(!email || !invitedEmail) return res.status(404).send({msg: 'Error'});
    const Invitations = db.collection(`${invitedEmail}Invitations`);
    const checkIfUserIsInDB = await Invitations.findOne({from: email});
    if(checkIfUserIsInDB) return res.status(401).send({msg: 'User already invited!'});
    await Invitations.insertOne({
        from: email,
    })
}

export const ShowInvitations = async(req, res) => {
    const { email } = req.body;
    if(!email) return res.status(404).send({msg: 'Error'});
    const Invitations = db.collection(`${email}Invitations`);
    const InvitationList = await Invitations.find({}).toArray();
    return res.status(200).send({InvitationList});
}

export const DeclineInvite = async(req, res) => {
    const { email, inviterEmail } = req.body;
    if(!email || !inviterEmail) return res.status(404).send({msg: 'Error'});
    const Invitations = db.collection(`${email}Invitations`);
    await Invitations.deleteOne({from: inviterEmail});
}

export const AcceptInvite = async(req, res) => {
    const { email, inviterEmail } = req.body;
    if(!email || !inviterEmail) return res.status(404).send({msg: 'Error'});
}