import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { atomMovieDB } from "../atom";

interface LocationParams {
  state: {
    movieUrl: string;
    title: string;
    id: string;
    description: string;
    adult: boolean;
    rating: number;
  };
}

const Detail = () => {
  const { movieId } = useParams();
  const { state } = useLocation() as LocationParams;
  const movies = useRecoilValue(atomMovieDB);
  const [movie, setMovie] = useState([]) as any;

  return (
    <>
      <h1>{state?.title}</h1>
      <video src={state?.movieUrl} controls></video>
      <p>{state?.description}</p>
      <p>{state?.adult ? "청소년 관람 불가" : "청소년 관람 가능"}</p>
      <p>{state?.rating}</p>
      <Link to={`/movies/${movieId}/edit-movie`}>edit movie</Link>
      <Outlet />
    </>
  );
};

export default Detail;
