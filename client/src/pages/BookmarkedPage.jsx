import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Heading from "../components/Heading";
import DisplayCardGeneral from "../components/DisplayCardGeneral";
import useGetBookmarkedMovies from "../hooks/useGetBookmarkedMovies";
import useGetBookmarkedTVShows from "../hooks/useGetBookmarkedTVShows";
import VideoPlayer from "../components/VideoPlayer";
import Button from "../components/Button";
import useGetVideo from "../hooks/useGetVideo";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/userSlice";
import { getSearchItems } from "../store/searchSlice";
import { useNavigate } from "react-router-dom";

function BookmarkedPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);
  const [movies, setMovies] = useState([]);
  const [tvshows, setTVShows] = useState([]);

  // get bookmarked movies functionality
  async function getBookmarkedMovies() {
    try {
      const movies = await useGetBookmarkedMovies();
      setMovies(movies);
    } catch (error) {
      console.log(error.message);
    }
  }
  // get bookmarked TV Shows functionality
  async function getBookmarkedTVShows() {
    try {
      const tvshows = await useGetBookmarkedTVShows();
      setTVShows(tvshows);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    try {
      setLoading(true);
      getBookmarkedMovies();
      getBookmarkedTVShows();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Function to handle play button click for Movie and TV Series
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSite, setVideoSite] = useState("");

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

  // Function to handle search bookmarked movies and tv shows
  function getSearchedBookmarkedMoviesTVShows() {
    dispatch(getSearchItems([]));
    let res = [...movies, ...tvshows];
    const results = [];

    res.map((rs) => {
      if (rs.title && rs.title.toLowerCase().includes(query.toLowerCase())) {
        results.push(rs);
      } else if (
        rs.name &&
        rs.name.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push(rs);
      }
    });

    try {
      dispatch(getSearchItems(results));
      navigate(`/search/${query}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="lg:px-5 relative">
      <Input
        className="text-[#ffffff]"
        search={true}
        placeholder="Search for bookmarked shows"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={getSearchedBookmarkedMoviesTVShows}
      />

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

      <Heading text="Bookmarked Movies" />
      {loading ? (
        <p className="py-40 text-center font-bold  text-3xl text-[#fc4747]">
          Loading....
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] py-10">
          {movies && movies.length === 0 ? (
            <h2 className="py-20 text-center font-bold text-3xl text-[#fc4747]">
              You do not have any bookmarked movies
            </h2>
          ) : (
            movies?.map((item) => (
              <DisplayCardGeneral
                key={item?.id}
                imgName={item?.poster_path || item?.backdrop_path}
                year={item?.release_date}
                mediaType="movie"
                adult={item?.adult}
                name={item?.title}
                id={item?.id}
                bookmarked={true}
                getVideoInfo={() => getVideoInfo(item?.id, "movie")}
              />
            ))
          )}
        </div>
      )}

      <Heading text="Bookmarked TV Series" />
      {loading ? (
        <p className="py-40 text-center font-bold  text-3xl text-[#fc4747]">
          Loading....
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] py-10">
          {tvshows && tvshows.length === 0 ? (
            <h2 className="py-20 text-center font-bold text-3xl text-[#fc4747]">
              You do not have any bookmarked TV Shows
            </h2>
          ) : (
            tvshows?.map((item) => (
              <DisplayCardGeneral
                key={item?.id}
                imgName={item?.poster_path}
                year={item?.first_air_date}
                mediaType="tv"
                adult={item?.adult}
                name={item?.name}
                id={item?.id}
                bookmarked={true}
                getVideoInfo={() => getVideoInfo(item?.id, "tv")}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default BookmarkedPage;
