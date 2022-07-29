import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB } from "../atom";

interface LocationParams {
  state: {
    title: string;
    id: string;
  };
}

const Detail = () => {
  const { movieId } = useParams();
  const { state } = useLocation() as LocationParams;
  const movies = useRecoilValue(atomMovieDB);
  const [movie, setMovie] = useState([]) as any;

  return (
    <>
      <h1>Detail</h1>
      <div>{state?.title}</div>
      <Link to={`/movies/${movieId}/edit-movie`}>edit movie</Link>
      <Outlet />
    </>
  );
};

export default Detail;
