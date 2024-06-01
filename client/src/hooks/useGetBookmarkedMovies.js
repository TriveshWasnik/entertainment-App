import axios from "axios";
import { API_END_POINT } from "../utils/constant";

export default async function useGetBookmarkedMovies() {
  /* hook for getting Bookmarked Movies  */

  try {
    const res = await axios.get(`${API_END_POINT}/bookmark/movies`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return res?.data?.bookmarkedMovies;
  } catch (error) {
    return [];
  }
}
