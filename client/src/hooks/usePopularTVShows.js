import { useDispatch } from "react-redux";
import { API_Option, Popular_TVShows } from "../utils/constant";
import { getPopularTVShows } from "../store/movieSlice";
import axios from "axios";

// hook for Popular TV shows
async function usePopularTVShows() {
  const dispatch = useDispatch();
  try {
    // get the popular TV Shows
    const res = await axios.get(Popular_TVShows, API_Option);
    // set the popular TV Shows on redux store
    dispatch(
      getPopularTVShows(
        res?.data?.results.filter(
          (result) =>
            (result?.poster_path || result?.backdrop_path) &&
            (result?.release_date || result?.first_air_date)
        )
      )
    );
  } catch (error) {
    return {
      error: "Error while fetching popular TV Shows",
    };
  }
}

export default usePopularTVShows;
