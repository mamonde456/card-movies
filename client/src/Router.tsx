import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB } from "./atom";
import Detail from "./routes/Detail";
import EditMovie from "./routes/EditMovie";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Movies from "./routes/Movies";
import Profile from "./routes/Profile";
import Upload from "./routes/Upload";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/:userId" element={<Profile />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
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
