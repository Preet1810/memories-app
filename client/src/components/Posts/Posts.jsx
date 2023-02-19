import React from 'react';
import { useGetPostsQuery } from '../../state/api';
import { styled, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, CircularProgress, Grid, } from '@mui/material';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const StyledGrid=styled(Grid)({
    paddingLeft: "1rem",
    paddingRight: "1rem",
    '@media (min-width: 1024px)': {
        paddingLeft: "5rem",
        paddingRight: "5rem",
    }
});

const StyledCard=styled(Card)({
    display: "flex",
    flexDirection: "column",
    margin: "1rem",
    background: "#33AAAA",
    height: "480px"
});

const StyledCardMedia=styled(CardMedia)({
    objectFit: 'cover',
    objectPosition: "center",
    height: "250px",
    marginTop: "1rem"
});

const StyledCardHeader=styled(CardHeader)({
    paddingBottom: 0,
});

const StyledCardContent=styled(CardContent)({
    flexGrow: 1,
});


const Posts=() => {
    const navigate=useNavigate();
    const handleDelete=async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${postId}`);
            navigate('/')
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    const { data, isLoading }=useGetPostsQuery();
    return (
        <div>
            {isLoading? (<div>Loading... </div>):data? (
                <StyledGrid container spacing={2} sx={{ marginTop: "5rem" }}>
                    {data.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post._id}>
                            <StyledCard>
                                <StyledCardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {post.creator.charAt(0).toUpperCase()}
                                        </Avatar>
                                    }
                                    action={
                                        <div>
                                            <Link to={`/edit/${post._id}`}>
                                                <IconButton aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <Link>
                                                <IconButton aria-label="delete" onClick={() => handleDelete(post._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Link>
                                        </div>
                                    }
                                    title={post.creator}
                                    subheader={new Date(post.createdAt).toDateString()}
                                />
                                <StyledCardMedia
                                    component="img"
                                    src={post.selectedFile[0].url}
                                    alt={post.title}

                                />
                                <StyledCardContent>
                                    <Typography className={post.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.message}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                                </StyledCardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites" sx={{ marginTop: "-1.5rem" }}>
                                        <FavoriteIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: "-1.5rem" }}>
                                        {post.likeCount}
                                    </Typography>
                                </CardActions>
                            </StyledCard>
                        </Grid>
                    ))}
                </StyledGrid>

            ):(<div>No data available</div>)
            }

        </div>
    );
};

export default Posts;
