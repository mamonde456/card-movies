import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB } from "./atom";
import ChangePassword from "./routes/ChangePassword";
import Detail from "./components/Detail";
import EditMovie from "./routes/EditMovie";
import EditProfile from "./routes/EditProfile";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import UserMovies from "./routes/UsersMovies";
import Profile from "./routes/Profile";
import Upload from "./routes/Upload";
import Header from "./components/Header";
import PopMovies from "./routes/PopMovies";
import UserDetail from "./routes/UserDetail";
import PopDetail from "./routes/PopDetail";
import UpcomingMovies from "./routes/UpcomingMovies";
import NowDetail from "./routes/NowDetail";
import TopDetail from "./routes/TopDetail";
import UpcomingDetail from "./routes/UpcomingDetail";
import LatestMovies from "./routes/LatestMovies";
import Intro from "./routes/Intro";
import Tv from "./routes/Tv";
import Movie from "./routes/Movie";
import TVDetail from "./components/TVDeatil";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
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
        <Route path="/popular-movies" element={<PopMovies />}></Route>
        <Route path="/latest-movies" element={<LatestMovies />}></Route>
        <Route path="/upcoming-movies" element={<UpcomingMovies />}></Route>
        <Route path="/users-movies" element={<UserMovies />}></Route>
        <Route path="/users-movies/:movieId" element={<UserDetail />}></Route>
        <Route path="/popular-movies/:movieId" element={<PopDetail />}></Route>
        <Route
          path="/now-playing-movies/:movieId"
          element={<NowDetail />}
        ></Route>
        <Route
          path="/top-rated-movies/:movieId"
          element={<TopDetail />}
        ></Route>
        <Route
          path="/upcoming-movies/:movieId"
          element={<UpcomingDetail />}
        ></Route>
        <Route
          path="/users-movies/:movieId/edit-movie"
          element={<EditMovie />}
        ></Route>
        <Route path="/tv/:tvId" element={<TVDetail />}></Route>
      </Routes>
    </>
  );
};

export default Router;
