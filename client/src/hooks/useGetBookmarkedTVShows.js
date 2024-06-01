import axios from "axios";
import { API_END_POINT } from "../utils/constant.js";

export default async function useGetBookmarkedTVShows() {
  /* hook for getting Bookmarked TV Shows  */
  try {
    const res = await axios.get(`${API_END_POINT}/bookmark/tvshows`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res?.data?.bookmarkedTVShows;
  } catch (error) {
    return [];
  }
}
