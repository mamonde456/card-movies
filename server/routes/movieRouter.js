import express from "express";
import Movie from "../../models/Movie";

const movieRouter = express.Router();

movieRouter.post("/upload", async (req, res) => {
  const {
    body: {
      movie: { title, description, adult },
      genres,
    },
  } = req;
  const isAdult = adult ? true : false;
  try {
    await Movie.create({
      title,
      adult: isAdult,
      description,
      genres,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.log(err);
  }
  return res.redirect("/home");
});

movieRouter.get("/home", async (req, res) => {
  const movies = await Movie.find({});
  return res.send(movies);
});

export default movieRouter;
