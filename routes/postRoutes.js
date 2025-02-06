import express from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost, likePost, addComment, deleteComment } from "../controller/postController.js";

const router = express.Router();

router.post("/", createPost); 
router.get("/", getAllPosts); 
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.post("/:id/comment", addComment);
router.delete("/comment/:postId/:commentId", deleteComment);

export default router;
