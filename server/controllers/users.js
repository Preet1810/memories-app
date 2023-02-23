import mongoose from 'mongoose';
import User from '../models/user.js';


export const registerUser=async (req, res) => {
    try {
        const { email, username, password }=req.body;
        const user=new User({ email, username });
        await User.register(user, password);
        res.status(200).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser=async (req, res) => {
    try {
        console.log(req.isAuthenticated());
        res.status(200).json({ message: 'User Loged In successfully.' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

