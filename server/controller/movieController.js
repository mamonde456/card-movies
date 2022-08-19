import fetch from "cross-fetch";
import Movie from "../../models/Movie";
import User from "../../models/User";

export const home = async (req, res) => {
  const movies = await Movie.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.send(movies);
};

export const upload = async (req, res) => {
  const {
    body: { title, description, adult, genres, userId },
    files,
  } = req;
  const user = await User.findById(userId);
  const isAdult = adult ? true : false;
  try {
    await Movie.create({
      thumbUrl: files.thumb[0].path,
      movieUrl: files.movie[0].path,
      title,
      adult: isAdult,
      description,
      genres,
      createdAt: Date.now(),
      owner: user,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
  return res.sendStatus(200);
};

export const watch = async (req, res) => {
  try {
    const { movieId } = req.body;
    const movie = await Movie.findById(movieId).populate("owner");
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
    body: { id, title, adult, description, genres },
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
        description,
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
