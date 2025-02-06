import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    likes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Users who liked
      },
    ],
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: String,
            createdAt: { type: Date, default: Date.now },
            name: String,
            photo: String,
        },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String, // User's name
      required: true,
    },
    photo: {
      type: String, // User's profile photo
    },
  },
);

const Post =mongoose.model("Post",postSchema)

export default Post;
