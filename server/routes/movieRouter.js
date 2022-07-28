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
  console.log(title, description, adult, genres);
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
  const movie = await Movie.find({});
  //   await await fetch("http://localhost:3000", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       movie,
  //     }),
  //   });
  return res.send(Movie);
});

export default movieRouter;
