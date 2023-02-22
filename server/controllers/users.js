import mongoose from 'mongoose';
import User from '../models/user.js';


export const registerUser=async (req, res) => {
    try {
        const { email, username, password }=req.body;
        const user=new User({ email, username });
        const registeredUser=await User.register(user, password);
        console.log(registeredUser);
        res.status(200).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

