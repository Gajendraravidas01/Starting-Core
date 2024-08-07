import { Router } from "express";
import { CreateComment, DeleteComment } from "../controllers/Comment.controller.js";
import { verifyToken } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/:postId").post(verifyToken, CreateComment)
router.route("/:id").delete(verifyToken, DeleteComment)


export default router;