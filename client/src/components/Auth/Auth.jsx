import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography, Avatar
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Auth=() => {
    const [showSignup, setShowSignup]=useState(false);
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [name, setName]=useState('');
    const [repeatPassword, setRepeatPassword]=useState('');

    const handleEmailChange=(event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange=(event) => {
        setPassword(event.target.value);
    };

    const handleNameChange=(event) => {
        setName(event.target.value);
    };

    const handleRepeatPasswordChange=(event) => {
        setRepeatPassword(event.target.value);
    };

    const handleSignInClick=() => {
        // TODO: handle sign in logic
    };

    const handleSignUpClick=() => {
        // TODO: handle sign up logic
    };

    const handleToggleSignupClick=() => {
        setShowSignup(!showSignup);
    };

    const cardTitle=showSignup? 'Sign Up':'Sign In';
    const cardActionLabel=showSignup? 'Already have an account?':"Don't have an account?";

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
                    <TextField
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                    />
                    {showSignup&&(
                        <>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={handleNameChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Repeat Password"
                                type="password"
                                value={repeatPassword}
                                onChange={handleRepeatPasswordChange}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}
                    <Button variant="contained" color="primary" sx={{ marginTop: "1rem" }} onClick={showSignup? handleSignUpClick:handleSignInClick}>
                        {cardTitle}
                    </Button>
                    <Button onClick={handleToggleSignupClick} sx={{ marginTop: "0.5rem" }}>{cardActionLabel}</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default Auth