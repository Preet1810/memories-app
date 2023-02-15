import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const ImageSchema=new Schema({
    url: String,
    filename: String
});

const postSchema=new Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: [ImageSchema],
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage=mongoose.model('PostMessage', postSchema);

export default PostMessage;