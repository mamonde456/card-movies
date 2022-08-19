import express from "express";
import { editMovie, home, upload, watch } from "../controller/movieController";
import {
  editProfile,
  join,
  login,
  logout,
  postAvatar,
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
apiRouter.post("/users/avatar", uploadsAvatar.single("avatar"), postAvatar);

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

export default apiRouter;
