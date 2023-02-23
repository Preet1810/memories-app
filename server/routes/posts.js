import express from 'express';
import { getPosts, createPost, updatePost, getEditForm, deletePost } from '../controllers/posts.js';
const router=express.Router();
import multer from 'multer';
import { isLoggedin } from '../middleware.js';

import { cloudinary, storage } from '../cloudinary/index.js';

const upload=multer({ storage });


router.get('/', getPosts)
router.post('/', upload.single('selectedFile'), isLoggedin, createPost);
router.get('/edit/:id', getEditForm)
router.patch('/edit/:id', upload.single('selectedFile'), updatePost);
router.delete('/:id', isLoggedin, deletePost);

export default router;