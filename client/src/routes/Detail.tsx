import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { avatarData, IUserMovies, userMovies, watchData } from "../api";

const Wrapper = styled.div`
  padding-top: 100px;
  width: 100%;
`;

const VideoContainer = styled.div`
  padding: 10px;
  width: 1620px;
  min-height: 800px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  gap: 20px;
  margin: 0 auto;
`;

const Video = styled.video`
  width: 1000px;
  // height: 780px;
  background-color: black;
`;

const VideoContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VideoInfo = styled.div`
  width: 600px;
  height: 430px;
  border-radius: 10px;
  color: white;
  hr {
    height: 1px;
    border: 0px;
    background-color: rgba(255, 255, 255, 0.3);
    margin-bottom: 20px;
  }
`;
const Title = styled.h1`
  font-size: 42px;
`;

const VideoMeta = styled.div`
  display: flex;
  gap: 10px;
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

const Text = styled.p`
  span {
    font-size: 12px;
    opacity: 0.5;
  }
`;

const AnotherWrap = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const AnotherVideo = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
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
  border-radius: 10px;
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

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  .paddingIcon {
    padding: 15px;
  }
`;
const Icon = styled.svg`
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
  width: 100%;
  padding: 10px;
  background: red;
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
  }
`;

const VideoComments = styled.div``;

const CommentsList = styled.ul``;
const CommentsLi = styled.li``;

const Detail = () => {
  const { movieId } = useParams();
  const { isLoading: watchLoading, data: watch } = useQuery(
    ["watch", movieId],
    async () => await watchData(movieId || "")
  ) as any;

  const { isLoading: userMovieLoading, data: userMovie } = useQuery<
    IUserMovies[]
  >(["watch", "userMovies"], userMovies);
  const [another, setAnother] = useState<IUserMovies[]>();
  useEffect(() => {
    const data = userMovie?.filter((movies) => {
      return movies._id !== movieId;
    });
    setAnother(data);
  }, [userMovie]);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return (
    <Wrapper>
      {watchLoading ? (
        <h1>is Loading...</h1>
      ) : (
        <>
          {watch.errorMessage ? (
            <>
              <h1>{watch.errorTitle}</h1>
              <p>{watch.errorMessage}</p>
            </>
          ) : (
            <>
              <VideoContainer>
                <Video
                  src={`http://localhost:5000/${watch.movieUrl}`}
                  controls
                />
                <VideoContents>
                  <VideoInfo>
                    <Title>{watch.title}</Title>
                    <VideoMeta>
                      <p>
                        {watch.meta.views === 1
                          ? `${watch.meta.views} view`
                          : `${watch.meta.views} views`}
                      </p>
                      <p>
                        • {watch.createdAt.substring(0, 10).replace(/-/g, ".")}.
                      </p>
                      <p>{watch.meta.rating} 좋아요</p>
                    </VideoMeta>
                    <hr></hr>
                    <AvatarImg
                      avatarUrl={
                        `http://localhost:5000/${watch.owner.avatarUrl}` || ""
                      }
                    ></AvatarImg>
                    <Text>{watch.description}</Text>
                    <Text>
                      {watch.genres.map((genre: string) => (
                        <span>{genre}</span>
                      ))}
                    </Text>
                  </VideoInfo>
                  {userMovieLoading ? (
                    <p>is loading...</p>
                  ) : (
                    <AnotherWrap>
                      <AnotherTitle>Another Video</AnotherTitle>
                      <AnotherVideo>
                        {another?.map((movie) => (
                          <Link to={`/movies/${movie._id}`}>
                            <Images
                              bgPhoto={
                                "http://localhost:5000/" + movie.movieUrl
                              }
                            >
                              <p>{movie.title}</p>
                            </Images>
                          </Link>
                        ))}
                      </AnotherVideo>
                    </AnotherWrap>
                  )}
                  <SnsWrap>
                    <Link to="https://twitter.com/">
                      <IconBox>
                        <Icon
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                        </Icon>
                      </IconBox>
                    </Link>
                    <Link to="https://www.instagram.com/">
                      <IconBox>
                        <Icon
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </Icon>
                      </IconBox>
                    </Link>
                    <Link to="https://ko-kr.facebook.com/">
                      <IconBox>
                        <Icon
                          className="paddingIcon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                        </Icon>
                      </IconBox>
                    </Link>
                  </SnsWrap>
                </VideoContents>
              </VideoContainer>
              <VideoCommentsWrap>
                <CommentsFormWrap>
                  <CommentForm>
                    <User
                      avatarUrl={"http://localhost:5000/" + user.avatarUrl}
                    ></User>
                    <CommentInput placeholder="write a comment..."></CommentInput>
                    <button>send</button>
                  </CommentForm>
                </CommentsFormWrap>
                <VideoComments>
                  <CommentsList>
                    <CommentsLi>ddd</CommentsLi>
                  </CommentsList>
                </VideoComments>
              </VideoCommentsWrap>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Detail;
