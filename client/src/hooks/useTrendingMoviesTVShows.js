import axios from "axios";
import { API_Option, Trending_Movies_TVshows } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTrendingMoviesTVShows } from "../store/movieSlice";

// hook for Trending Movies and TV Shows
async function useTrendingMoviesTVShows() {
  const dispatch = useDispatch();
  try {
    // get the Trending Movies and TV Shows
    const res = await axios.get(Trending_Movies_TVshows, API_Option);
    // set the Trending Movies and TV Shows
    dispatch(
      getTrendingMoviesTVShows(
        res?.data?.results.filter(
          (result) =>
            (result?.poster_path || result?.backdrop_path) &&
            (result?.release_date || result?.first_air_date)
        )
      )
    );
  } catch (error) {
    return {
      error: "Error while fetching trending movies and TV shows",
    };
  }
}

export default useTrendingMoviesTVShows;
