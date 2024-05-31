import axios from "axios";
import { API_Option, TMDB_BASE_PATH } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getRecommendedMoviesTVShows } from "../store/movieSlice";

// hook for Recommended Movies and TV shows
async function useRecommended(movieId, tvId) {
  const dispatch = useDispatch();
  let recommended = [];

  if (movieId === undefined || tvId === undefined) {
    return;
  }

  try {
    // get the Recommended Movies
    let res1 = await axios.get(
      `${TMDB_BASE_PATH}/movie/${movieId}/recommendations?include_adult=true&include_video=true&language=en-US`,
      API_Option
    );

    res1 = res1?.data?.results
      .filter(
        (result) =>
          (result?.poster_path || result?.backdrop_path) &&
          (result?.release_date || result?.first_air_date)
      )
      .slice(0, 6);

    // get the Recommended TV Shows
    let res2 = await axios.get(
      `${TMDB_BASE_PATH}/tv/${tvId}/recommendations?include_adult=true&include_video=true&language=en-US`,
      API_Option
    );

    res2 = res2?.data?.results
      .filter(
        (result) =>
          (result?.poster_path || result?.backdrop_path) &&
          (result?.release_date || result?.first_air_date)
      )
      .slice(0, 6);

    for (let i = 0; i < res1.length; i++) {
      recommended.push(res1[i]);
      recommended.push(res2[i]);
    }
    // set the Recommended Movies and TV Shows on redux store
    dispatch(getRecommendedMoviesTVShows(recommended));
  } catch (error) {
    return {
      error: "Error while fetching recommended movies and TV shows",
    };
  }
}

export default useRecommended;
