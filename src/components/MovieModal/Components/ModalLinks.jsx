import React from "react";

export default function ModalLinks({ info }) {
  return (
    <div className="modal__linkContainer">
      {info.homepage && (
        <a
          href={info.homepage}
          className="modal__links"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Site
        </a>
      )}
      {info.imdb_id && (
        <a
          href={`https://www.imdb.com/title/${info.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="modal__links"
        >
          View on IMDb
        </a>
      )}
    </div>
  );
}
