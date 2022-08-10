import express from "express";
import { editMovie, home, upload } from "../controller/movieController";
import { join, login, logout } from "../controller/userController";

const apiRouter = express.Router();

//User Router
apiRouter.post("/users/join", join);

apiRouter.post("/users/login", login);

apiRouter.post("/users/logout", logout);

//Movie Router

apiRouter.get("/home", home);

apiRouter.post("/movies/upload", upload);
apiRouter.post("/movies/edit-movie", editMovie);

export default apiRouter;
