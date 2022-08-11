import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  genresData,
  IApiGenres,
  ItmdbMovies,
  IUserMovies,
  Iresults,
  moviesData,
  userMovies,
} from "../api";
import { atomMovieDB } from "../atom";
import { makeImageFormat } from "../until";

const Image = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 200px;
`;

const SectionTitle = styled.h3`
  padding: 10px;
  font-size: 32px;
`;

const Home = () => {
  const { isLoading: userLoading, data: users } = useQuery<IUserMovies[]>(
    ["home", "userMovies"],
    userMovies
  );
  const { isLoading: movieLoading, data: movies } = useQuery<ItmdbMovies>(
    ["home", "tmdbMovies"],
    moviesData
  );
  const { isLoading: genresLoading, data: genresList } = useQuery<IApiGenres>(
    ["home", ""],
    genresData
  );

  return (
    <>
      {userLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <SectionTitle>User Movies</SectionTitle>
          <div>
            {users?.map((movie: IUserMovies) => (
              <div key={movie._id}>
                <Link
                  to={`movies/${movie._id}`}
                  state={{
                    title: movie.title,
                    id: movie._id,
                    description: movie.description,
                    adult: movie.adult,
                    rating: movie.meta.rating,
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
          <>
            {movieLoading ? (
              <p>dd</p>
            ) : (
              <>
                <SectionTitle>Popular Movies</SectionTitle>
                {movies?.results.map((movie: Iresults) => (
                  <div key={movie.id}>
                    <Image
                      bgPhoto={makeImageFormat(movie.backdrop_path, "w500")}
                    />
                    <Link
                      to={`movies/${movie.id}`}
                      state={{
                        title: movie.title,
                        id: movie.id,
                        description: movie.overview,
                        adult: movie.adult,
                        rating: movie.popularity,
                      }}
                    >
                      {movie.title}
                    </Link>
                    <p>{movie.adult}</p>
                    <p>{movie.overview}</p>
                  </div>
                ))}
              </>
            )}
          </>
        </>
      )}
    </>
  );
};

export default Home;
