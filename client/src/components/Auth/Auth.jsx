import React, { useState } from 'react';
import { useEffect } from "react";
import axios from 'axios';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography, Avatar, Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
const Auth=() => {
    const [Load, setLoad]=useState(false)
    const [isError, setIsError]=useState(false);
    const [isSuccess, setSuccess]=useState(false)
    const [postData, setPostData]=useState({ email: '', password: '', username: '' });
    const [showSignup, setShowSignup]=useState(false);
    const [errorMessage, setErrorMessage]=useState('');

    const handleSignInClick=() => {
        // TODO: handle sign in logic

    };
    const navigate=useNavigate()
    const handleSignUpClick=async (event) => {
        event.preventDefault();

        setLoad(true);
        setSuccess(false);
        setIsError(false);
        try {
            const formData=new FormData();
            formData.append('email', postData.email);
            formData.append('password', postData.password);
            formData.append('username', postData.username);
            const config={
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response=await axios.post('http://localhost:5000/user/register', formData, config);
            setLoad(false);
            setSuccess(true);
            setPostData({
                email: '',
                password: '',
                username: '',
            });
            setErrorMessage(response.data.message)
            navigate('/')
        } catch (error) {
            console.log(error);
            setLoad(false);
            setIsError(true);
            setErrorMessage(error.response.data.message);

        }
    };

    const handleToggleSignupClick=() => {
        setShowSignup(!showSignup);
    };

    const cardTitle=showSignup? 'Sign Up':'Sign In';
    const cardActionLabel=showSignup? 'Already have an account?':"Don't have an account?";
    // console.log(postData)
    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: '20rem' }}>
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Avatar style={{ marginBottom: 10 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5" component="h2">
                            {cardTitle}
                        </Typography>
                    </div>
                    {!showSignup&&(
                        <>
                            <TextField
                                label="Email"
                                type="email"
                                onChange={(e) => setPostData({ ...postData, email: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onChange={(e) => setPostData({ ...postData, password: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}
                    {showSignup&&(
                        <>
                            <TextField
                                label="Username"
                                onChange={(e) => setPostData({ ...postData, username: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                onChange={(e) => setPostData({ ...postData, email: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onChange={(e) => setPostData({ ...postData, password: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}
                    <Button variant="contained" color="primary" sx={{ marginTop: "1rem" }} onClick={showSignup? handleSignUpClick:handleSignInClick}>
                        {cardTitle}
                    </Button>
                    {/* <Button variant="contained" color="primary" sx={{ marginTop: "1rem", display: 'flex', flexDirection: 'column' }}>
                        Sign in with Google
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: "1rem", display: 'flex', flexDirection: 'column' }}>
                        Logout in with Google
                    </Button> */}
                    <Button onClick={handleToggleSignupClick} sx={{ marginTop: "0.5rem" }}>{cardActionLabel}</Button>
                </CardContent>
                {isError&&<Alert severity="error" sx={{ marginBottom: "1rem" }}>{errorMessage}</Alert>}
                {isSuccess&&<Alert severity="success" sx={{ marginBottom: "1rem" }}>{errorMessage}</Alert>}
            </Card>
        </div>
    );
}

export default Auth