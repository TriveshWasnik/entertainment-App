import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Heading from "../components/Heading";
import useTrendingMoviesTVShows from "../hooks/useTrendingMoviesTVShows";
import Carousel from "../components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import DisplayCardTrending from "../components/DisplayCardTrending";
import useRecommended from "../hooks/useRecommended.js";
import DisplayCardGeneral from "../components/DisplayCardGeneral";
import VideoPlayer from "../components/VideoPlayer";
import Button from "../components/Button";
import useGetVideo from "../hooks/useGetVideo";
import { setLoading } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { API_Option, SEARCH_PATH } from "../utils/constant";
import axios from "axios";
import { getSearchItems } from "../store/searchSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);

  // called the hook trending movies and tv shows
  const setTrendingMoviesTVShows = async () => {
    setLoading(true);
    await useTrendingMoviesTVShows();
    setLoading(false);
  };
  setTrendingMoviesTVShows();

  // get the data from redux store
  const { trendingMoviesTVShows, recommendedMoviesTVShows } = useSelector(
    (store) => store.movie
  );
  let movieIds = [];
  let tvshowIds = [];

  // get the ids movies and tv shows
  trendingMoviesTVShows?.map((item) => {
    if (item.media_type === "movie") {
      movieIds.push(item.id);
    } else {
      tvshowIds.push(item.id);
    }
  });

  const movieId = movieIds[0];
  const tvshowId = tvshowIds[0];

  // called the hook useRecommended
  const setRecommended = async () => {
    setLoading(true);
    await useRecommended(movieId, tvshowId);
    setLoading(false);
  };
  setRecommended();

  useEffect(() => {
    setLoading(true);
    setTrendingMoviesTVShows();
    setRecommended();
    setLoading(false);
  }, [movieId, tvshowId]);

  const [videoUrl, setVideoUrl] = useState("");
  const [videoSite, setVideoSite] = useState("");

  // Function to handle play button click for Movie and TV Series
  async function getVideoInfo(id, mediaType) {
    try {
      const res = await useGetVideo(id, mediaType);
      setVideoUrl(res.videokey);
      setVideoSite(res.site);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to handle close Button
  function closeButtonHandler() {
    setVideoUrl("");
    setVideoSite("");
  }

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  // Function to handle searched movies and tv shows
  async function getSearchedMoviesTVShows() {
    dispatch(getSearchItems([]));
    try {
      const res = await axios.get(
        `${SEARCH_PATH}/multi?query=${query}`,
        API_Option
      );

      dispatch(
        getSearchItems(
          res?.data?.results.filter(
            (result) =>
              result.media_type !== "person" &&
              (result?.poster_path || result?.backdrop_path) &&
              (result?.release_date || result?.first_air_date)
          )
        )
      );

      if (res?.data?.results.length > 0) {
        navigate(`/search/${query}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="lg:px-5">
      <form onSubmit={(e) => searchHandler(e)}>
        <Input
          className="text-[#ffffff]"
          search={true}
          placeholder="Search for movies and tv shows"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={getSearchedMoviesTVShows}
        />
      </form>

      {videoUrl && (
        <div className="w-auto h-fit absolute top-[40%] left-[30%] z-10">
          <VideoPlayer vid={videoUrl} site={videoSite} className="relative" />
          <Button
            text="X"
            className="max-w-[48px] min-h-[48px] absolute top-4 right-6 font-bold text-[20px] "
            onClick={closeButtonHandler}
          />
        </div>
      )}

      <Heading text="Trending" className="mb-10" />
      {loading ? (
        <p className="py-40 text-center font-bold  text-3xl text-[#fc4747]">
          Loading....
        </p>
      ) : (
        <Carousel>
          {trendingMoviesTVShows?.map((item) => (
            <DisplayCardTrending
              key={item?.id}
              imgName={item?.poster_path || item?.backdrop_path}
              year={item?.first_air_date || item?.release_date}
              mediaType={item?.media_type}
              adult={item?.adult}
              name={item?.name || item?.title}
              id={item?.id}
              getVideoInfo={() => {
                getVideoInfo(item?.id, item?.media_type);
              }}
            />
          ))}
        </Carousel>
      )}

      <Heading text="Recommended for you" className="mt-10" />
      {loading ? (
        <p className="py-40 text-center font-bold  text-3xl text-[#fc4747]">
          Loading....
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] py-10">
          {recommendedMoviesTVShows?.map((item) => (
            <DisplayCardGeneral
              key={item?.id}
              imgName={item?.poster_path || item?.backdrop_path}
              year={item?.first_air_date || item?.release_date}
              mediaType={item?.media_type}
              adult={item?.adult}
              name={item?.name || item?.title}
              id={item?.id}
              getVideoInfo={() => {
                getVideoInfo(item?.id, item?.media_type);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
