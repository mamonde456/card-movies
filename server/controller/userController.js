import User from "../../models/User";
import bcrypt from "bcrypt";

export const join = async (req, res) => {
  const {
    body: {
      user: { username, name, email, password, password2 },
    },
  } = req;

  console.log(username, name, email, password, password2);

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
};

export const logout = (req, res) => {
  if (req.body.loggedIn === false) {
    req.session.destroy();
  }
};

export const editProfile = (req, res) => {
  const {
    body: { username, name, email, location, info },
    file,
  } = req;

  console.log(file, username, name, email, location, info);
  res.end();
};
