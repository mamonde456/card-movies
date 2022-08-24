import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IUserMovies, userMovies, watchData } from "../api";
import Detail from "../components/Detail";

const Wrapper = styled.div`
  padding-top: 100px;
`;

const UserDetail = () => {
  const { movieId } = useParams();
  const { isLoading: watchLoading, data: watch } = useQuery(
    ["watch", movieId],
    async () => await watchData(movieId || "")
  ) as any;

  return (
    <Wrapper>
      {watchLoading ? (
        <p>is loading...</p>
      ) : (
        <Detail detail={watch} link={"users"}></Detail>
      )}
    </Wrapper>
  );
};

export default UserDetail;
