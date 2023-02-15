import React, { useState } from 'react';
import { Box, TextField, Card, CardContent, CardMedia, Typography, Alert } from '@mui/material';
import friends from "../../Images/friends.png"
import { useCreatePostMutation } from '../../state/api'
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

const Form=() => {
    const [createPost, { isLoading }]=useCreatePostMutation();
    const [Load, setLoad]=useState(false)
    const [postData, setPostData]=useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const [isError, setIsError]=useState(false);
    const [isSuccess, setSuccess]=useState(false)

    const isFormFilled=() => {
        return (
            postData.creator!==''&&
            postData.title!==''&&
            postData.message!==''&&
            postData.tags!==''&&
            postData.selectedFile!==''
        );
    };

    const handleSubmit=async (event) => {
        event.preventDefault();
        setLoad(true);
        setSuccess(false);
        setIsError(false);

        try {
            const formData=new FormData();
            formData.append('creator', postData.creator);
            formData.append('title', postData.title);
            formData.append('message', postData.message);
            formData.append('tags', postData.tags);
            formData.append('selectedFile', postData.selectedFile);

            const config={
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            await axios.post('http://localhost:5000/posts', formData, config);

            setLoad(false);
            setSuccess(true);
            setPostData({
                creator: '',
                title: '',
                message: '',
                tags: '',
                selectedFile: '',
            });
        } catch (error) {
            console.log(error);
            setLoad(false);
            setIsError(true);
        }
    };
    return (
        <div>
            <Card sx={{ maxWidth: 345, marginTop: "5rem" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={friends}
                    alt="friends"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", justifyContent: "center" }}>
                        POST MEMORIES
                    </Typography>
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Box noValidate sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <TextField id="outlined-basic" label="Creator" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                            <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                            <TextField id="outlined-basic" label="Message" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                            <TextField id="outlined-basic" label="Tags (coma separated)" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                            <input type="file" name="selectedFile" onChange={(e) => setPostData({ ...postData, selectedFile: e.target.files[0] })} />
                            <LoadingButton variant="contained" type="submit" loading={Load} color="primary" size="large">Submit</LoadingButton>
                        </Box>
                    </form>
                    {isError&&<Alert severity="error">Please Fill All Inputs</Alert>}
                    {isSuccess&&<Alert severity="success">Memory Created Succesfully</Alert>}
                </CardContent>
            </Card>
        </div>
    );
}

export default Form