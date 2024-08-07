import express from 'express'
import { Router } from 'express'
import { CreatPost, DeletePost, GetPost, LikePost, UnlikePost, UpdatePost } from '../controllers/Post.controller.js';
import { verifyToken } from '../middlewares/Auth.middleware.js';
const router = Router();


router.route("/").post(verifyToken, CreatPost);
router.route("/").get(GetPost);
router.route("/:id").put(verifyToken, UpdatePost);
router.route("/:id").delete(verifyToken, DeletePost);
router.route("/like/:id").put(verifyToken,LikePost);
router.route("/unlike/:id").put(verifyToken,UnlikePost);

export default router;