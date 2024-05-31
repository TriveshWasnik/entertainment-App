/* Video Player Show */
import React from "react";
import ReactPlayer from "react-player/lazy";

function VideoPlayer({ vid, site }) {
  if (site === "Vimeo") {
    return <ReactPlayer controls url={`https://vimeo.com/${vid}`} />;
  } else if (site === "YouTube") {
    return <ReactPlayer url={`https://www.youtube.com/watch?v=${vid}`} />;
  }
}

export default VideoPlayer;
