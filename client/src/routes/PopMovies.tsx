import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ItmdbMovies, popularMovies } from "../api";
import Movies from "../components/Movies";

const Wrapper = styled.div``;

const PopMovies = () => {
  const { isLoading, data } = useQuery<ItmdbMovies>(
    ["home", "popularMovies"],
    popularMovies
  );
  return (
    <Wrapper>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <Movies movies={data?.results} link={"popular"}></Movies>
      )}
    </Wrapper>
  );
};

export default PopMovies;
