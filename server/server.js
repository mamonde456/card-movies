import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import session from "express-session";
import { localsMiddlewaer } from "./middleware";
import MongoStore from "connect-mongo";
import User from "../models/User";
import fetch from "cross-fetch";
import jwt from "jsonwebtoken";
import userRouter from "./routes/userRouter";
import movieRouter from "./routes/movieRouter";

const app = express();

app.use(
  session({
    secret: process.env.DB_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(localsMiddlewaer);

//app 라우터로 리팩토링
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

export default app;
