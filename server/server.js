import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import session from "express-session";
import { localsMiddlewaer } from "./middleware";
import MongoStore from "connect-mongo";
import User from "../models/User";
import fetch from "cross-fetch";
import jwt from "jsonwebtoken";

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

//토큰 로그인
const token = jwt.sign(
  { foo: "bar" },
  "secret-key",
  { expiresIn: "7d" },
  (err, token) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(token);
  }
);
//app 라우터로 리팩토링
app.get("/api/join", (req, res) => {
  return res.send(`${User.find({})}`);
});
app.post("/api/join", async (req, res) => {
  const {
    body: {
      user: { username, name, email, password, password2 },
    },
  } = req;

  if (password !== password2) {
    return res.end();
  }
  const exists = await User.exists({ username });
  if (exists) {
    console.log("no");
    return res.end();
  }
  await User.create({
    username,
    name,
    email,
    password,
  });
  return res.send(User);
});

app.post("/api/login", async (req, res) => {
  const {
    body: {
      user: { username, password },
    },
  } = req;

  const user = await User.findOne({ username });
  if (!user) {
    return res.send({ errorMessage: "nothing found." });
  }
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.send({ errorMessage: "wrong password" });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.send(res.locals);
});

app.post("/api/logout", (req, res) => {
  if (req.body.loggedIn === false) {
    req.session.destroy();
  }
});

export default app;
