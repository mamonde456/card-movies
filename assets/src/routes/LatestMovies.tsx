import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ItmdbMovies, latestMovies } from "../api";
import Detail from "../components/Detail";
import Movies from "../components/Movies";

const Wrapper = styled.div``;

interface IGenres {
  id: number;
  name: string;
}

interface ILatest {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];

  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const LatestMovies = () => {
  const { isLoading, data } = useQuery<ILatest>(
    ["watch", "latestMovies"],
    latestMovies
  );
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <Detail detail={data} link={"latest"} videos={null}></Detail>
      )}
    </Wrapper>
  );
};

export default LatestMovies;
