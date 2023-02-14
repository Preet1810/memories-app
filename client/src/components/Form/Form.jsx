import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import friends from "../../Images/friends.png"
import FileBase from 'react-file-base64';
import Button from '@mui/material/Button';
import { useCreatePostMutation } from '../../state/api'

const Form=() => {
    const [createPost, { isLoading }]=useCreatePostMutation();
    const [postData, setPostData]=useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const handleSubmit=async (event) => {
        event.preventDefault();
        await createPost(postData).unwrap();
    }
    return (
        <Card sx={{ maxWidth: 345, marginTop: "6rem" }}>
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
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TextField id="outlined-basic" label="Creator" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                    <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField id="outlined-basic" label="Message" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField id="outlined-basic" label="Tags (coma separated)" variant="outlined" sx={{ margin: "0.4rem 0" }} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                    <div sx={{ margin: "0.4rem 0" }}> <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> </div>
                    <Button variant="contained"
                        color="primary"
                        size="large"
                        sx={{ width: "80%", margin: "0.4rem 0" }}
                        onClick={handleSubmit}
                    >Submit</Button>

                </Box>
                <div>{console.log(postData)}</div>
            </CardContent>
        </Card>
    );
}

export default Form