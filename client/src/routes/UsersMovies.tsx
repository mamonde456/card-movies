import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IUserMovies, userMovies } from "../api";
import Movies from "../components/Movies";

const Wrapper = styled.div`
  // padding-top: 100px;
  width: 100%;
  height: 100vh;
  color: white;
`;

const UsersMovies = () => {
  const { isLoading, data } = useQuery<IUserMovies[]>(
    ["home", "userMovies"],
    userMovies
  );
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Movies movies={data} link={"users"}></Movies>
      )}
    </Wrapper>
  );
};

export default UsersMovies;
