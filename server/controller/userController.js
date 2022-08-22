import User from "../../models/User";
import bcrypt from "bcrypt";

export const join = async (req, res) => {
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
  return res.sendStatus(200);
};

export const login = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send({ errorMessage: "user nothing found." });
  }
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).send({ errorMessage: "wrong password" });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).send(res.locals);
};

export const logout = (req, res) => {
  if (req.body.loggedIn === false) {
    req.session.destroy();
  }
};

export const getProfile = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId)
    .populate("videos")
    .populate("comments");
  // .populate("comments");
  if (!user) {
    return res.status(400).send({ errorMessage: "user noting found." });
  }
  return res.status(200).send(user);
};
export const editProfile = async (req, res) => {
  const {
    body: { userId, username, name, email, location, info },
    file,
  } = req;
  const user = await User.findById(userId);
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      avatarUrl: file ? file.path : user.avatarUrl,
      username,
      name,
      email,
      location,
      info,
    },
    { new: true }
  );

  return res.status(200).send(updateUser);
};
