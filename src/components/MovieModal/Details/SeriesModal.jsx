import "../Main/MainModal.scss";
import { motion } from "motion/react";
import { useMovieModalStore } from "../../Store/MovieModalStore";
import CloseIcon from "../../../assets/icon-close.svg?react";
import SimilarMovies from "../SimilarMovies";
import ModalTrailer from "../Components/ModalTrailer";
import ModalGenreList from "../Components/ModalGenreList";
import ModalLinks from "../Components/ModalLinks";
import ModalImage from "../Components/ModalImage";
import ModalVotingAvg from "../Components/ModalVotingAvg";

export default function SeriesModal({ info, trailerUrl }) {
  const element = document.querySelector("body");
  const { modalId } = useMovieModalStore();

  const setModalStateClose = useMovieModalStore(
    (state) => state.setModalStateClose,
  );

  function closeHandler() {
    element.style.overflowY = "visible";
    setModalStateClose();
  }

  console.log(info);

  return (
    <div className="modal__wrapper">
      <motion.div
        className="modal__container"
        transition={{ duration: 0.3 }}
        layoutId={String(modalId)}
        // initial={{ opacity: 0, scale: 0.95 }}
        // animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button onClick={() => closeHandler()} className="close__btn">
          <CloseIcon />
        </button>
        {info && (
          <motion.div key={info.id}>
            {trailerUrl ? (
              <ModalTrailer trailerUrl={trailerUrl} info={info} />
            ) : (
              <ModalImage info={info} />
            )}
            <div className="modal__content">
              <div className="modal__generalInfo">
                <div className="modal__timeContainer">
                  <div className="modal_seriesText">
                    <p className="modal__label">
                      First Episode :
                      <span className="modal__text">{info.first_air_date}</span>
                    </p>
                    <p className="modal__label">
                      Last Episode :
                      <span className="modal__text">{info.last_air_date}</span>
                    </p>
                  </div>
                  <div className="modal_seriesText">
                    <p className="modal__label">
                      Number Of Seasons :
                      <span className="modal__text">
                        {info.number_of_seasons}
                      </span>
                    </p>
                    <p className="modal__label">
                      Number Of Episodes :
                      <span className="modal__text">
                        {info.number_of_episodes}
                      </span>
                    </p>
                  </div>
                  {info.media_type === "movie" && <p>{info.runtime} mins</p>}
                </div>
                <h3>{info.tagline}</h3>
                <p className="modal__overview">{info.overview}</p>
              </div>
              <div className="modal__rightContainer">
                <ModalVotingAvg info={info} />
                <ModalGenreList info={info} />
                <ModalLinks info={info} />
              </div>
            </div>
          </motion.div>
        )}
        <SimilarMovies movie_id={info.id} />
      </motion.div>
    </div>
  );
}
