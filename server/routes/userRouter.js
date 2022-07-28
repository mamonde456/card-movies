import express from "express";
import User from "../../models/User";

const userRouter = express.Router();

userRouter.post("/join", async (req, res) => {
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

userRouter.post("/login", async (req, res) => {
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

userRouter.post("/api/logout", (req, res) => {
  if (req.body.loggedIn === false) {
    req.session.destroy();
  }
});

export default userRouter;
