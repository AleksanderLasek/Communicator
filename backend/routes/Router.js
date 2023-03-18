import express from "express";
import { Register, Login, refreshToken, EditUser } from '../controllers/Users.js';

export const router = express();

router.post('/users/register', Register);
router.post('/users/login', Login);
router.post('/users/token', refreshToken);
router.post('/users/edit', EditUser);
