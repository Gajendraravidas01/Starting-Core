import mongoose from "mongoose";
import { Post } from "../models/Post.model.js";

const CreatPost = async (req, res) => {
  const { title, content } = req.body;
  console.log(req.user);
  try {
    const newPost = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    await newPost.save();
    return res.status(200).json({
      message: "Post is created successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong on creating a post!",
    });
  }
};

const GetPost = async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log(posts);
    return res.status(200).json({
      posts,
      message: "Posts fteched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in finding the Post!",
    });
  }
};

const UpdatePost = async (req, res) => {
  try {
    // console.log(req.post);
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    // console.log(post.author.toString());
    // console.log(req.user._id.toString())
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    post.title = title;
    post.content = content;
    await post.save();
    return res.status(200).json({
      message: "post is updated successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "something went wrong while updating the post!",
    }),console.log(error);
  }
};

const DeletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); 

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized action" });
        }
        await post.deleteOne();
        return res.status(200).json({
            message : "Post deleted successfully"
        })
    } catch (error) {
        return res.status(200).json({
            message : "something went wrong while deleting the post"
        }),console.log(error);
    }

};

const LikePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.includes(req.user)){
            return res.status(400).json({ message: 'Post already liked' });
        }
        post.likes.push(req.user);
        await post.save();
        return res.status(200).json({
            message: "post liked successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in Liking the Post!",
        });
    }

}

const UnlikePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        // console.log(post);

        if (!post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'Post not liked yet' });
        }
        // console.log(req.user._id);
        post.likes = post.likes.filter((userId) => userId.toString() !== req.user._id.toString() );
        await post.save()
        return res.status(200).json({
            post,
            message : "post unliked successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in Unliking the Post!",
        });
    }
}

export { CreatPost, GetPost, UpdatePost, DeletePost, LikePost, UnlikePost };
