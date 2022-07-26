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
import Header from "../components/Header";

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 300px;
`;

const Screen = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 800px;
  background: black;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.5)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 0;
  color: white;
  display: flex;
  align-items: center;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(
      0deg,
      #2c3333 0,
      hsla(180, 7%, 19%, 0.987) 1.62%,
      hsla(180, 7%, 19%, 0.951) 3.1%,
      hsla(180, 7%, 19%, 0.896) 4.5%,
      hsla(180, 7%, 19%, 0.825) 5.8%,
      hsla(180, 7%, 19%, 0.741) 7.06%,
      hsla(180, 7%, 19%, 0.648) 8.24%,
      hsla(180, 7%, 19%, 0.55) 9.42%,
      hsla(180, 7%, 19%, 0.45) 10.58%,
      hsla(180, 7%, 19%, 0.352) 11.76%,
      hsla(180, 7%, 19%, 0.259) 12.94%,
      hsla(180, 7%, 19%, 0.175) 14.2%,
      hsla(180, 7%, 19%, 0.104) 15.5%,
      hsla(180, 7%, 19%, 0.049) 16.9%,
      hsla(180, 7%, 19%, 0.013) 18.38%,
      hsla(180, 7%, 19%, 0) 20%
    );
  }
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
  margin-top: 800px;
`;

const Nav = styled.div`
  height: 700px;
  padding-top: 50px;
`;

const NavText = styled.p`
  height: 200px;
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
  position: absolute;
  left: 0;
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
    box-shadow: 5px 50px 5px rgba(0, 0, 0, 0.3);
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
  padding: 5px 10px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  word-wrap: break-word;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0;
  margin-bottom: 10px;
`;

const MoviesOverview = styled.p`
  height: 100px;
  padding: 10px;
  font-size: 14px;
  word-wrap: break-word;
  margin: 0;
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
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 5px;
  span {
    font-size: 12px;
  }
`;
const Popularity = styled.p`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
`;
const Vote = styled.p`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
`;

const ContentsTitle = styled.h3`
  padding: 10px;
  font-size: 42px;
  color: white;
`;

const SlideWrapper = styled.div`
  width: 100%;
  height: 520px;
  position: relative;
`;

const NextBtn = styled.div`
  width: 100px;
  height: 400px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );
  // background-color: rgba(0, 0, 0, 1);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.svg`
  width: 50px;
  height: 50px;
  padding: 10px;
  fill: white;
`;

const Movie = () => {
  const [nowIndex, setNowIndex] = useState(0);
  const [nowIsSlide, setNowIsSlide] = useState(false);
  const [topIndex, setTopIndex] = useState(0);
  const [topIsSlide, setTopIsSlide] = useState(false);
  const [userIndex, setUserIndex] = useState(0);
  const [userIsSlide, setUserIsSlide] = useState(false);
  const [popularIndex, setPopularIndex] = useState(0);
  const [popularIsSlide, setPopularIsSlide] = useState(false);

  const { isLoading: userLoading, data: users } = useQuery<IUserMovies[]>(
    ["home", "userMovies"],
    userMovies
  );
  const { isLoading: nowMoviesLoading, data: nowMovies } =
    useQuery<ItmdbMovies>(["home", "nowMovies"], nowPlayingMovies);
  console.log(nowMovies);
  const { isLoading: topMoviesLoading, data: topMovies } =
    useQuery<ItmdbMovies>(["home", "topMovies"], topRatedMovies);
  const { isLoading: popularLoading, data: popular } = useQuery<ItmdbMovies>(
    ["home", "popular"],
    popularMovies
  );
  const offset = 6;
  const nextSlide = (name: string) => {
    if (name === "now") {
      if (nowMovies) {
        if (nowIsSlide) return;
        toggleSlide("now");
        const totalMovies = nowMovies?.results.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setNowIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    } else if (name === "top") {
      if (topMovies) {
        if (topIsSlide) return;
        toggleSlide("top");
        const totalMovies = topMovies?.results.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setTopIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    } else if (name === "user") {
      if (users) {
        if (userIsSlide) return;
        toggleSlide("user");
        const totalMovies = users?.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setUserIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    } else if (name === "popular") {
      if (popular) {
        if (popularIsSlide) return;
        toggleSlide("popular");
        const totalMovies = popular?.results?.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setPopularIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    }
  };
  const toggleSlide = (name: string) => {
    if (name === "now") {
      setNowIsSlide((prev) => !prev);
    } else if (name === "top") {
      setTopIsSlide((prev) => !prev);
    } else if (name === "user") {
      setUserIsSlide((prev) => !prev);
    } else if (name === "popular") {
      setPopularIsSlide((prev) => !prev);
    }
  };
  const box = {
    start: {
      x: window.outerWidth + 200,
    },
    center: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 200,
    },
  };
  return (
    <Wrapper>
      <Header></Header>
      {userLoading ? (
        <p>d</p>
      ) : (
        <>
          <Screen
            key="screen"
            bgPhoto={makeImageFormat(nowMovies?.results[0].backdrop_path || "")}
          >
            <TextBox>
              <Link to={"/now-playing-movies/" + nowMovies?.results[0].id}>
                {" "}
                <ScreenTitle>{nowMovies?.results[0].title}</ScreenTitle>
              </Link>
              <ScreenOverview>{nowMovies?.results[0].overview}</ScreenOverview>
            </TextBox>
          </Screen>
          <ContentsWrapper>
            <>
              {popularLoading ? (
                <p>Loading...</p>
              ) : (
                <SlideWrapper>
                  <ContentsTitle>Popular Movies</ContentsTitle>
                  <AnimatePresence
                    initial={false}
                    onExitComplete={() => toggleSlide("popular")}
                  >
                    <CardBox
                      key={popularIndex}
                      variants={box}
                      initial="start"
                      animate="center"
                      exit="exit"
                      transition={{ type: "tween", duration: 1 }}
                    >
                      {popular?.results
                        .slice(
                          offset * popularIndex,
                          offset * popularIndex + offset
                        )
                        .map((movie: Iresults) => (
                          <Link
                            to={`/now-playing-movies/${movie.id}`}
                            key={movie.id}
                          >
                            <Card key={movie.id}>
                              <CardFront
                                bgPhoto={makeImageFormat(
                                  movie.poster_path,
                                  "w500"
                                )}
                              ></CardFront>
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
                    <NextBtn onClick={() => nextSlide("popular")}>
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                      </Icon>
                    </NextBtn>
                  </AnimatePresence>
                </SlideWrapper>
              )}
            </>
            <>
              {nowMoviesLoading ? (
                <p>Loading...</p>
              ) : (
                <SlideWrapper>
                  <ContentsTitle>Now Playing Movies</ContentsTitle>
                  <AnimatePresence
                    initial={false}
                    onExitComplete={() => toggleSlide("now")}
                  >
                    <CardBox
                      key={nowIndex}
                      variants={box}
                      initial="start"
                      animate="center"
                      exit="exit"
                      transition={{ type: "tween", duration: 1 }}
                    >
                      {nowMovies?.results
                        .slice(offset * nowIndex, offset * nowIndex + offset)
                        .map((movie: Iresults) => (
                          <Link
                            to={`/now-playing-movies/${movie.id}`}
                            key={movie.id}
                          >
                            <Card key={movie.id}>
                              <CardFront
                                bgPhoto={makeImageFormat(
                                  movie.poster_path,
                                  "w500"
                                )}
                              ></CardFront>
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
                    <NextBtn onClick={() => nextSlide("now")}>
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                      </Icon>
                    </NextBtn>
                  </AnimatePresence>
                </SlideWrapper>
              )}
            </>
            <>
              {topMoviesLoading ? (
                <p>Loading...</p>
              ) : (
                <SlideWrapper>
                  <AnimatePresence
                    initial={false}
                    onExitComplete={() => toggleSlide("top")}
                  >
                    <ContentsTitle>Top Rated Movies</ContentsTitle>
                    <CardBox
                      key={topIndex}
                      variants={box}
                      initial="start"
                      animate="center"
                      exit="exit"
                      transition={{ type: "tween", duration: 1 }}
                    >
                      {topMovies?.results
                        .slice(topIndex * offset, topIndex * offset + offset)
                        .map((movie: Iresults) => (
                          <Link
                            to={`/top-rated-movies/${movie.id}`}
                            key={movie.id}
                          >
                            <Card>
                              <CardFront
                                bgPhoto={makeImageFormat(
                                  movie.poster_path,
                                  "w500"
                                )}
                              ></CardFront>
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
                    <NextBtn onClick={() => nextSlide("top")}>
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                      </Icon>
                    </NextBtn>
                  </AnimatePresence>
                </SlideWrapper>
              )}
            </>
          </ContentsWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Movie;
