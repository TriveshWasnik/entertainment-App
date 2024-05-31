import { createSlice } from "@reduxjs/toolkit";
/* Movie and TV Shows Store */
const movieSlice = createSlice({
  name: "movie",
  initialState: {
    trendingMoviesTVShows: null,
    recommendedMoviesTVShows: null,
    popularMovies: null,
    popularTVShows: null,
  },
  reducers: {
    getTrendingMoviesTVShows: (state, action) => {
      state.trendingMoviesTVShows = action.payload;
    },
    getRecommendedMoviesTVShows: (state, action) => {
      state.recommendedMoviesTVShows = action.payload;
    },
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    getPopularTVShows: (state, action) => {
      state.popularTVShows = action.payload;
    },
  },
});

export const {
  getTrendingMoviesTVShows,
  getRecommendedMoviesTVShows,
  getPopularMovies,
  getPopularTVShows,
} = movieSlice.actions;
export default movieSlice.reducer;
