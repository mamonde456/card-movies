import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  ItmdbTv,
  ITvResults,
  tvAirToday,
  tvOnAir,
  tvPopular,
  tvTop,
} from "../api";
import Header from "../components/Header";
import { makeImageFormat } from "../until";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Screen = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 800px;
  background: black;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 0;
  top: 0px;
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

const IsLoading = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 42px;
  color: white;
`;

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

const Tv = () => {
  const { isLoading: topLoading, data: topData } = useQuery<ItmdbTv>(
    ["tv", "top"],
    tvTop
  );
  const { isLoading: popLoading, data: popData } = useQuery<ItmdbTv>(
    ["tv", "pop"],
    tvPopular
  );
  const { isLoading: onAirLoading, data: onAirData } = useQuery<ItmdbTv>(
    ["tv", "onAir"],
    tvOnAir
  );
  const { isLoading: todayLoading, data: todayData } = useQuery<ItmdbTv>(
    ["tv", "today"],
    tvAirToday
  );
  const [topSlide, setTopSlide] = useState(false);
  const [topIndex, setTopIndex] = useState(0);
  const [popSlide, setPopSlide] = useState(false);
  const [popIndex, setPopIndex] = useState(0);
  const [onSlide, setOnSlide] = useState(false);
  const [onIndex, setOnIndex] = useState(0);
  const [todaySlide, setTodaySlide] = useState(false);
  const [todayIndex, setTodayIndex] = useState(0);

  const offset = 6;
  const nextSlide = (name: string) => {
    if (name === "top") {
      if (topData) {
        if (topSlide) return;
        toggleSlide("top");
        const totalMovies = topData?.results.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setTopIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    } else if (name === "pop") {
      if (popData) {
        if (popSlide) return;
        toggleSlide("top");
        const totalMovies = popData?.results.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setPopIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    } else if (name === "on") {
      if (onAirData) {
        if (onSlide) return;
        toggleSlide("on");
        const totalMovies = onAirData?.results.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setOnIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    } else if (name === "today") {
      if (todayData) {
        if (todaySlide) return;
        toggleSlide("today");
        const totalMovies = todayData?.results.length;
        const lastMovies = Math.ceil(totalMovies / offset) - 1;
        setTodayIndex((prev) => (prev === lastMovies ? 0 : prev + 1));
      }
    }
  };
  const toggleSlide = (name: string) => {
    if (name === "top") {
      setTopSlide((prev) => !prev);
    } else if (name === "pop") {
      setPopSlide((prev) => !prev);
    } else if (name === "on") {
      setOnSlide((prev) => !prev);
    } else if (name === "today") {
      setTodaySlide((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Header></Header>

      {topLoading ? (
        <IsLoading>Loading...</IsLoading>
      ) : (
        <>
          <Screen
            key="screen"
            bgPhoto={makeImageFormat(topData?.results[0].backdrop_path || "")}
          >
            <TextBox>
              <Link to={"top-rated/" + topData?.results[0].id}>
                {" "}
                <ScreenTitle>{topData?.results[0].name}</ScreenTitle>
              </Link>
              <ScreenOverview>{topData?.results[0].overview}</ScreenOverview>
            </TextBox>
          </Screen>
          <ContentsWrapper>
            {onAirLoading ? (
              <SlideWrapper>
                <ContentsTitle>TV On The Air</ContentsTitle>
                <IsLoading>Loading...</IsLoading>
              </SlideWrapper>
            ) : (
              <SlideWrapper>
                <ContentsTitle>TV On The Air</ContentsTitle>
                <AnimatePresence
                  initial={false}
                  onExitComplete={() => toggleSlide("on")}
                >
                  <CardBox
                    key={onIndex}
                    variants={box}
                    initial="start"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                  >
                    {onAirData?.results
                      .slice(offset * onIndex, offset * onIndex + offset)
                      .map((tv: ITvResults) => (
                        <Link to={`${tv.id}`} key={tv.id}>
                          <Card key={tv.id}>
                            <CardFront
                              bgPhoto={makeImageFormat(tv.poster_path, "w500")}
                            ></CardFront>
                            <CardBack>
                              <MoviesAdult>
                                {tv.adult ? "Adult" : "Not an adult"}
                              </MoviesAdult>
                              <MoviesImg
                                bgPhoto={makeImageFormat(
                                  tv.backdrop_path,
                                  "w500"
                                )}
                              ></MoviesImg>
                              <MoviesTitle>
                                {tv.name.length >= 33
                                  ? `${tv.name.slice(0, 33)}...`
                                  : tv.name}
                              </MoviesTitle>
                              <MoviesOverview>
                                {tv.overview.length >= 122
                                  ? `${tv.overview.slice(0, 122)}...`
                                  : tv.overview}
                              </MoviesOverview>
                              <EtcBox>
                                <Popularity>
                                  <span>Popularity: </span>
                                  {tv.popularity}
                                </Popularity>
                                <Vote>
                                  <span>Vote Average: </span>
                                  {tv.vote_average}
                                </Vote>
                              </EtcBox>
                            </CardBack>
                          </Card>
                        </Link>
                      ))}
                  </CardBox>
                  <NextBtn onClick={() => nextSlide("on")}>
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
            {todayLoading ? (
              <SlideWrapper>
                <ContentsTitle>TV Airing Today</ContentsTitle>
                <IsLoading>Loading...</IsLoading>
              </SlideWrapper>
            ) : (
              <SlideWrapper>
                <ContentsTitle>TV Airing Today</ContentsTitle>
                <AnimatePresence
                  initial={false}
                  onExitComplete={() => toggleSlide("today")}
                >
                  <CardBox
                    key={todayIndex}
                    variants={box}
                    initial="start"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                  >
                    {todayData?.results
                      .slice(offset * todayIndex, offset * todayIndex + offset)
                      .map((tv: ITvResults) => (
                        <Link to={`${tv.id}`} key={tv.id}>
                          <Card key={tv.id}>
                            <CardFront
                              bgPhoto={makeImageFormat(tv.poster_path, "w500")}
                            ></CardFront>
                            <CardBack>
                              <MoviesAdult>
                                {tv.adult ? "Adult" : "Not an adult"}
                              </MoviesAdult>
                              <MoviesImg
                                bgPhoto={makeImageFormat(
                                  tv.backdrop_path,
                                  "w500"
                                )}
                              ></MoviesImg>
                              <MoviesTitle>
                                {tv.name.length >= 33
                                  ? `${tv.name.slice(0, 33)}...`
                                  : tv.name}
                              </MoviesTitle>
                              <MoviesOverview>
                                {tv.overview.length >= 122
                                  ? `${tv.overview.slice(0, 122)}...`
                                  : tv.overview}
                              </MoviesOverview>
                              <EtcBox>
                                <Popularity>
                                  <span>Popularity: </span>
                                  {tv.popularity}
                                </Popularity>
                                <Vote>
                                  <span>Vote Average: </span>
                                  {tv.vote_average}
                                </Vote>
                              </EtcBox>
                            </CardBack>
                          </Card>
                        </Link>
                      ))}
                  </CardBox>
                  <NextBtn onClick={() => nextSlide("to")}>
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
            {topLoading ? (
              <SlideWrapper>
                <ContentsTitle>Top Rated TV</ContentsTitle>
                <IsLoading>Loading...</IsLoading>
              </SlideWrapper>
            ) : (
              <SlideWrapper>
                <ContentsTitle>Top Rated TV</ContentsTitle>
                <AnimatePresence
                  initial={false}
                  onExitComplete={() => toggleSlide("top")}
                >
                  <CardBox
                    key={topIndex}
                    variants={box}
                    initial="start"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                  >
                    {topData?.results
                      .slice(offset * topIndex, offset * topIndex + offset)
                      .map((tv: ITvResults) => (
                        <Link to={`${tv.id}`} key={tv.id}>
                          <Card key={tv.id}>
                            <CardFront
                              bgPhoto={makeImageFormat(tv.poster_path, "w500")}
                            ></CardFront>
                            <CardBack>
                              <MoviesAdult>
                                {tv.adult ? "Adult" : "Not an adult"}
                              </MoviesAdult>
                              <MoviesImg
                                bgPhoto={makeImageFormat(
                                  tv.backdrop_path,
                                  "w500"
                                )}
                              ></MoviesImg>
                              <MoviesTitle>
                                {tv.name.length >= 33
                                  ? `${tv.name.slice(0, 33)}...`
                                  : tv.name}
                              </MoviesTitle>
                              <MoviesOverview>
                                {tv.overview.length >= 122
                                  ? `${tv.overview.slice(0, 122)}...`
                                  : tv.overview}
                              </MoviesOverview>
                              <EtcBox>
                                <Popularity>
                                  <span>Popularity: </span>
                                  {tv.popularity}
                                </Popularity>
                                <Vote>
                                  <span>Vote Average: </span>
                                  {tv.vote_average}
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
            {popLoading ? (
              <SlideWrapper>
                <ContentsTitle>Popular TV</ContentsTitle>
                <IsLoading>Loading...</IsLoading>
              </SlideWrapper>
            ) : (
              <SlideWrapper>
                <ContentsTitle>Popular TV</ContentsTitle>
                <AnimatePresence
                  initial={false}
                  onExitComplete={() => toggleSlide("pop")}
                >
                  <CardBox
                    key={popIndex}
                    variants={box}
                    initial="start"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                  >
                    {popData?.results
                      .slice(offset * popIndex, offset * popIndex + offset)
                      .map((tv: ITvResults) => (
                        <Link to={`${tv.id}`} key={tv.id}>
                          <Card key={tv.id}>
                            <CardFront
                              bgPhoto={makeImageFormat(tv.poster_path, "w500")}
                            ></CardFront>
                            <CardBack>
                              <MoviesAdult>
                                {tv.adult ? "Adult" : "Not an adult"}
                              </MoviesAdult>
                              <MoviesImg
                                bgPhoto={makeImageFormat(
                                  tv.backdrop_path,
                                  "w500"
                                )}
                              ></MoviesImg>
                              <MoviesTitle>
                                {tv.name.length >= 33
                                  ? `${tv.name.slice(0, 33)}...`
                                  : tv.name}
                              </MoviesTitle>
                              <MoviesOverview>
                                {tv.overview.length >= 122
                                  ? `${tv.overview.slice(0, 122)}...`
                                  : tv.overview}
                              </MoviesOverview>
                              <EtcBox>
                                <Popularity>
                                  <span>Popularity: </span>
                                  {tv.popularity}
                                </Popularity>
                                <Vote>
                                  <span>Vote Average: </span>
                                  {tv.vote_average}
                                </Vote>
                              </EtcBox>
                            </CardBack>
                          </Card>
                        </Link>
                      ))}
                  </CardBox>
                  <NextBtn onClick={() => nextSlide("pop")}>
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
          </ContentsWrapper>
        </>
      )}
    </Wrapper>
  );
};
export default Tv;
