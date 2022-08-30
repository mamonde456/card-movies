import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUserMovies } from "../api";
import { makeImageFormat } from "../until";
import Header from "./Header";

const Wrapper = styled.div`
  width: 100%;
  height:100%:
  overflow: hidden;
`;

const ContentWrap = styled.div<{ thumb: string }>`
  width: 1600px;
  height: 850px;
  margin: 0 auto;
  position: relative;
  top: 30px;
  color: white;
  background-color: white;
  background-image: url(${(props) => props.thumb});
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  padding: 10px;
`;

const Menu = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  position: relative;
  header {
    background: none;
    height: 50px;
    position: absolute;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8));
  }
`;

const ListWrap = styled.div`
  width: 320px;
  height: 780px;
  position: absolute;
  right: 120px;
  top: 60px;
  button {
    width: 120px;
    height: 30px;
    position: absolute;
    left: 50%;
    margin-left: -60px;
    bottom: 0px;
    background: none;
    border: solid 1px white;
    color: white;
    border-radius: 10px;
  }
  overflow: hidden;
`;
const MoviesList = styled(motion.ul)`
  margin: 0;
  counter-reset: numbering;
  width: 320px;
  height: 740px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
`;

const MoviesLi = styled.li<{ bgPhoto: string }>`
  &::before {
    counter-increment: numbering;
    content: "0" counter(numbering);
    font-weight: 700;
    font-size: 100px;
    text-shadow: 2px 5px 5px rgba(0, 0, 0, 0.8);
    position: absolute;
    right: 10px;
    top: -50px;
  }
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5);
`;

const TxtBox = styled.div`
  position: absolute;
  left: 20px;
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  p {
    text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.8);
    margin: 0;
    padding: 0;
  }
`;

const IconBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 10px;
`;

const Icon = styled.svg`
  fill: white;
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
`;

const LiTitle = styled.p`
  font-size: 22px;
  font-weight: 700;
`;

const LiText = styled.p`
  font-size: 12px;
`;

// const Bg = styled.div<{ thumb: any }>`
//   width: 100%;
//   height: 800px;
//   padding: 10px;
//   border-radius: 30px;

//   z-index: -1;
// `;

const ContentBox = styled.div`
  width: 600px;
  padding: 10px 20px;
  border-radius: 10px;
  position: absolute;
  bottom: 250px;
  left: 100px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentTitle = styled.h3`
  font-size: 42px;
  word-wrap: break-word;
`;
const ContentText = styled.div`
  font-size: 18px;
  word-wrap: break-word;
`;
const Genres = styled.p`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-evenly;
  gap: 10px;
  span {
    padding: 5px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
`;

const BtnText = styled.div`
  width: 200px;
  padding: 10px;
  position: absolute;
  left: 100px;
  bottom: 150px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
  font-size: 18px;
  border-radius: 10px;
  div {
    width: 60px;
    height: 60px;
  }
`;

const slide = {
  start: {
    y: window.outerHeight,
  },
  center: {
    y: 0,
  },
  exit: {
    y: -window.outerHeight,
  },
};

const Movies = (props: any) => {
  const [backgroundUrl, setBackgroundUrl] = useState({
    id: "",
    thumbUrl: "",
    title: "",
    overview: "",
    adult: false,
    genres: [],
    createdAt: "",
  });

  const [isSlide, setIsSlide] = useState(false);
  const [index, setIndex] = useState(0);
  const offset = 4;
  const onSlide = () => {
    if (props?.movies) {
      if (isSlide) return;
      toggleSlide();
      const total = props?.movies.length;
      const last = Math.ceil(total / offset) - 1;
      setIndex((prev) => (prev === last ? 0 : prev + 1));
      console.log(total, last, index);
    }
  };

  const toggleSlide = () => {
    setIsSlide((prev) => !prev);
  };

  const onClick = (movie: IUserMovies) => {
    const thumbUrl = movie.thumbUrl
      ? "http://localhost:5000/" + movie.thumbUrl
      : makeImageFormat(movie?.backdrop_path);
    const title = movie.title;
    const overview = movie.overview;
    const adult = movie.adult;
    const genres = movie.genres ? movie.genres : [];
    const createdAt = movie.createdAt ? movie.createdAt : movie.release_date;
    const id = movie._id ? movie._id : movie.id;

    setBackgroundUrl({
      id,
      thumbUrl,
      title,
      overview,
      adult,
      genres,
      createdAt,
    });
  };
  useEffect(() => {
    setBackgroundUrl({
      id: props.link === "users" ? props.movies[0]._id : props.movies[0].id,
      thumbUrl: props.movies[0].thumbUrl
        ? "http://localhost:5000/" + props.movies[0].thumbUrl
        : makeImageFormat(props?.movies[0]?.backdrop_path),
      title: props.movies ? props.movies[0].title : "",
      overview: props.movies ? props.movies[0].overview : "",
      adult: props.movies ? props.movies[0].adult : false,
      genres: props.movies ? props.movies[0].genres : [],
      createdAt: props.movies[0].createdAt
        ? props.movies[0].createdAt
        : props.movies[0].release_date,
    });
  }, [props.movies]);

  return (
    <Wrapper>
      <ContentWrap thumb={backgroundUrl.thumbUrl}>
        <Menu>
          <Header link={"movies"} />
        </Menu>
        <ListWrap>
          <AnimatePresence initial={false} onExitComplete={toggleSlide}>
            <MoviesList
              key={index}
              variants={slide}
              initial="start"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
            >
              {props.movies
                .slice(index * offset, index * offset + offset)
                ?.map((movie: any) => (
                  <>
                    <MoviesLi
                      key={movie._id}
                      bgPhoto={
                        movie?.thumbUrl
                          ? "http://localhost:5000/" + movie?.thumbUrl
                          : makeImageFormat(movie.backdrop_path, "w500")
                      }
                      onClick={() => onClick(movie)}
                    >
                      <IconBox>
                        <Icon
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z" />
                        </Icon>
                      </IconBox>
                      <TxtBox>
                        <LiTitle>{movie?.title}</LiTitle>
                        <LiText>
                          {movie?.release_date
                            ? movie?.release_date
                            : movie?.createdAt.slice(0, 10)}
                        </LiText>
                      </TxtBox>
                    </MoviesLi>
                  </>
                ))}
            </MoviesList>
          </AnimatePresence>
          <button onClick={onSlide}>next</button>
        </ListWrap>
        <ContentBox>
          <ContentTitle>
            {backgroundUrl?.title.length >= 40
              ? `${backgroundUrl?.title.slice(0, 40)}...`
              : backgroundUrl?.title}
          </ContentTitle>
          <ContentText>{backgroundUrl?.overview}</ContentText>
          <ContentText>
            <Genres>
              {backgroundUrl?.genres?.map((genre: string) =>
                genre.split(",").map((el: any) => <span>{el}</span>)
              )}
            </Genres>
          </ContentText>
          <ContentText>
            {props.link === "users"
              ? backgroundUrl?.createdAt.slice(0, 10)
              : backgroundUrl?.createdAt}
          </ContentText>
        </ContentBox>
        <Link to={`/${props.link}-movies/${backgroundUrl.id}`}>
          <BtnText>
            <IconBox>
              <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM330.5 323.9c0 6.473-3.889 12.3-9.877 14.78c-5.979 2.484-12.86 1.105-17.44-3.469l-45.25-45.25l-67.92 67.92c-12.5 12.5-32.72 12.46-45.21-.0411l-22.63-22.63C109.7 322.7 109.6 302.5 122.1 289.1l67.92-67.92L144.8 176.8C140.2 172.2 138.8 165.3 141.3 159.4c2.477-5.984 8.309-9.875 14.78-9.875h158.4c8.835 0 15.1 7.163 15.1 15.1V323.9z" />
              </Icon>
            </IconBox>
            watch movie
          </BtnText>
        </Link>
        {/* <Bg thumb={backgroundUrl.thumbUrl}></Bg> */}
      </ContentWrap>
    </Wrapper>
  );
};

export default Movies;
