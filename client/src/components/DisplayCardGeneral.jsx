import React, { useState } from "react";
import { RiBookmarkLine } from "react-icons/ri";
import { RiBookmarkFill } from "react-icons/ri";
import Button from "./Button";
import BasicInfo from "./BasicInfo";
import SubHeading from "./SubHeading";
import { API_END_POINT, Image_Relative_Path } from "../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import conf from "../conf/conf";
import toast from "react-hot-toast";
import { setBookmarkMovies, setBookmarkTVShow } from "../store/userSlice";

function DisplayCardGeneral({
  imgName = "",
  year = "",
  mediaType = "",
  adult = false,
  name = "",
  id = "",
  bookmarked = false,
  getVideoInfo,
}) {
  const dispatch = useDispatch();
  /* functionality of getting bookmarked movies and TV Shows */
  async function bookmarkHandler() {
    let res = null;
    try {
      if (mediaType === "movie") {
        res = await axios.post(
          `${API_END_POINT}/bookmark/movies/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${conf.tmdbToken} `,
            },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          dispatch(setBookmarkMovies(res.data.movie));
          bookmarked = true;
        }
      } else if (mediaType === "tv") {
        res = await axios.post(
          `${API_END_POINT}/bookmark/tvshows/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${conf.tmdbToken} `,
            },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          dispatch(setBookmarkTVShow(res.data.tvshow));
          bookmarked = true;
        }
      }
    } catch (error) {
      if (error?.response?.data?.bookmark) {
        toast.error(error?.response?.data?.message);
      } else {
        console.log(error);
      }
    }
  }
  /* functionality for video play button of movies or TV Shows */
  function playButtonHandler(e) {
    e.preventDefault();
    mediaType === "movie" && getVideoInfo(id, "movie");
    mediaType === "tv" && getVideoInfo(id, "tv");
  }

  return (
    <div className={`relative max-w-[256px] group `}>
      <div className="h-[184px]">
        <img
          className={`rounded-[5px] opacity-70 h-full w-full `}
          src={`${Image_Relative_Path}${imgName}`}
          alt=""
        />
      </div>
      <div
        onClick={bookmarkHandler}
        className="absolute p-2 top-5 right-5 rounded-full bg-[#161d2f] opacity-50 hover:bg-white text-white   hover:text-[#10141e]"
      >
        {bookmarked ? <RiBookmarkFill /> : <RiBookmarkLine />}
      </div>
      <Button
        className="absolute top-1/3 left-1/2 -mt-[18px] -ml-14 max-w-24  w-[96px] text-[16px] md:text-[] rounded-3xl opacity-60 hidden group-hover:block hover:bg-[#fc4747] hover:opacity-100"
        text="Play"
        textColor="text-white"
        bgColor="bg-[#5a698f]"
        icon={true}
        onClick={playButtonHandler}
      />

      <BasicInfo
        className={`mt-2 text-[13px] md:text-[15px] `}
        year={year}
        mediaType={mediaType}
        adult={adult}
      />
      <SubHeading className={`mt-1 text-[16px] md:text-[18px]`} name={name} />
    </div>
  );
}

export default DisplayCardGeneral;
