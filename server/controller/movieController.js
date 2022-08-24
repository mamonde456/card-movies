import fetch from "cross-fetch";
import Movie from "../../models/Movie";
import User from "../../models/User";
import Comment from "../../models/Comment";

export const home = async (req, res) => {
  const movies = await Movie.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.send(movies);
};

export const upload = async (req, res) => {
  const {
    body: { title, overview, adult, genres, userId },
    files,
  } = req;
  const user = await User.findById(userId);
  const isAdult = adult ? true : false;
  try {
    const movie = await Movie.create({
      thumbUrl: files.thumb[0].path,
      movieUrl: files.movie[0].path,
      title,
      adult: isAdult,
      overview,
      genres,
      createdAt: Date.now(),
      owner: user,
    });
    await user.videos.push(movie);
    await user.save();
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const watch = async (req, res) => {
  try {
    const { movieId } = req.body;
    const movie = await Movie.findById(movieId)
      .populate("owner")
      .populate("comments");
    if (!movie) {
      return res.status(400).send({ errorMessage: "movie noting found." });
    }

    return res.status(200).send(movie);
  } catch (error) {
    return res
      .status(400)
      .send({ errorTitle: "404", errorMessage: "movie noting found." });
  }
};

export const editMovie = async (req, res) => {
  const {
    body: { id, title, adult, overview, genres },
    files,
  } = req;
  const movie = await Movie.findById(id);
  try {
    await Movie.findByIdAndUpdate(
      id,
      {
        thumbUrl: files.thumb ? files.thumb[0].path : movie.thumbUrl,
        movieUrl: files.movie ? files.movie[0].path : movie.movieUrl,
        title,
        adult,
        overview,
        genres,
      },
      { new: true }
    );
    return res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    return res.status(400).send({ errorMessage: "File update failed." });
  }
};

export const comments = async (req, res) => {
  const {
    body: { userId, movieId, value },
  } = req;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).send({ errorMessage: "user nothing fonud" });
  }
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(400).send({ errorMessage: "movie nothing fonud" });
  }
  const comment = await Comment.create({
    avatarUrl: user.avatarUrl,
    name: user.name,
    text: value,
    owner: userId,
    videos: movieId,
  });
  user.comments.push(comment);
  movie.comments.push(comment);
  await user.save();
  await movie.save();

  return res.status(200).send(comment);
};

export const deleteMovie = async (req, res) => {
  const { movieId } = req.body;
  console.log(movieId);
  await Movie.findByIdAndDelete(movieId);
  res.status(200).send("Movie deletion successful");
};

export const views = async (req, res) => {
  const { movieId } = req.body;

  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.sendStatus(400);
  }
  movie.meta.views = movie.meta.views + 1;
  await movie.save();

  return res.sendStatus(200);
};
