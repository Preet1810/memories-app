import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import PostMessage from '../models/postMessage.js';
import { cloudinary, storage } from '../cloudinary/index.js';

const upload=multer({ storage });

export const getPosts=async (req, res) => {
    try {
        const postMessages=await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost=async (req, res) => {
    const { title, message, creator, tags }=req.body;
    try {
        // Upload file to Cloudinary
        const result=await cloudinary.uploader.upload(req.file.path);

        // Create new post message
        const newPostMessage=new PostMessage({
            title,
            message,
            creator,
            tags,
            selectedFile: {
                url: result.secure_url,
                filename: result.public_id
            }
        });
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
};


export const updatePost=async (req, res) => {
    const { id: _id }=req.params;
    const { title, message, creator, selectedFile, tags }=req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost={ creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}