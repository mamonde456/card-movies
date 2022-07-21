import "./db";
import User from "../models/User";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  session({
    secret: "mamonde456",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
    console.log("noting found.");
  }
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    console.log("wrong password");
  }
  req.session.loggedIn = true;
  req.session.user = user;
  const session = req.session;
  console.log(session);

  return res.redirect("/");
});

// app.use("/", express.static(path.join(__dirname, "../client/build")));

// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "../client/build/index.html"))
// );

app.listen(PORT, () =>
  console.log(`server to listening http://localhost:${PORT}`)
);
