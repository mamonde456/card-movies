import Movie from "../../models/Movie";

export const home = async (req, res) => {
  const movies = await Movie.find({});
  return res.send(movies);
};

export const upload = async (req, res) => {
  const {
    body: {
      movie: { title, description, adult },
      genres: { id, value },
    },
  } = req;
  console.log(genres);
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
};

export const editMovie = (req, res) => {
  // const {body}=req
};
