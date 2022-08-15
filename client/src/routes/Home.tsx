import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
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
import { motion } from "framer-motion";
import { useState } from "react";

const CardBox = styled.div`
  width: 1200px;
  padding: 10px;
  background: yellow;
  display: flex;
  perspective: 500px;
`;

const Card = styled(motion.div)`
  width: 300px;
  height: 400px;
  padding: 10px;
  background: red;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;
`;

const CardBack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background: blue;
  padding: 10px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;
const CardFront = styled(motion.div)`
  width: 200px;
  height: 300px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  .userMoviesTitle {
    position: absolute;
    bottom: 10px;
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
`;

const Image = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
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

  const [isRotate, setIsRotate] = useState(false);

  return (
    <>
      {userLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <SectionTitle>User Movies</SectionTitle>
          <CardBox>
            {users?.map((movie: IUserMovies) => (
              <Card key={movie._id}>
                <CardFront>
                  <Image bgPhoto={"http://localhost:5000/" + movie.thumbUrl} />{" "}
                  <Link
                    className="userMoviesTitle"
                    to={`movies/${movie._id}`}
                    state={{
                      movieUrl: "http://localhost:5000/" + movie.movieUrl,
                      title: movie.title,
                      id: movie._id,
                      description: movie.description,
                      adult: movie.adult,
                      rating: movie.meta.rating,
                    }}
                  >
                    {movie.title}
                  </Link>
                </CardFront>
                <CardBack>
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
                </CardBack>
              </Card>
            ))}
          </CardBox>
          <>
            {movieLoading ? (
              <p>dd</p>
            ) : (
              <CardBox>
                <SectionTitle>Popular Movies</SectionTitle>
                {movies?.results.map((movie: Iresults) => (
                  <Link to={`movies/${movie.id}`}>
                    <Card
                      key={movie.id}
                      whileHover={{ rotateY: isRotate ? 180 : 0 }}
                    >
                      <CardFront>
                        <Image
                          bgPhoto={makeImageFormat(movie.poster_path, "w500")}
                        />
                      </CardFront>
                      <CardBack>
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
                        <p>
                          {movie.adult ? "청소년관람불가" : "청소년관람가능"}
                        </p>
                        <p>
                          {movie.overview.length >= 200
                            ? `${movie.overview.substring(0, 200)}...`
                            : movie.overview}
                        </p>
                      </CardBack>
                    </Card>
                  </Link>
                ))}
              </CardBox>
            )}
          </>
        </>
      )}
    </>
  );
};

export default Home;
