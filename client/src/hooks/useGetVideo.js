import { API_Option, TMDB_BASE_PATH } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";

/* hook for getting Video of Movie or TV Show  */

export default async function useGetVideo(id, mediaType) {
  try {
    // access the video api
    const res = await axios.get(
      `${TMDB_BASE_PATH}/${mediaType}/${id}/videos?append_to_response=videos`,
      API_Option
    );

    // check if result empty
    if (res?.data?.results.length === 0) {
      toast.error("Sorry...Video Not Available");
    }
    // get video type using filter()
    const trailer = res?.data?.results.filter(
      (video) => video.type === "Trailer"
    );
    const teasers = res?.data?.results.filter(
      (video) => video.type === "Teaser"
    );
    const openingCredits = res?.data?.results.filter(
      (video) => video.type === "Opening Credits"
    );
    const clip = res?.data?.results.filter((video) => video.type === "Clip");
    const featurettes = res?.data?.results.filter(
      (video) => video.type === "Featurette"
    );

    const site = res?.data?.results.map((item) => item?.site)[0];

    return {
      videokey:
        trailer[0]?.key ||
        teasers[0]?.key ||
        clip[0]?.key ||
        openingCredits[0]?.key ||
        featurettes[0]?.key,
      site: site,
    };
  } catch (error) {
    return {
      error: "Error while accessing video",
    };
  }
}
