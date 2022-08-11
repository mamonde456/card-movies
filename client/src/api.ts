import { response } from "express";

const LOCALBASEURL = "http://localhost:5000/api";
const APIKEY = process.env.REACT_APP_API_KEY;
const APIBASEURL = "https://api.themoviedb.org/3";

export interface IUserMovies {
  _id: string;
  title: string;
  description: string;
  adult: boolean;
  genres: [];
  createdAt: string;
  meta: { views: number; rating: number };
}
export interface Iresults {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: [string];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface ItmdbMovies {
  results: Iresults[];
  total_results: number;
  total_pages: number;
}
export interface IApiGenres {
  genres: IGenres[];
}
interface IGenres {
  id: number;
  name: string;
}

export function userMovies() {
  return fetch(`${LOCALBASEURL}/home`).then((response) => response.json());
}

export function moviesData() {
  return fetch(
    `${APIBASEURL}/movie/popular?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function genresData() {
  return fetch(
    `${APIBASEURL}/genre/list?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
