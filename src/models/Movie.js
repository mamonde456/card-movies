import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  thumbUrl: { type: String, required: true },
  movieUrl: { type: String, required: true },
  title: { type: String, required: true },
  adult: { type: Boolean, required: true, default: false },
  overview: { type: String, required: true },
  genres: [{ type: String, required: true }],
  // runtime: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
