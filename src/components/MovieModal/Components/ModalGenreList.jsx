import React from "react";

export default function ModalGenreList({ info }) {
  return (
    <div className="modal__genreList">
      <h4 className="modal__label">
        Genres :
        {info.genres?.map((genre, index) => (
          <span className="modal__text" key={index}>
            {genre.name}
          </span>
        ))}
      </h4>
    </div>
  );
}
