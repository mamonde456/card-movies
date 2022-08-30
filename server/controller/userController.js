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
    location: req.body.user.location ? req.body.user.location : "",
  });
  return res.sendStatus(200);
};

export const login = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  const user = await User.findOne({ username });
  //$2b$10$XOXAXWyJSl05gaW9.yNEv.5AKbzzulWB9lcjejqqqGjoxmyd0YFji
  console.log(user.password);
  if (!user) {
    return res.status(400).send({ errorMessage: "user nothing found." });
  }
  const ok = await bcrypt.compare(password, user.password);
  console.log(ok, password, user.password);

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

export const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).send({ errorMessage: "user noting found." });
  }
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res
      .status(400)
      .send({ errorMessage: "Existing passwords do not match." });
  }
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .send({ errorMessage: "The new password does not match." });
  }
  user.password = newPassword;
  await user.save();

  return res.sendStatus(200);
};
