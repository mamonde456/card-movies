import express from "express";
import cors from "cors";
import session from "express-session";
import { localsMiddlewaer } from "./middleware";
import MongoStore from "connect-mongo";
import apiRouter from "./router/apiRouter";
import * as path from "path";

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
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(localsMiddlewaer);

app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../assets/build")));

app.use("/api", apiRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../assets/build/index.html"));
});

export default app;
