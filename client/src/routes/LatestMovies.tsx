import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ItmdbMovies, latestMovies } from "../api";
import Movies from "../components/Movies";

const Wrapper = styled.div``;

const LatesMovies = () => {
  const { isLoading, data } = useQuery<ItmdbMovies>(
    ["watch", "latestMovies"],
    latestMovies
  );
  return (
    <Wrapper>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <Movies movies={data?.results} link={"latest"}></Movies>
      )}
    </Wrapper>
  );
};

export default LatesMovies;
