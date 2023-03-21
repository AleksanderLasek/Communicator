import express from "express";
import { Register, Login, refreshToken, EditUser } from '../controllers/Users.js';
import { SendMessage, GetChat } from '../controllers/Message.js';
import { AddFriend, ShowFriends } from "../controllers/Friends.js";

export const router = express();

router.post('/users/register', Register);
router.post('/users/login', Login);
router.post('/users/token', refreshToken);
router.post('/users/edit', EditUser);
router.post('/chat/send', SendMessage);
router.post('/chat', GetChat);
router.post('/friends/add', AddFriend);
router.post('/friends', ShowFriends);