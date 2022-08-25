import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ItmdbMovies, upcomingMovies } from "../api";
import Movies from "../components/Movies";

const Wrapper = styled.div``;

const UpcomingMovies = () => {
  const { isLoading, data } = useQuery<ItmdbMovies>(
    ["watch", "upcomingMovies"],
    upcomingMovies
  );
  return (
    <Wrapper>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <Movies movies={data?.results} link={"upcoming"}></Movies>
      )}
    </Wrapper>
  );
};

export default UpcomingMovies;
