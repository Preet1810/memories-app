import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import { cloudinary, storage } from '../cloudinary/index.js';

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
    // console.log(req.file);
    try {
        if (req.file) {
            const { path, filename }=req.file;

            // Create new post message
            const newPostMessage=new PostMessage({
                title,
                message,
                creator,
                tags,
                selectedFile: {
                    url: path,
                    filename: filename,
                },

            });

            await newPostMessage.save();

            res.status(201).json(newPostMessage);
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
};

export const getEditForm=async (req, res) => {
    const { id }=req.params;
    // console.log(id)
    try {
        const post=await PostMessage.findById(id);
        if (!post) {
            return res.status(404).send(`No post with id: ${id}`);
        }
        // console.log(post)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const updatePost=async (req, res) => {
    const { id }=req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    try {
        const post=await PostMessage.findById(id);
        // console.log(post)
        if (!post) {
            return res.status(404).send(`No post with id: ${id}`);
        }
        // console.log(req.body)
        const updatedPost={
            ...post._doc, // Include all properties of the original post
            ...req.body, // Overwrite any properties with values from the edit form
        };

        if (req.file) {

            const { path, filename }=req.file;
            updatedPost.selectedFile={
                url: path,
                filename: filename
            };
            // Delete previous file if it exists
            const publicId=post.selectedFile[0].filename
            await cloudinary.uploader.destroy(publicId);

        }
        // Loop through each property in req.body
        for (const [key, value] of Object.entries(req.body)) {
            // If the value is empty, set it to the corresponding value in the original post
            if (value==='') {
                updatedPost[key]=post[key];
            }
        }
        const updated=await PostMessage.findByIdAndUpdate(id, updatedPost, {
            new: true
        });

        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const deletePost=async (req, res) => {
    const { id }=req.params;
    try {
        const post=await PostMessage.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const publicId=post.selectedFile[0].filename
        console.log(publicId)
        await cloudinary.uploader.destroy(publicId);
        await post.remove();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }

}