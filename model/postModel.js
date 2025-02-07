// models/Post.js
import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    likes: [
      {
        type: { type: String, enum: ["heart", "like", "wow"], default: "heart" },
        createdDate: { type: Date, default: Date.now },
        name: String,
        photo: String,
      },
    ],
    comments: [
      {
        text: String,
        createdDate: { type: Date, default: Date.now },
        name: String,
        photo: String,
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    photo: String,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;