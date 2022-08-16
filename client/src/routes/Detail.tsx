import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IUserMovies, userMovies } from "../api";
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
  const [movie, setMovie] = useState() as any;
  useEffect(() => {
    fetch("http://localhost:5000/api/movies/watch", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId,
      }),
    }).then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        setMovie(data);
      } else if (response.status === 400) {
        console.log(data);
      }
    });
  }, [movieId]);
  // const { state } = useLocation() as LocationParams;
  const movies = useRecoilValue(atomMovieDB);

  return (
    <>
      <h1>{movie.title}</h1>
    </>
  );
};

export default Detail;
