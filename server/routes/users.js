import express from 'express';
const router=express.Router();
import { registerUser, loginUser } from '../controllers/users.js'
import multer from 'multer';
import passport from 'passport';
const upload=multer()


router.post('/register', upload.none(), registerUser);

router.post('/login', upload.none(), passport.authenticate('local', { keepSessionInfo: true }), loginUser);

export default router;