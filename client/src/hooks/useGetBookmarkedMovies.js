import axios from "axios";
import { API_END_POINT } from "../utils/constant";

/* hook for getting Bookmarked Movies  */
export default async function useGetBookmarkedMovies() {
  try {
    const res = await axios.get(`${API_END_POINT}/bookmark/movies`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res?.data?.bookmarkedMovies;
  } catch (error) {
    return {
      error: "Error while Getting Bookmarked Movies",
    };
  }
}
