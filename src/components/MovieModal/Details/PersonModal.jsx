import React from "react";
import { motion } from "motion/react";
import CloseIcon from "../../../assets/icon-close.svg?react";
import "../Main/MainModal.scss";
import { useMovieModalStore } from "../../Store/MovieModalStore";

export default function PersonModal({ info, modalId }) {
  console.log(info);
  const setModalStateClose = useMovieModalStore(
    (state) => state.setModalStateClose,
  );
  return (
    <div className="modal__wrapper ">
      <motion.div
        className="modal__container modal__person"
        transition={{ duration: 0.3 }}
        layoutId={String(modalId)}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button onClick={() => setModalStateClose()} className="close__btn">
          <CloseIcon />
        </button>
        {info && (
          <motion.div key={info.id}>
            <div className="player__wrapper ">
              {!info.proflie_path ? (
                <img
                  className="image"
                  src={`https://image.tmdb.org/t/p/w780${info.profile_path}`}
                  alt={info.title || info.name}
                />
              ) : (
                <div className="card__img-placeholder">No Image</div>
              )}
              <div className="overlay">
                <motion.h2>{info.name}</motion.h2>
              </div>
            </div>

            <div className="modal__content ">
              <div className="modal__personContainer">
                <div className="modal__timeContainer">
                  <p>{info.birthday}</p>{" "}
                  <p className="modal__overview">{info.place_of_birth}</p>
                </div>
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
                      href={`https://www.imdb.com/name/${info.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal__links"
                    >
                      View on IMDb
                    </a>
                  )}
                </div>
                <p className="modal__overview">{info.biography}</p>
              </div>
            </div>
          </motion.div>
        )}
        {/* <SimilarMovies movie_id={info.id} /> */}
      </motion.div>
    </div>
  );
}
