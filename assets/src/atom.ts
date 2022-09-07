import { atom } from "recoil";

export interface IUser {
  avatarUrl: string;
  comments: [type: String];
  email: string;
  info: string;
  location: string;
  name: string;
  password: string;
  username: string;
  videos: [type: String];
  _id: string;
}

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
interface IMovie {
  thumb: string;
  movie: string;
  _id: string;
  title: string;
  description: string;
  adult: boolean;
  genres: [type: string];
  createdAt: string;
  meta: { views: number; rating: number };
}

export const atomMovieDB = atom<IMovie[]>({
  key: "movies",
  default: [],
});

export interface IGenres {
  id: number;
  data: string;
}

export const categoryList = atom<IGenres[]>({
  key: "genres",
  default: [
    { id: 1, data: "action" },
    { id: 2, data: "animation" },
    { id: 3, data: "crime" },
    { id: 4, data: "drama" },
    { id: 5, data: "comedy" },
    { id: 6, data: "thriller" },
    { id: 7, data: "horror" },
    { id: 8, data: "SF" },
    { id: 9, data: "Adult" },
    { id: 10, data: "fantasy" },
    { id: 11, data: "adventure" },
    { id: 12, data: "mystery" },
    { id: 13, data: "family" },
    { id: 14, data: "War" },
    { id: 15, data: "documentary" },
    { id: 16, data: "musical" },
    { id: 17, data: "Western" },
    { id: 18, data: "Etc" },
  ],
});
