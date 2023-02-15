import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
const router=express.Router();
import multer from 'multer';

import { cloudinary, storage } from '../cloudinary/index.js';

const upload=multer({ storage });


router.get('/', getPosts)
router.post('/', upload.single('selectedFile'), createPost);

export default router;