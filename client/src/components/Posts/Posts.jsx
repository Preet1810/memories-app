import React from 'react';
import { useGetPostsQuery } from '../../state/api';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

const Posts=() => {
    const { data, isLoading }=useGetPostsQuery();
    return isLoading? (
        <CircularProgress />
    ):(
        <Grid container spacing={2} sx={{ marginTop: "5rem" }}>
            {
                data.map((post) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card key={post.selectedFile[0]._id}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {post.creator.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                title={post.creator}
                                subheader={new Date(post.createdAt).toDateString()}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                // image={post.selectedFile}
                                alt={post.title}
                                src={post.selectedFile[0].url}
                            />
                            <CardContent>
                                <Typography className={post.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.message}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon sx={{ color: 'red' }} />
                                </IconButton>
                                <Typography variant="body2" color="text.secondary">
                                    {post.likeCount}
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default Posts;