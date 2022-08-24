import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  genresData,
  IApiGenres,
  ItmdbMovies,
  IUserMovies,
  Iresults,
  userMovies,
  popularMovies,
} from "../api";
import { makeImageFormat } from "../until";
import { motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  padding-top: 100px;
`;

const Screen = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 720px;
  background: black;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 0;
  top: 80px;
  color: white;
  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  width: 1200px;
  padding: 10px;
  margin-left: 100px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const ScreenTitle = styled.p`
  font-size: 42px;
  font-weight: 700;
`;
const ScreenOverview = styled.p`
  width: 800px;
`;

const ContentsWrapper = styled.div`
  margin-top: 720px;
`;

const Nav = styled.div``;
const NavText = styled.p`
  height: 150px;
  padding: 0px;
  margin: 0px;
  font-size: 62px;
  color: white;
  text-indent: 250px;
  line-height: 150px;
  border-bottom: solid 1px white;
  transition: 0.5s ease;
  &:first-child {
    border-top: solid 1px white;
  }
  &:hover {
    text-indent: 500px;
    color: #54bab9;
  }
`;

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

const ContentsTitle = styled.h3`
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
    popularMovies
  );
  const { isLoading: genresLoading, data: genresList } = useQuery<IApiGenres>(
    ["home", ""],
    genresData
  );

  const [isRotate, setIsRotate] = useState(false);

  return (
    <Wrapper>
      {userLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Screen
            key="screen"
            bgPhoto={makeImageFormat(movies?.results[0].backdrop_path || "")}
          >
            <TextBox>
              <ScreenTitle>{movies?.results[0].title}</ScreenTitle>
              <ScreenOverview>{movies?.results[0].overview}</ScreenOverview>
            </TextBox>
          </Screen>
          <ContentsWrapper key="contentswrap">
            <Nav>
              <Link to="users-movies">
                <NavText>User-created movies</NavText>
              </Link>
              <Link to="popular-movies">
                <NavText>Popular movies</NavText>
              </Link>
              <NavText>The latest movie</NavText>
              <NavText>a movie to be released</NavText>
            </Nav>
            <ContentsTitle>User Movies</ContentsTitle>
            <CardBox key="userMovieWrap">
              {users?.map((movie: IUserMovies) => (
                <Card key={movie._id}>
                  <CardFront>
                    <Image
                      bgPhoto={"http://localhost:5000/" + movie.thumbUrl}
                    />{" "}
                    <Link
                      className="userMoviesTitle"
                      to={`users-movies/${movie._id}`}
                      key={movie._id}
                    >
                      {movie.title}
                    </Link>
                  </CardFront>
                  <CardBack>
                    <Link to={`users-movies/${movie._id}`} key={movie._id}>
                      {movie.title}
                    </Link>
                    <p>{movie.overview}</p>
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
                <CardBox key="apiMovieWrap">
                  <ContentsTitle>Popular Movies</ContentsTitle>
                  {movies?.results.map((movie: Iresults) => (
                    <Link to={`movies/${movie.id}`} key={movie.id}>
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
          </ContentsWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
