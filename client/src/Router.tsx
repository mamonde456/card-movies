import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB } from "./atom";
import ChangePassword from "./routes/ChangePassword";
import Detail from "./routes/Detail";
import EditMovie from "./routes/EditMovie";
import EditProfile from "./routes/EditProfile";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import UserMovies from "./routes/UsersMovies";
import Profile from "./routes/Profile";
import Upload from "./routes/Upload";
import Header from "./routes/Header";

const Router = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/users/:userId" element={<Profile />}></Route>
        <Route
          path="/users/:userId/edit-profile"
          element={<EditProfile />}
        ></Route>
        <Route
          path="/users/:userId/edit-profile/change-password"
          element={<ChangePassword />}
        ></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/users-movies" element={<UserMovies />}></Route>
        <Route path="/movies/:movieId" element={<Detail />}></Route>
        <Route
          path="/movies/:movieId/edit-movie"
          element={<EditMovie />}
        ></Route>
      </Routes>
    </>
  );
};

export default Router;
