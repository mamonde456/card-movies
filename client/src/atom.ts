import { atom } from "recoil";

export const loggedInState = atom({
  key: "loggedIn",
  default: false,
});

export const loggedInUser = atom({
  key: "user",
  default: {
    username: "",
    name: "",
    email: "",
    password: "",
  },
});

export const atomMovieDB = atom({
  key: "movies",
  default: [
    {
      _id: "",
      title: "",
      description: "",
      adult: false,
      genres: [],
      createdAt: "",
      meta: { views: 0, rating: 0 },
    },
  ],
});
