import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import session from 'express-session';
import passport, { Passport } from 'passport';
import LocalStrategy from 'passport-local';
dotenv.config();
import User from './models/user.js'

import postroutes from './routes/posts.js';
import userroutes from './routes/users.js'

const app=express();
const sessionConfig={
    name: 'ivd23SS33',
    secret: 'Asecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+1000*60*60*24*7,     //will be expired in 7 days
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/posts', postroutes);
app.use('/user', userroutes);

const CONNECTION_URL=process.env.MONGO_URL;
const PORT=process.env.PORT||5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

