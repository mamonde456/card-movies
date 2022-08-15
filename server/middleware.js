import multer from "multer";

export const localsMiddlewaer = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;

  next();
};

export const uploadsAvatar = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const uploadsMovies = multer({
  dest: "uploads/movies/",
  limits: {
    fileSize: 10000000,
  },
});
