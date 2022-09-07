import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  IdetailMovie,
  ITVDetail,
  IUserMovies,
  tvDetail,
  userMovies,
} from "../api";
import { makeImageFormat } from "../until";
import Header from "./Header";
import { IUser } from "../atom";
import ErrorMsg from "./ErrorMsg";

const Wrapper = styled.div`
  padding-top: 100px;
  // padding-bottom: 100px;
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
  display: flex;
  // align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
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
`;
const CommentOwner = styled.p`
  margin: 0;
  margin-bottom: 10px;
  span {
    margin-left: 10px;
    font-size: 12px;
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
  logo_path: string | null;
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

const TVDetail = (props: any) => {
  const { tvId } = useParams();
  const [isShow, setShow] = useState(true);
  const [moviesIndex, setMoviesIndex] = useState(0);
  const [moviesSlide, setMoviesSlide] = useState(false);
  const [commentbtnShow, setCommentBtnShow] = useState(false);
  const [movieBtnShow, setMovieBtnShow] = useState(false);
  const [user, setUser] = useState<IUser>();
  const loggedInUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const isLoggedIn = JSON.parse(sessionStorage.getItem("loggedIn") || "false");
  const { isLoading, data } = useQuery<ITVDetail>(["watch", "tvDetail"], () =>
    tvDetail(tvId || "")
  );
  let navigator = useNavigate();

  useEffect(() => {
    setUser(loggedInUser);
  }, [tvId]);

  const offset = 3;

  return (
    <Wrapper>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <VideoWrap>
          <Box>
            <Menu>
              <Header link={"detail"} />
            </Menu>
            <VideoContainer>
              <Link to={`/tv`}>
                <BackBtn>
                  <BackIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                  </BackIcon>
                </BackBtn>
              </Link>
              <MovieImg>
                <ThumbImg
                  movieImg={makeImageFormat(data?.backdrop_path || "")}
                  style={isShow ? { display: "block" } : { display: "none" }}
                ></ThumbImg>
              </MovieImg>

              <VideoContents key="VideoBox">
                {data?.homepage && (
                  <HomeBtn>
                    <Link to={data?.homepage}>Homepage</Link>
                  </HomeBtn>
                )}
                <VideoInfo>
                  <Title>{data?.name}</Title>

                  <hr></hr>

                  <Tagline>{data?.number_of_seasons} seasons</Tagline>
                  <Tagline>{data?.number_of_episodes} episodes</Tagline>
                  <Overview>{data?.overview}</Overview>
                </VideoInfo>

                {data?.production_companies && (
                  <CompaniesWrapper>
                    {data?.production_companies?.map((el: ICompanies) => (
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
                    ))}
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
        </VideoWrap>
      )}
    </Wrapper>
  );
};

export default TVDetail;
