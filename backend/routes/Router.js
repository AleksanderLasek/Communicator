import express from "express";
import { Register, Login, refreshToken, EditUser, GetUsers, BlockUser } from '../controllers/Users.js';
import { SendMessage, GetChat } from '../controllers/Message.js';
import { AddFriend, DeleteFriend, ShowFriends } from "../controllers/Friends.js";
import { AcceptInvite, DeclineInvite, InviteFriend, ShowInvitations } from "../controllers/InviteFriend.js";

export const router = express();

router.post('/users', GetUsers);
router.post('/users/register', Register);
router.post('/users/login', Login);
router.post('/users/token', refreshToken);
router.post('/users/edit', EditUser);
router.post('/users/block', BlockUser);
router.post('/chat/send', SendMessage);
router.post('/chat', GetChat);
router.post('/friends/add', AddFriend);
router.post('/friends/delete', DeleteFriend);
router.post('/friends', ShowFriends);
router.post('/invitations', ShowInvitations);
router.post('/invitations/add', InviteFriend);
router.post('/invitations/decline', DeclineInvite);
router.post('/invitations/accept', AcceptInvite);
