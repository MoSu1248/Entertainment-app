import React from "react";
import { motion } from "motion/react";

export default function ModalTrailer({ trailerUrl, info }) {
  return (
    <div className="player__wrapper">
      <iframe
        key={trailerUrl}
        width="100%"
        height="100%"
        src={`${trailerUrl.replace("watch?v=", "embed/")}?autoplay=1&mute=0&controls=0&modestbranding=0`}
        title="Movie Trailer"
        allow="accelerometer;autoplay ;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="overlay">
        <h2>
          {info.name || info.original_title || info.name || info.original_name}
        </h2>
      </div>
    </div>
  );
}
