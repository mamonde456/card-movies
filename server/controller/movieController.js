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
  const { movieId } = req.body;
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(400).send("noting found.");
  }
  return res.status(200).send(movie);
};

export const editMovie = (req, res) => {
  // const {body}=req
};
