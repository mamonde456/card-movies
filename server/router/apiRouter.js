import express from "express";
import { editMovie, home, upload } from "../controller/movieController";
import { editProfile, join, login, logout } from "../controller/userController";
import { uploadsAvatar } from "../middleware";

const apiRouter = express.Router();

//Root Router
apiRouter.post("/users/join", join);

apiRouter.post("/users/login", login);

apiRouter.post("/users/logout", logout);

//User Router
apiRouter.post(
  "/users/edit-profile",
  uploadsAvatar.single("avatar"),
  editProfile
);

//Movie Router

apiRouter.get("/home", home);

apiRouter.post("/movies/upload", upload);
apiRouter.post("/movies/edit-movie", editMovie);

export default apiRouter;