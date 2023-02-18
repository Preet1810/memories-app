import express from 'express';
import { getPosts, createPost, updatePost, getEditForm } from '../controllers/posts.js';
const router=express.Router();
import multer from 'multer';

import { cloudinary, storage } from '../cloudinary/index.js';

const upload=multer({ storage });


router.get('/', getPosts)
router.post('/', upload.single('selectedFile'), createPost);
router.get('/edit/:id', getEditForm)
router.patch('edit/:id', updatePost);

export default router;