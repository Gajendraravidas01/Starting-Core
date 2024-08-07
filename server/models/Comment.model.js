import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    content : {
        type : String,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }
},{timestamps : true});

export const Comment = mongoose.model("Comment",CommentSchema);