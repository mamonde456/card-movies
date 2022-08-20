import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: { type: String },
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  videos: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Movie",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
