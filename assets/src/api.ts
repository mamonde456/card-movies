import { response } from "express";

const LOCALBASEURL = "http://localhost:5000/api";
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

export interface ITvResults {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  runtime: number;
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
  first_air_date: string;
  origin_country: [string];
  name: string;
  original_name: string;
}

export interface ItmdbTv {
  page: number;
  results: ITvResults[];

  total_results: number;
  total_pages: number;
}

export interface Iresults {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  runtime: number;
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

interface ICompanies {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}
interface ICountries {
  iso_3166_1: string;
  name: string;
}

interface IUser {
  comments: [];
  email: string;
  info: string;
  location: string;
  name: string;
  password: string;
  username: string;
}

export interface IdetailMovie {
  comments: [];
  createdAt: string;
  meta: { type: number };
  movieUrl: string;
  owner: IUser;
  thumbUrl: string;
  _id: string;
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenres[];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ICompanies[];
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

interface ICreated {
  id: number;

  credit_id: string;

  name: string;

  gender: number;

  profile_path: string;

  episode_run_time: [number];

  first_air_date: string;
}

interface IAir {
  air_date: string;

  episode_number: number;

  id: number;

  name: string;

  overview: string;

  production_code: string;

  season_number: number;

  still_path: string;

  vote_average: number;

  vote_count: number;
}

interface INet {
  name: string;

  id: number;

  logo_path: string;

  origin_country: string;
}

interface ISeasons {
  air_date: string;

  episode_count: number;

  id: number;

  name: string;

  overview: string;

  poster_path: string;

  season_number: number;
}

interface ISpoken {
  english_name: string;

  iso_639_1: string;

  name: string;
}

export interface ITVDetail {
  backdrop_path: string;

  created_by: ICreated[];

  genres: IGenres[];

  homepage: string;

  id: number;

  in_production: boolean;

  languages: [string];

  last_air_date: string;

  last_episode_to_air: IAir[];

  name: string;

  networks: INet[];

  number_of_episodes: number;

  number_of_seasons: number;

  origin_country: [string];

  original_language: string;

  original_name: string;

  overview: string;

  popularity: number;

  poster_path: string;

  production_companies: ICompanies[];

  production_countries: ICountries[];
  seasons: ISeasons[];
  spoken_languages: ISpoken[];
  status: string;

  tagline: string;

  type: string;

  vote_average: number;

  vote_count: number;
}

interface IVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface IVideos {
  id: number;
  results: IVideo[];
}

export function popularMovies() {
  return fetch(
    `${APIBASEURL}/movie/popular?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function latestMovies() {
  return fetch(
    `${APIBASEURL}/movie/latest?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function upcomingMovies() {
  return fetch(
    `${APIBASEURL}/movie/upcoming?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function nowPlayingMovies() {
  return fetch(
    `${APIBASEURL}/movie/now_playing?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function topRatedMovies() {
  return fetch(
    `${APIBASEURL}/movie/top_rated?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function detailMovie(movieId: string) {
  return fetch(
    `${APIBASEURL}/movie/${movieId}?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function getVideos(movieId: string) {
  return fetch(
    `${APIBASEURL}/movie/${movieId}/videos?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function genresData() {
  return fetch(
    `${APIBASEURL}/genre/list?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}

//tv api

export function tvTop() {
  return fetch(
    `${APIBASEURL}/tv/top_rated?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function tvPopular() {
  return fetch(
    `${APIBASEURL}/tv/popular?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function tvOnAir() {
  return fetch(
    `${APIBASEURL}/tv/on_the_air?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function tvAirToday() {
  return fetch(
    `${APIBASEURL}/tv/airing_today?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}
export function tvDetail(tvId: string) {
  return fetch(
    `${APIBASEURL}/tv/${tvId}?api_key=7ddf9cba8020cc2542ed7ffeaa0c1787`
  ).then((response) => response.json());
}

//users
export function userMovies() {
  return fetch(`${LOCALBASEURL}/home`).then((response) => response.json());
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
