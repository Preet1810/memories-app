import express from 'express';
const router=express.Router();
import { registerUser } from '../controllers/users.js'
import multer from 'multer';
const upload=multer()


router.post('/register', upload.none(), registerUser);

export default router;