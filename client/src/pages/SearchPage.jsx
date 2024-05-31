import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useGetVideo from "../hooks/useGetVideo";
import DisplayCardGeneral from "../components/DisplayCardGeneral";
import { API_Option, SEARCH_PATH } from "../utils/constant";
import axios from "axios";
import { getSearchItems } from "../store/searchSlice";
import VideoPlayer from "../components/VideoPlayer";
import Button from "../components/Button";

function SearchPage() {
  const [loading, setLoading] = useState(false);

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
  const { qry } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle searched movies and tv shows
  async function getSearchedMoviesTVShows() {
    dispatch(getSearchItems([]));
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }
  // get the search Items data from redux store
  const { searchItems } = useSelector((store) => store.search);

  return (
    <div className="lg:px-5">
      <form>
        <Input
          className="text-[#ffffff]"
          search={true}
          placeholder={qry ? qry : "Search Movies or TV Shows"}
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

      <Heading text={`Found ${searchItems.length} results for "${qry}"`} />
      {loading ? (
        <p className="py-40 text-center font-bold  text-3xl text-[#fc4747]">
          Loading....
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] py-10">
          {searchItems?.map((item) => (
            <DisplayCardGeneral
              key={item?.id}
              imgName={item?.poster_path || item?.backdrop_path}
              year={item?.release_date || item?.first_air_date}
              mediaType={item?.name ? "tv" : "movie"}
              adult={item?.adult}
              name={item?.title || item?.name}
              id={item?.id}
              getVideoInfo={() => {
                getVideoInfo(item?.id, item?.name ? "tv" : "movie");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
