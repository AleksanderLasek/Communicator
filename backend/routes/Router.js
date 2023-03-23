import express from "express";
import { Register, Login, refreshToken, EditUser, GetUsers } from '../controllers/Users.js';
import { SendMessage, GetChat } from '../controllers/Message.js';
import { AddFriend, ShowFriends } from "../controllers/Friends.js";
import { InviteFriend, ShowInvitations } from "../controllers/InviteFriend.js";

export const router = express();

router.post('/users', GetUsers);
router.post('/users/register', Register);
router.post('/users/login', Login);
router.post('/users/token', refreshToken);
router.post('/users/edit', EditUser);
router.post('/chat/send', SendMessage);
router.post('/chat', GetChat);
router.post('/friends/add', AddFriend);
router.post('/friends', ShowFriends);
router.post('/invitations', ShowInvitations);
router.post('/invitations/add', InviteFriend);