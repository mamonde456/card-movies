import express from "express";
import {
  comments,
  deleteMovie,
  editMovie,
  home,
  upload,
  watch,
} from "../controller/movieController";
import {
  editProfile,
  getProfile,
  join,
  login,
  logout,
} from "../controller/userController";
import { uploadsAvatar, uploadsMovies } from "../middleware";

const apiRouter = express.Router();

//Root Router
apiRouter.post("/users/join", join);

apiRouter.post("/users/login", login);

apiRouter.post("/users/logout", logout);

//User Router
apiRouter.post(
  "/users/:id([0-9a-f]{24})/edit-profile",
  uploadsAvatar.single("avatar"),
  editProfile
);
apiRouter.post(
  "/users/:id([0-9a-f]{24})",
  uploadsAvatar.single("avatar"),
  getProfile
);

//Movie Router

apiRouter.get("/home", home);

apiRouter.post("/movies/watch", watch);
apiRouter.post(
  "/movies/upload",
  uploadsMovies.fields([{ name: "movie" }, { name: "thumb" }]),
  upload
);
apiRouter.post(
  "/movies/:id([0-9a-f]{24})/edit-movie",
  uploadsMovies.fields([{ name: "movie" }, { name: "thumb" }]),
  editMovie
);
apiRouter.post("/movies/delete-movie", deleteMovie);

//Api

apiRouter.post("/comments", comments);

export default apiRouter;
