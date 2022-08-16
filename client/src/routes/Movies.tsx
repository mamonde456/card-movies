import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUserMovies, userMovies } from "../api";

const Wrapper = styled.div`
  // padding-top: 100px;
  width: 100%;
  height: 100vh;
  color: white;
`;

const ContentWrap = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;
const MoviesList = styled.ul`
  counter-reset: numbering;
  width: 320px;
  height: 700px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  right: 0;
  top: 100px;
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

const TxtBox = styled.p`
  position: absolute;
  left: 10px;
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

const Bg = styled.div<{ thumb: any }>`
  width: 1400px;
  height: 800px;
  padding: 10px;
  border-radius: 30px;
  background-color: white;
  background-image: url(http://localhost:5000/${(props) => props.thumb});
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  margin-left: -700px;
  top: 100px;
  z-index: -1;
`;

const ContentBox = styled.div`
  width: 500px;
  padding: 10px 20px;
  border-radius: 10px;
  position: absolute;
  bottom: 350px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentTitle = styled.h3`
  font-size: 42px;
`;
const ContentText = styled.p`
  font-size: 18px;
`;

const BtnText = styled.div`
  width: 200px;
  padding: 10px;
  position: absolute;
  left: 0;
  bottom: 200px;
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

const Movies = () => {
  const [backgroundUrl, setBackgroundUrl] = useState({
    id: "",
    thumbUrl: "",
    title: "",
    description: "",
    adult: false,
    genres: [],
    createdAt: "",
  });
  const { isLoading: userLoading, data: users } = useQuery<IUserMovies[]>(
    ["home", "userMovies"],
    userMovies
  );
  useEffect(() => {
    setBackgroundUrl({
      id: users ? users[0]._id : "",
      thumbUrl: users ? users[0].thumbUrl : "",
      title: users ? users[0].title : "",
      description: users ? users[0].description : "",
      adult: users ? users[0].adult : false,
      genres: users ? users[0].genres : [],
      createdAt: users ? users[0].createdAt : "",
    });
  }, [users]);
  const onClick = (movie: IUserMovies) => {
    const thumbUrl = movie.thumbUrl;
    const title = movie.title;
    const description = movie.description;
    const adult = movie.adult;
    const genres = movie.genres;
    const createdAt = movie.createdAt;
    const id = movie._id;

    setBackgroundUrl({
      id,
      thumbUrl,
      title,
      description,
      adult,
      genres,
      createdAt,
    });
  };
  return (
    <Wrapper>
      {userLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ContentWrap>
            <MoviesList>
              {users?.map((movie) => (
                <>
                  <MoviesLi
                    bgPhoto={"http://localhost:5000/" + movie.thumbUrl}
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
                      <LiTitle>{movie.title}</LiTitle>
                      <LiText>{movie.createdAt.slice(0, 10)}</LiText>
                    </TxtBox>
                  </MoviesLi>
                </>
              ))}
            </MoviesList>
            <ContentBox>
              <ContentTitle>{backgroundUrl.title}</ContentTitle>
              <ContentText>{backgroundUrl.description}</ContentText>
              <ContentText>
                {backgroundUrl.genres.map((genre) => (
                  <span>{genre}</span>
                ))}
              </ContentText>
              <ContentText>{backgroundUrl.createdAt}</ContentText>
            </ContentBox>
            <Link to={backgroundUrl.id}>
              <BtnText>
                <IconBox>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM330.5 323.9c0 6.473-3.889 12.3-9.877 14.78c-5.979 2.484-12.86 1.105-17.44-3.469l-45.25-45.25l-67.92 67.92c-12.5 12.5-32.72 12.46-45.21-.0411l-22.63-22.63C109.7 322.7 109.6 302.5 122.1 289.1l67.92-67.92L144.8 176.8C140.2 172.2 138.8 165.3 141.3 159.4c2.477-5.984 8.309-9.875 14.78-9.875h158.4c8.835 0 15.1 7.163 15.1 15.1V323.9z" />
                  </Icon>
                </IconBox>
                watch movie
              </BtnText>
            </Link>
          </ContentWrap>
          <Bg thumb={backgroundUrl.thumbUrl}></Bg>
        </>
      )}
    </Wrapper>
  );
};

export default Movies;
