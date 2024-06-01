import conf from "../conf/conf.js";
/* Constants for another file whenever necessory */
export const API_END_POINT =
  "https://entertainment-api-a0nw.onrender.com/api/v1"; //"http://localhost:5000/api/v1";
export const API_Option = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${conf.tmdbToken} `,
  },
};
export const Image_Relative_Path = "https://image.tmdb.org/t/p/original";

export const TMDB_BASE_PATH = "https://api.themoviedb.org/3";

export const Trending_Movies_TVshows = `${TMDB_BASE_PATH}/trending/all/week`;

export const Popular_Movies = `${TMDB_BASE_PATH}/movie/popular`;
export const Popular_TVShows = `${TMDB_BASE_PATH}/tv/popular`;

export const SEARCH_PATH = `https://api.themoviedb.org/3/search`;
