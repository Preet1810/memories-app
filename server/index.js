import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import MongoStore from 'connect-mongo';
import User from './models/user.js'
import postroutes from './routes/posts.js';
import userroutes from './routes/users.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app=express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser("Asecret"));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// const MongoStore=connectMongo(session);
const sessionConfig={
    name: 'ivd23SS33',
    secret: 'Asecret',
    resave: false,
    saveUninitialized: true,
    proxy: true,
    // cookie: { secure: true }
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
        secure: false, //set secure to true in production
        expires: Date.now()+1000*60*60*24*7,     //will be expired in 7 days
        maxAge: 1000*60*60*24*7,
        // sameSite: 'none', //set this in production
    }
}

// app.set('trust proxy', 1) // trust first proxy
app.use(session(sessionConfig))




app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    if (user!=null)
        done(null, user);
});

// app.get('/', (req, res) => {
//     // Set a cookie named 'myCookie' with value 'hello'
//     res.cookie('myCookie', 'hello');

//     // Send a response with a message
//     res.send('Cookie set!');
// });


app.use('/posts', postroutes);
app.use('/user', userroutes);

const CONNECTION_URL=process.env.MONGO_URL;
const PORT=process.env.PORT||5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
