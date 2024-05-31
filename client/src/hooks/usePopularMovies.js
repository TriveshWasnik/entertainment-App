import axios from "axios";
import { API_Option, Popular_Movies } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getPopularMovies } from "../store/movieSlice";

// hook for popular movies
async function usePopularMovies() {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(`${Popular_Movies}`, API_Option);

    dispatch(
      getPopularMovies(
        res?.data?.results.filter(
          (result) =>
            (result?.poster_path || result?.backdrop_path) &&
            (result?.release_date || result?.first_air_date)
        )
      )
    );
  } catch (error) {
    return {
      error: "Error while fetching popular movies",
    };
  }
}

export default usePopularMovies;
