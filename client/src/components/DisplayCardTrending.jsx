import React, { useState } from "react";
import { RiBookmarkLine } from "react-icons/ri";
import { RiBookmarkFill } from "react-icons/ri";
import Button from "./Button";
import BasicInfo from "./BasicInfo";
import SubHeading from "./SubHeading";
import { API_END_POINT, Image_Relative_Path } from "../utils/constant";
import axios from "axios";
import conf from "../conf/conf";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setBookmarkMovies, setBookmarkTVShow } from "../store/userSlice";

function DisplayCardTrending({
  imgName = "",
  year = "",
  mediaType = "",
  adult = false,
  name = "",
  id = "",
}) {
  const [bookmarked, setBookmarked] = useState(false);
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
          setBookmarked(true);
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
          dispatch(setBookmarkTVShow(res?.data?.tvshow));
          setBookmarked(true);
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

  return (
    <div className={`relative h-64 group`}>
      <img
        className={`rounded-[5px] opacity-70 `}
        src={`${Image_Relative_Path}${imgName}`}
        alt=""
      />

      <div
        onClick={bookmarkHandler}
        className="absolute p-2 top-5 right-5 rounded-full bg-[#161d2f] opacity-50 hover:bg-white text-white   hover:text-[#10141e]"
      >
        {bookmarked ? <RiBookmarkFill /> : <RiBookmarkLine />}
      </div>

      <Button
        className="absolute top-1/2 left-1/2 -mt-[18px] -ml-14 max-w-[112px] w-[112px] text-[16px] md:text-[18px] rounded-3xl opacity-60 hidden group-hover:block  hover:bg-[#fc4747] hover:opacity-100"
        text="Play"
        textColor="text-white"
        bgColor="bg-[#5a698f]"
        icon={true}
      />

      <BasicInfo
        className={`absolute top-1/2 mt-10 left-[20px] text-[16px] md:text-[18px] font-medium`}
        year={year}
        mediaType={mediaType}
        adult={adult}
      />
      <SubHeading
        className={`absolute top-1/2 mt-16 left-[20px] text-[18px] md:text-[24px]`}
        name={name}
        textSize="24"
      />
    </div>
  );
}

export default DisplayCardTrending;
