// controllers/postController.js
import Post from "../model/postModel.js";

// Create a post
export const createPost = async (req, res) => {
  try {
    const { body, images, name, photo } = req.body;
    const newPost = new Post({ body, images, name, photo });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdDate: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Like/Unlike a post
export const likePost = async (req, res) => {
    try {
      const { postId, type, name, photo } = req.body; // Get postId from request body
      
      // Use the default _id field from MongoDB
      const post = await Post.findById(postId);  // Fetch the post by its MongoDB _id
      if (!post) return res.status(404).json({ message: "Post not found" });
      
      const existingLike = post.likes.find((like) => like.name === name);
      if (existingLike) {
        post.likes = post.likes.filter((like) => like.name !== name);
      } else {
        post.likes.push({ type, name, photo, createdDate: new Date() });
      }
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Add comment to a post
export const addComment = async (req, res) => {
    try {
      const { postId, text, name, photo } = req.body; // Get postId from request body
      
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
      
      post.comments.push({ text, name, photo, createdAt: new Date() });
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments = post.comments.filter((comment) => comment._id.toString() !== commentId);
    await post.save();
    res.status(200).json({ message: "Comment deleted", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
