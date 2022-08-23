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

const Movies = () => {
  const { isLoading: userLoading, data: users } = useQuery<IUserMovies[]>(
    ["home", "userMovies"],
    userMovies
  );
  useEffect(() => {
    // setBackgroundUrl({
    //   id: users ? users[0]._id : "",
    //   thumbUrl: users ? users[0].thumbUrl : "",
    //   title: users ? users[0].title : "",
    //   description: users ? users[0].description : "",
    //   adult: users ? users[0].adult : false,
    //   genres: users ? users[0].genres : [],
    //   createdAt: users ? users[0].createdAt : "",
    // });
  }, [users]);

  return (
    <Wrapper>
      {userLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Movies users={users || ""}></Movies>
        </>
      )}
    </Wrapper>
  );
};

export default Movies;
