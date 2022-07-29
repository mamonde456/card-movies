import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { atomMovieDB } from "../atom";

interface I {
  _id: string;
  title: string;
  description: string;
  adult: boolean;
  genres: [];
  createdAt: string;
  meta: { views: number; rating: number };
}

const Home = () => {
  const [movieDB, setMovieDB] = useRecoilState(atomMovieDB);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies/home", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMovieDB(data));
  }, []);
  return (
    <>
      <h1>home</h1>
      <div>
        {movieDB?.map((movie) => (
          <div key={movie._id}>
            <Link
              to={`/movies/${movie._id}`}
              state={{
                title: movie.title,
                id: movie._id,
              }}
            >
              {movie.title}
            </Link>
            <p>{movie.description}</p>
            <p>{movie.adult}</p>
            <div>{movie.genres}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
