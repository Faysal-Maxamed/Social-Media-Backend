import Post from "../model/postModel.js"; // Ensure the correct import path

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { userId, body, images, name, photo } = req.body;
        const newPost = new Post({ userId, body, images, name, photo });
        await newPost.save();
        res.status(201).json({message: "Post created successfully",});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating post", error: error.message });
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("userId", "name photo");
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching posts", error: error.message });
    }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("userId", "name photo");
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, post });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching post", error: error.message });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, message: "Post updated", post: updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating post", error: error.message });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ success: false, message: "Post not found" });
        res.status(200).json({ success: true, message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting post", error: error.message });
    }
};

// Like/Unlike a post
export const likePost = async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        const alreadyLiked = post.likes.some((like) => like.userId.toString() === userId);
        const update = alreadyLiked
            ? { $pull: { likes: { userId } } } // Remove like
            : { $push: { likes: { userId } } }; // Add like

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, update, { new: true });

        res.status(200).json({ success: true, message: "Like status updated", post: updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating like", error: error.message });
    }
};

// Add a comment
export const addComment = async (req, res) => {
    try {
        const { userId, text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        post.comments.push({ userId, text, createdAt: new Date() });
        await post.save();
        res.status(200).json({ success: true, message: "Comment added", post });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding comment", error: error.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        post.comments = post.comments.filter((comment) => comment._id.toString() !== commentId);
        await post.save();
        res.status(200).json({ success: true, message: "Comment deleted", post });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting comment", error: error.message });
    }
};
