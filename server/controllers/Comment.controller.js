import mongoose from "mongoose";
import {Post} from '../models/Post.model.js';
import {Comment} from '../models/Comment.model.js';

const CreateComment = async(req,res) => {
    try {
        const {content} = req.body;
        
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(400).json({
                message: "Post is not found or exist !"
            })
        }
        
        const comment = await Comment.create({
            content,
            author : req.user,
            post : req.params.postId
        })

        post.comments.push(comment._id);
        await post.save()
        return res.status(200).json({
            comment,
            message : "comment is published successfully!"
        })

    } catch (error) {
        return res.status(400).json({
            message : "something went wrong in publishing the comment"
        }),console.log(error);
    }
}

const DeleteComment = async(req,res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment){
            return res.status(400).json({
                message : "comment is not found!"
            })
        }
        if(comment.author._id.toString() !== req.user._id.toString()){
            return res.status(400).json({
                message : "unotherized request!"
            })
        }
        await comment.deleteOne();

        const post = await Post.findById(comment.post);
        post.comments = post.comments.filter((commentid) => commentid.toString() !== req.params.id);

        await post.save();
        return res.status(200).json({
            message : "comment is deleted successfully"
        })

    } catch (error) {
        return res.status(400).json({
            message : "something went wrong on deleting the comment"
        }),console.log(error);
    }
}

export {CreateComment, DeleteComment}