import React from "react";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevisionFill } from "react-icons/pi";

/* Basic information like year, media type and adult for every card  */
function BasicInfo({
  className = "",
  year = "",
  mediaType = "",
  adult = true,
}) {
  return (
    <div className={`flex items-center   text-[#ccc] ${className}`}>
      <div>{year.slice(0, 4)}</div>
      <div className="px-[5px] flex gap-1 items-center ">
        &#x2022;
        {mediaType === "tv" && (
          <div className="flex items-center">
            <PiTelevisionFill className="pr-[5px] text-[24px]" />
            <span>TV Series</span>
          </div>
        )}
        {mediaType === "movie" && (
          <div className="flex items-center">
            <RiFilmFill className="pr-[5px] text-[24px]" />
            <span>Movie</span>
          </div>
        )}
        &#x2022;
      </div>
      <div>{adult ? "18+" : "PG"}</div>
    </div>
  );
}

export default BasicInfo;
