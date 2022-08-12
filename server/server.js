import express from "express";
import cors from "cors";
import session from "express-session";
import { localsMiddlewaer } from "./middleware";
import MongoStore from "connect-mongo";
import apiRouter from "./router/apiRouter";

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(localsMiddlewaer);

app.use("/uploads", express.static("uploads"));

//app 라우터로 리팩토링
app.use("/api", apiRouter);

export default app;
