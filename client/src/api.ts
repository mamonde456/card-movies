import { response } from "express";

const LOCALBASEURL = "http://localhost:5000/api";
const APIKEY = process.env.REACT_APP_API_KEY;
const APIBASEURL = "https://api.themoviedb.org/3";

export interface IUserMovies {
  thumbUrl: string;
  backdrop_path: string;
  movieUrl: string;
  _id: string;
  id: string;
  title: string;
  overview: string;
  adult: boolean;
  genres: [];
  createdAt: string;
  release_date: string;
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
interface IGenres {
  id: number;
  name: string;
}
interface Icompanies {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}
interface ICountries {
  iso_3166_1: string;
  name: string;
}
export interface IdetailMovie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenres[];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Icompanies[];
  production_countries: ICountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export function userMovies() {
  return fetch(`${LOCALBASEURL}/home`).then((response) => response.json());
}

export function popularMovies() {
  return fetch(
    `${APIBASEURL}/movie/popular?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function detailMovie(movieId: string) {
  return fetch(
    `${APIBASEURL}/movie/${movieId}?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function genresData() {
  return fetch(
    `${APIBASEURL}/genre/list?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}

export function watchData(movieId: string) {
  return fetch(`${LOCALBASEURL}/movies/watch`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieId,
    }),
  }).then((response) => response.json());
}
export function avatarData(userId: string) {
  return fetch(`${LOCALBASEURL}/users/${userId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  }).then((response) => response.json());
}

export function userProfileData(userId: string) {
  return fetch(`${LOCALBASEURL}/users/${userId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  }).then((response) => response.json());
}

export function editMovieData(movieId: string) {
  return fetch(`${LOCALBASEURL}/movies/${movieId}/edit-movie`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieId,
    }),
  }).then((response) => response.json());
}

export function editMovieUpdate(movieId: string) {
  return fetch(`${LOCALBASEURL}/movies/${movieId}/edit-movie`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieId,
    }),
  }).then((response) => response.json());
}

export function comments(userId: string) {
  return fetch(`${LOCALBASEURL}/comments`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  }).then((response) => response.json());
}
