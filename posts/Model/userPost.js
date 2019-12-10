import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {type:String, required: true},
    userPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const User = mongoose.model('user', userSchema);

const postSchema = new mongoose.Schema({
    title: {type:String, required:true},
    content: {type:String, required:true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('posts', postSchema);

module.exports = { User, Post };