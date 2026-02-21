import React from "react";

export default function ModalImage({ info }) {
  return (
    <div className="player__wrapper">
      <img
        src={`https://image.tmdb.org/t/p/w780${info.backdrop_path || info.poster_path}`}
        alt=""
      />
      <div className="overlay">
        <h2>{info.name || info.original_title || info.name || info.original_name}</h2>
      </div>
    </div>
  );
}
