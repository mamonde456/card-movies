import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { IUserMovies, userMovies } from "../api";
import { makeImageFormat } from "../until";
import Header from "./Header";
import { IUser } from "../atom";
import ErrorMsg from "./ErrorMsg";
const Wrapper = styled.div`
  padding-bottom: 100px;
`;

const VideoWrap = styled.div`
  width: 1780px;
  min-height: 800px;
  margin: 0 auto;
`;
const Box = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: black;
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
const VideoContainer = styled.div`
  padding: 10px;

  display: flex;
`;

const BackBtn = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 30px;
  top: 150px;
  border-radius: 10px 0px 0px 10px;
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-right: none;
  color: white;
  display: flex;
  align-items: center;
`;
const BackIcon = styled.svg`
  width: 40px;
  height: 40px;
  padding: 10px;
  fill: white;
`;

const Video = styled.video`
  width: 1000px;
  height: 780px;
  background-color: black;
  margin-right: 20px;
`;
const MovieImg = styled.div`
  width: 100%;
  height: 700px;
  overflow: hidden;
  margin-right: 20px;
  position: relative;
  .show {
    left: 100px;
  }
`;

const VideoBox = styled(motion.div)<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 100%;
  position: relative;
`;
const ThumbImg = styled(motion.div)<{ movieImg: string }>`
  width: 1140px;
  height: 700px;
  float: left;
  background-color: black;
  background-image: url(${(props) => props.movieImg});
  background-size: cover;
  background-position: center;
  transition: 0.5s ease;
`;

const EmbedBox = styled(motion.div)`
  width: 1140px;
  height: 700px;
`;
const Embed = styled(motion.embed)`
  width: 1140px;
  height: 700px;
  float: left;
`;
const HomeBtn = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  text-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: white;
`;
const VideoContents = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const VideoInfo = styled.div`
  width: 600px;
  height: 430px;
  border-radius: 10px;
  color: white;
  position: relative;
  hr {
    height: 1px;
    border: 0px;
    background-color: rgba(255, 255, 255, 0.3);
    margin-bottom: 20px;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: rgba(0, 0, 0, 0.8);
  .commentsBtn {
    right: -140px;
  }
`;

const BtnIcon = styled.svg`
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: rgba(255, 255, 255, 0.8);
`;

const BtnContents = styled.div`
  min-width: 150px;
  // height: 150px;
  position: absolute;
  right: -120px;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
    fill: rgba(0, 0, 0, 0.8);
  }
  p {
    font-size: 16px;
  }
  hr {
    height: 1px;
    border: 0px;
    background: rgba(0, 0, 0, 0.3);
    margin: 10px 0px;
  }
`;
const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 42px;
  word-wrap: break-word;
  margin: 0;
`;

const VideoMeta = styled.div`
  display: flex;
  gap: 10px;
  span {
    font-size: 14px;
  }
`;

const AvatarImg = styled.div<{ avatarUrl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: black;
  background-image: url(${(props) => props.avatarUrl});
  background-size: cover;
  background-position: center;
`;

const MovieOwner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  span {
    font-size: 18px;
  }
`;

const Text = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const Genre = styled.span`
  padding: 5px;
  font-size: 12px;
  opacity: 0.5;
  margin-left: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
`;

const Overview = styled.p`
  width: 100%;
  height: 140px;
  padding: 10px;
  line-height: 22px;
  word-wrap: break-word;
  margin: 0;
`;

const AnotherWrap = styled.div`
  height: 280px;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-bottom: 10px;
`;
const NotingFonud = styled.p`
  padding: 30px;
  text-align: right;
  color: rgba(255, 255, 255, 0.5);
`;

const AnotherVideo = styled(motion.div)`
  padding: 10px;
  overflow: hidden;
  color: white;
  position: relative;
`;

const AnotherNextBtn = styled.button`
  width: 50px;
  padding: 5px;
  background: none;
  border: solid 1px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  position: relative;
  left: 50%;
  margin-left: -25px;
  color: white;
`;

const AnotherTitle = styled.p`
  color: white;
  position: relative;
  text-align: right;
  padding-right: 30px;
  &::before {
    content: "";
    width: 200px;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    right: 25px;
    bottom: -5px;
  }
`;

const Images = styled.div<{ bgPhoto: string }>`
  width: 180px;
  height: 180px;
  background-color: black;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  float: left;
  margin-right: 10px;
  p {
    position: absolute;
    bottom: 10px;
    left: 20px;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
`;

const SnsWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SnsIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  .paddingSnsIcon {
    padding: 15px;
  }
`;
const SnsIcon = styled.svg`
  padding: 10px;
  fill: white;
`;

const VideoCommentsWrap = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
`;
const CommentTitle = styled.p`
  width: 1200px;
  margin: 0 auto;
  font-size: 24px;
  font-weight: 700;
  color: white;
`;

const CommentsFormWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const CommentForm = styled.form`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const User = styled.div<{ avatarUrl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: black;
  background-image: url(${(props) => props.avatarUrl});
  background-size: cover;
  background-position: center;
`;
const CommentInput = styled.input`
  width: 80%;
  height: 40px;
  font-size: 16px;
  color: white;
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: solid 1px rgba(255, 255, 255, 0.5);
  transition: ease 0.5s;
  &:focus {
    border-bottom: solid 2px rgba(255, 255, 255, 1);
    .commentBtn {
      display: block;
    }
  }
`;

const CommentBtn = styled.button`
  width: 100px;
  height: 50px;
  background: none;
  border-radius: 10px;
  // position: relative;
  // top: 55px;
  // right: 120px;
`;

const VideoComments = styled.div`
  padding: 10px;
`;

const CommentsList = styled.ul`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const CommentsLi = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
  color: white;
  position: relative;
`;
const CommentText = styled.div`
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  font-size: 18px;
`;
const CommentOwner = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-size: 12px;
  span {
    margin-left: 10px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const CommentImage = styled.div<{ avatarUrl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
  background-image: url(${(props) => props.avatarUrl});
  background-size: cover;
  backround-position: center;
`;

const Icon = styled.svg`
  width: 45px;
  height: 45px;
  fill: white;
`;

const MenuIcon = styled.svg`
  width: 40px;
  height: 40px;
  fill: white;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  padding: 10px;
`;

const CompaniesWrapper = styled.div`
  margin-top: 50px;
  padding: 10px;
  color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const CompaniesBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;
const CompaniesLogo = styled.div<{ logo: string }>`
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.logo});
  background-size: cover;
  background-position: center;
  border-radius: 25px;
`;
const CompaniesText = styled.p``;

const Tagline = styled.div`
  padding: 10px;
`;

const NextBtn = styled.button`
  padding: 10px;
  position: absolute;
  top: -10px;
  left: 50px;
  background: none;
  border: solid 1px white;
  border-radius: 10px;
  color: white;
`;

const ErrorBox = styled.div`
  width: 200px;
  padding: 10px;
  background-color: black;
  border-radius: 10px;
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: -100px;
  z-index: 9;
`;

interface IGenres {
  id: number;
  name: string;
}

const moviesVar = {
  start: {
    x: 1140,
  },
  center: {
    x: 0,
  },
  exit: {
    x: -1140,
  },
};

const small = {
  start: { x: 600 },
  center: { x: 0 },
  exit: { x: -600 },
};

interface IVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface ICompanies {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
}

interface IComments {
  createdAt: string;
  name: string;
  owner: string;
  text: string;
  videos: string;
  _id: string;
}
interface IForm {
  comment: string;
}

const Detail = (props: any) => {
  const { movieId } = useParams();
  const [isShow, setShow] = useState(true);
  const [anotherIndex, setAnotherIndex] = useState(0);
  const [anotherSlide, setAnotherSlide] = useState(false);
  const [moviesIndex, setMoviesIndex] = useState(0);
  const [moviesSlide, setMoviesSlide] = useState(false);
  const [commentbtnShow, setCommentBtnShow] = useState(false);
  const [movieBtnShow, setMovieBtnShow] = useState(false);
  const [user, setUser] = useState<IUser>();
  const loggedInUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const isLoggedIn = JSON.parse(sessionStorage.getItem("loggedIn") || "false");
  const { isLoading: anotherLoading, data: anotherMovies } = useQuery<
    IUserMovies[]
  >(["watch", "userMovies"], userMovies);
  const [another, setAnother] = useState<IUserMovies[]>();
  const [anotherLength, setALength] = useState(0);
  let navigator = useNavigate();

  useEffect(() => {
    const data = anotherMovies?.filter((movies: IUserMovies) => {
      return movies._id !== movieId;
    });
    setAnother(data);
    setALength(data?.length ? data.length : 0);
    setUser(loggedInUser);
  }, [movieId]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      currentTarget: { comment },
    } = event;
    const response = await fetch(`http://localhost:5000/api/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?._id,
        movieId,
        comment,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      event.currentTarget.value = "";
    } else if (response.status === 400) {
      console.log(data);
    }
  };

  const onDeleteMovie = async () => {
    const response = await fetch(
      `http://localhost:5000/api/movies/delete-movie`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
        }),
      }
    );

    const data = await response.json();
    navigator("/");
  };

  const viewApi = async () => {
    await fetch("http://localhost:5000/api/views", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId,
      }),
    });
  };
  const offset = 3;
  const nextSlide = (slide: string) => {
    if (slide === "another") {
      if (anotherMovies) {
        if (anotherSlide) return;
        toggleSlide("another");
        const total = anotherMovies?.length;
        const last = Math.ceil(total / offset) - 1;
        setAnotherIndex((prev) => (prev === last ? 0 : prev + 1));
      }
    } else if (slide === "movies") {
      if (props?.videos) {
        if (moviesSlide) return;
        toggleSlide("movies");
        const total = props?.videos?.results?.length + 1;
        // const last = Math.ceil(total / 1) - 1;
        setMoviesIndex((prev) => (prev === total ? 0 : prev + 1));
      }
    }
  };
  const toggleSlide = (slide: string) => {
    if (slide === "another") {
      setAnotherSlide(true);
    } else if (slide === "movies") {
      setMoviesSlide(true);
    }
  };

  return (
    <Wrapper>
      {props?.detail && (
        <VideoWrap>
          <Box>
            <Menu>
              <Header link={"detail"} />
            </Menu>
            <VideoContainer>
              <Link
                to={
                  props?.link === "users" || props.link === "popular"
                    ? `/${props?.link}-movies`
                    : `/`
                }
              >
                <BackBtn>
                  <BackIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                  </BackIcon>
                </BackBtn>
              </Link>
              {props?.link === "users" ? (
                <Video
                  src={`http://localhost:5000/${props?.detail?.movieUrl}`}
                  controls
                  onEnded={viewApi}
                />
              ) : (
                <MovieImg>
                  <ThumbImg
                    movieImg={makeImageFormat(props?.detail?.backdrop_path)}
                    style={isShow ? { display: "block" } : { display: "none" }}
                  ></ThumbImg>
                  <AnimatePresence
                    initial={false}
                    onExitComplete={() => toggleSlide("movies")}
                  >
                    <VideoBox
                      width={(props?.videos?.results?.length + 1) * 1140}
                      key={moviesIndex}
                      variants={moviesVar}
                      initial="start"
                      animate="center"
                      exit="exit"
                    >
                      {props?.videos?.results
                        ?.slice(moviesIndex * 1, moviesIndex * 1 + 1)
                        .map((el: IVideo) => (
                          // <EmbedBox>
                          <Embed
                            title={el.name}
                            src={`https://www.youtube.com/embed/${el.key}`}
                          ></Embed>
                          // </EmbedBox>
                        ))}
                    </VideoBox>
                  </AnimatePresence>
                  <NextBtn
                    className="show"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {isShow ? "Thumbnail Hide" : "Thumbnail Show"}
                  </NextBtn>
                  <NextBtn
                    style={isShow ? { display: "none" } : { display: "block" }}
                    onClick={() => nextSlide("movies")}
                  >
                    next
                  </NextBtn>
                </MovieImg>
              )}

              <VideoContents key="VideoBox">
                {props?.detail?.homepage && (
                  <HomeBtn>
                    <Link to={props?.detail?.homepage}>Homepage</Link>
                  </HomeBtn>
                )}
                <VideoInfo>
                  {String(props?.detail?.owner?._id) === String(user?._id) && (
                    <BtnWrapper
                      style={
                        props.link === "users"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <BtnIcon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        onClick={() => setMovieBtnShow((prev) => !prev)}
                      >
                        <path d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z" />
                      </BtnIcon>
                      <BtnContents
                        style={
                          movieBtnShow
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <Link to={`/users-movies/${movieId}/edit-movie`}>
                          <EditBtn>
                            <BtnIcon
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                            </BtnIcon>
                            <p>Edit Movie</p>
                          </EditBtn>
                        </Link>
                        <hr />
                        <EditBtn onClick={onDeleteMovie}>
                          <BtnIcon
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                          </BtnIcon>
                          <p>Delete Movie</p>
                        </EditBtn>
                      </BtnContents>
                    </BtnWrapper>
                  )}

                  <Title>
                    {props?.detail?.title?.length >= 40
                      ? props?.detail.title.slice(0, 40)
                      : props?.detail.title}
                  </Title>

                  <VideoMeta>
                    <p>
                      {props?.link === "users"
                        ? props?.detail?.meta?.views === 1
                          ? `${props?.detail?.meta?.views} view`
                          : `${props?.detail?.meta?.views} views`
                        : null}
                    </p>
                    <p>
                      •&nbsp;
                      {props?.detail?.createdAt
                        ? props?.detail?.createdAt
                            ?.substring(0, 10)
                            .replace(/-/g, ".")
                        : props.detail.release_date}
                      .
                    </p>
                    {props?.link === "users" ? (
                      <p>{props?.detail?.meta?.rating + " 좋아요"}</p>
                    ) : (
                      <p>
                        <span>Popularity: </span>
                        {props?.detail?.popularity}
                      </p>
                    )}

                    <p
                      style={
                        props.link === "users"
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      <span>runtime: </span>
                      {props?.detail?.runtime &&
                        `${Math.floor(
                          props?.detail?.runtime / 60
                        )}h ${Math.floor(props?.detail?.runtime % 60)}m`}
                    </p>
                    <p
                      style={
                        props.link === "users"
                          ? { display: "none" }
                          : { display: "block" }
                      }
                    >
                      <span>Bote Average: </span>
                      {props?.detail?.vote_average &&
                        props?.detail?.vote_average}
                    </p>
                  </VideoMeta>
                  <hr></hr>
                  <MovieOwner>
                    {props.link === "users" && (
                      <>
                        {" "}
                        <Link to={`/users/${props?.detail?.owner?._id}`}>
                          {props?.detail?.owner?.avatarUrl ? (
                            <AvatarImg
                              avatarUrl={`http://localhost:5000/${props?.detail?.owner?.avatarUrl}`}
                            ></AvatarImg>
                          ) : (
                            <Icon
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z" />
                            </Icon>
                          )}
                        </Link>
                        <Link to={`/users/${props?.detail?.owner?._id}`}>
                          <span>{props?.detail?.owner?.name}</span>
                        </Link>
                      </>
                    )}
                  </MovieOwner>
                  <Tagline>
                    {props?.detail?.tagline && props?.detail?.tagline}
                  </Tagline>
                  <Overview>{props?.detail?.overview}</Overview>

                  <Text>
                    {props?.link === "users"
                      ? props?.detail?.genres?.map((genre: string) =>
                          genre
                            .split(",")
                            .map((el: string) => <Genre>{el}</Genre>)
                        )
                      : props.detail.genres.map((el: IGenres) => (
                          <Genre>{el.name}</Genre>
                        ))}
                  </Text>
                </VideoInfo>
                {props.link === "users" && (
                  <>
                    {anotherLoading ? (
                      <AnotherWrap>
                        <AnotherTitle>Another Video</AnotherTitle>
                        <NotingFonud>loading...</NotingFonud>
                      </AnotherWrap>
                    ) : (
                      <AnotherWrap key="anotherMovie">
                        <AnotherTitle>
                          Another Video ({anotherLength})
                        </AnotherTitle>
                        <div
                          style={
                            anotherLength === 0
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <NotingFonud>Noting Found.</NotingFonud>
                        </div>
                        <div
                          style={
                            anotherLength >= 1
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          {" "}
                          <AnimatePresence
                            initial={false}
                            onExitComplete={() => toggleSlide("another")}
                          >
                            <AnotherVideo
                              key={anotherIndex}
                              variants={small}
                              initial="start"
                              animate="center"
                              exit="exit"
                              transition={{ type: "tween", duration: 1 }}
                            >
                              {another
                                ?.slice(
                                  offset * anotherIndex,
                                  offset * anotherIndex + offset
                                )
                                .map((movie) => (
                                  <Link
                                    to={`/${props.link}-movies/${movie._id}`}
                                  >
                                    <Images
                                      key={movie._id}
                                      bgPhoto={
                                        "http://localhost:5000/" +
                                        movie.thumbUrl
                                      }
                                    >
                                      <p>{movie.title}</p>
                                    </Images>
                                  </Link>
                                ))}
                            </AnotherVideo>
                            <AnotherNextBtn
                              onClick={() => nextSlide("another")}
                            >
                              next
                            </AnotherNextBtn>
                          </AnimatePresence>
                        </div>
                      </AnotherWrap>
                    )}
                  </>
                )}
                {props?.detail?.production_companies && (
                  <CompaniesWrapper>
                    {props.detail.production_companies?.map(
                      (el: ICompanies) => (
                        <CompaniesBox>
                          {el.logo_path ? (
                            <CompaniesLogo
                              logo={makeImageFormat(el.logo_path)}
                            ></CompaniesLogo>
                          ) : (
                            <CompaniesLogo
                              logo={""}
                              style={{
                                backgroundColor: "black",
                                fontSize: "12px",
                                textAlign: "center",
                                color: "rgba(255,255,255,0.3)",
                                paddingTop: "10px",
                              }}
                            >
                              image
                            </CompaniesLogo>
                          )}
                          <CompaniesText>
                            {el.name} <span>({el.origin_country})</span>
                          </CompaniesText>
                        </CompaniesBox>
                      )
                    )}
                  </CompaniesWrapper>
                )}

                <SnsWrap>
                  <Link to="https://twitter.com/">
                    <SnsIconWrapper>
                      <SnsIcon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                      </SnsIcon>
                    </SnsIconWrapper>
                  </Link>
                  <Link to="https://www.instagram.com/">
                    <SnsIconWrapper>
                      <SnsIcon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </SnsIcon>
                    </SnsIconWrapper>
                  </Link>
                  <Link to="https://ko-kr.facebook.com/">
                    <SnsIconWrapper>
                      <SnsIcon
                        className="paddingSnsIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </SnsIcon>
                    </SnsIconWrapper>
                  </Link>
                </SnsWrap>
              </VideoContents>
            </VideoContainer>
          </Box>
          {props.link === "users" && (
            <VideoCommentsWrap key="comments">
              <CommentTitle>
                Comment ({props?.detail?.comments.length})
              </CommentTitle>
              {isLoggedIn && (
                <CommentsFormWrap>
                  <CommentForm onSubmit={onSubmit}>
                    {user?.avatarUrl ? (
                      <User
                        avatarUrl={"http://localhost:5000/" + user?.avatarUrl}
                      ></User>
                    ) : (
                      <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z" />
                      </Icon>
                    )}
                    <CommentInput
                      name="comment"
                      type="text"
                      placeholder="write a comment..."
                    ></CommentInput>
                    <CommentBtn>send</CommentBtn>
                  </CommentForm>
                </CommentsFormWrap>
              )}

              <VideoComments>
                <CommentsList>
                  {props.detail?.comments
                    ?.reverse()
                    .map((comment: IComments) => (
                      <CommentsLi key={comment?._id}>
                        {user?.avatarUrl ? (
                          <CommentImage
                            avatarUrl={
                              "http://localhost:5000/" + user?.avatarUrl
                            }
                          ></CommentImage>
                        ) : (
                          <Icon
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z" />
                          </Icon>
                        )}

                        <CommentText>
                          <CommentOwner>
                            {comment?.name}{" "}
                            <span>{comment?.createdAt.slice(0, 10)}</span>
                            <span>{comment?.createdAt.slice(11, 19)}</span>
                          </CommentOwner>
                          <span>{comment?.text}</span>
                        </CommentText>
                        {String(comment?.owner) === String(user?._id) && (
                          <BtnWrapper>
                            <MenuIcon
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 512"
                              onClick={() => setCommentBtnShow((prev) => !prev)}
                            >
                              <path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z" />
                            </MenuIcon>
                            <BtnContents
                              style={
                                commentbtnShow
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                              className="commentsBtn"
                            >
                              <Link to={`/movies/${movieId}/edit-movie`}>
                                <EditBtn>
                                  <BtnIcon
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                                  </BtnIcon>
                                  <p>Edit Comment</p>
                                </EditBtn>
                              </Link>
                              <hr />
                              <EditBtn>
                                <BtnIcon
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                </BtnIcon>
                                <p>Delete Comment</p>
                              </EditBtn>
                            </BtnContents>
                          </BtnWrapper>
                        )}
                      </CommentsLi>
                    ))}
                </CommentsList>
              </VideoComments>
            </VideoCommentsWrap>
          )}
        </VideoWrap>
      )}

      {props?.detail?.errorMessage && (
        <ErrorBox>
          <ErrorMsg error={props?.detail} />
        </ErrorBox>
      )}
    </Wrapper>
  );
};

export default Detail;
