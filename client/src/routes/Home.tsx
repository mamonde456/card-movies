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
  nowPlayingMovies,
  topRatedMovies,
} from "../api";
import { makeImageFormat } from "../until";
import { AnimatePresence, motion } from "framer-motion";
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

const CardBox = styled(motion.div)`
  // width: 1200px;
  position: relative;
  padding: 10px;
  display: flex;
  perspective: 800px;
`;

const Card = styled(motion.div)`
  width: 280px;
  height: 400px;
  padding: 10px;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform-origin: center right;
  border-radius: 10px;
  margin-right: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
  transition: ease 1s;
  &:hover {
    transition: ease 1s, top 0.5s;
    top: -30px;
    transform: translateX(-100%) rotateY(-180deg);
    box-shadow: 5px 100px 5px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background-color: black;
  border-radius: 10px;
  color: white;
`;

const MoviesImg = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 120px;
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const CardFront = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 10px;
  overflow: hidden;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  .userMoviesTitle {
    width: 100%;
    padding: 0px 10px;
    position: absolute;
    bottom: 0;
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    color: white;
    word-wrap: break-word;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
  }
`;

const MoviesTitle = styled.p`
  padding: 0px 10px;
  // font-size: 18px;
  font-weight: 700;
  text-align: center;
  word-wrap: break-word;
`;
const MoviesOverview = styled.p`
  height: 100px;
  padding: 10px;
  font-size: 14px;
  word-wrap: break-word;
`;
const MoviesAdult = styled.p`
  padding-right: 20px;
  font-size: 12px;
  opacity: 0.5;
  text-align: right;
`;
const MoviesGenres = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // gap: 10px;
  text-align: center;
  font-size: 12px;
  p {
    margin: 0;
    margin-top: 10px;
  }
`;

const EtcBox = styled.div`
  display: flex;
  gap: 10px;
  text-align: center;
  padding: 5px;
  span {
    font-size: 12px;
  }
`;
const Popularity = styled.p`
  padding: 10px;
`;
const Vote = styled.p`
  padding: 10px;
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

const NextBtn = styled.div`
  width: 100px;
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 1);
`;

const box = {
  start: {
    opacity: 0,
    transition: {
      duration: 1,
    },
    // x: -,
  },
  center: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
    x: 200,
  },
};

const Home = () => {
  const [slide, setSlide] = useState(1);

  const { isLoading: userLoading, data: users } = useQuery<IUserMovies[]>(
    ["home", "userMovies"],
    userMovies
  );
  const { isLoading: nowMoviesLoading, data: nowMovies } =
    useQuery<ItmdbMovies>(["home", "nowMovies"], nowPlayingMovies);

  const { isLoading: topMoviesLoading, data: topMovies } =
    useQuery<ItmdbMovies>(["home", "topMovies"], topRatedMovies);

  const nextSlide = () => {
    setSlide((prev) =>
      prev === nowMovies?.results.length ? nowMovies?.results.length : prev + 1
    );
  };
  console.log(topMovies);
  return (
    <Wrapper>
      {userLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Screen
            key="screen"
            bgPhoto={makeImageFormat(nowMovies?.results[0].backdrop_path || "")}
          >
            <TextBox>
              <ScreenTitle>{nowMovies?.results[0].title}</ScreenTitle>
              <ScreenOverview>{nowMovies?.results[0].overview}</ScreenOverview>
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
              <Link to="latest-movies">
                <NavText>The latest movie</NavText>
              </Link>
              <Link to="upcoming-movies">
                <NavText>an upcoming movie</NavText>
              </Link>
            </Nav>
            <ContentsTitle>User Movies</ContentsTitle>
            <CardBox key="userMovieWrap">
              {users?.map((movie: IUserMovies) => (
                <Card key={movie._id}>
                  <CardFront
                    bgPhoto={"http://localhost:5000/" + movie.thumbUrl}
                  >
                    <p className="userMoviesTitle">
                      {movie.title.length >= 15
                        ? `${movie.title.slice(0, 15)}`
                        : movie.title}
                    </p>
                    {/* <Image
                      bgPhoto={"http://localhost:5000/" + movie.thumbUrl}
                    />{" "} */}
                  </CardFront>
                  <CardBack>
                    <MoviesAdult>
                      {movie.adult ? "Adult" : "Not an adult"}
                    </MoviesAdult>
                    <MoviesTitle>
                      {movie.title.length >= 33
                        ? `${movie.title.slice(0, 33)}...`
                        : movie.title}
                    </MoviesTitle>
                    <MoviesOverview>
                      {movie.overview.length >= 122
                        ? `${movie.overview.slice(0, 122)}...`
                        : movie.overview}
                    </MoviesOverview>
                    <MoviesGenres>
                      {movie.genres.map((el: string) =>
                        el
                          .split(",")
                          .slice(0, 4)
                          .map((el: string) => <p>{el}</p>)
                      )}
                    </MoviesGenres>
                  </CardBack>
                </Card>
              ))}
            </CardBox>
            <>
              {nowMoviesLoading ? (
                <p>dd</p>
              ) : (
                <>
                  <ContentsTitle>Now Playing Movies</ContentsTitle>
                  <AnimatePresence>
                    <CardBox
                      key="apiMovieWrap"
                      variants={box}
                      initial="start"
                      animate="center"
                      exit="exit"
                    >
                      {nowMovies?.results.map((movie: Iresults) => (
                        <Link
                          to={`now-playing-movies/${movie.id}`}
                          key={movie.id}
                        >
                          <Card key={movie.id}>
                            <CardFront
                              bgPhoto={makeImageFormat(
                                movie.poster_path,
                                "w500"
                              )}
                            >
                              {/* <Image
                              bgPhoto={makeImageFormat(movie.poster_path, "w500")}
                            /> */}
                            </CardFront>
                            <CardBack>
                              <MoviesAdult>
                                {movie.adult ? "Adult" : "Not an adult"}
                              </MoviesAdult>
                              <MoviesTitle>
                                {movie.title.length >= 33
                                  ? `${movie.title.slice(0, 33)}...`
                                  : movie.title}
                              </MoviesTitle>
                              <MoviesOverview>
                                {movie.overview.length >= 122
                                  ? `${movie.overview.slice(0, 122)}...`
                                  : movie.overview}
                              </MoviesOverview>
                            </CardBack>
                          </Card>
                        </Link>
                      ))}
                    </CardBox>
                    <NextBtn onClick={nextSlide}>&gt;</NextBtn>
                  </AnimatePresence>
                </>
              )}
            </>
            <>
              {topMoviesLoading ? (
                <p>dd</p>
              ) : (
                <>
                  <ContentsTitle>Top Rated Movies</ContentsTitle>
                  <CardBox key="apiMovieWrap">
                    {topMovies?.results.map((movie: Iresults) => (
                      <Link to={`top-rated-movies/${movie.id}`} key={movie.id}>
                        <Card
                          key={movie.id}
                          variants={box}
                          initial="start"
                          animate="center"
                          exit="exit"
                          onHoverStart={nextSlide}
                        >
                          <CardFront
                            bgPhoto={makeImageFormat(movie.poster_path, "w500")}
                          >
                            {/* <Image
                              bgPhoto={makeImageFormat(
                                movie.poster_path,
                                "w500"
                              )}
                            /> */}
                          </CardFront>
                          <CardBack>
                            <MoviesAdult>
                              {movie.adult ? "Adult" : "Not an adult"}
                            </MoviesAdult>
                            <MoviesImg
                              bgPhoto={makeImageFormat(
                                movie.backdrop_path,
                                "w500"
                              )}
                            ></MoviesImg>
                            <MoviesTitle>
                              {movie.title.length >= 33
                                ? `${movie.title.slice(0, 33)}...`
                                : movie.title}
                            </MoviesTitle>
                            <MoviesOverview>
                              {movie.overview.length >= 122
                                ? `${movie.overview.slice(0, 122)}...`
                                : movie.overview}
                            </MoviesOverview>
                            <EtcBox>
                              <Popularity>
                                <span>Popularity: </span>
                                {movie.popularity}
                              </Popularity>
                              <Vote>
                                <span>Vote Average: </span>
                                {movie.vote_average}
                              </Vote>
                            </EtcBox>
                          </CardBack>
                        </Card>
                      </Link>
                    ))}
                  </CardBox>
                </>
              )}
            </>
          </ContentsWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
