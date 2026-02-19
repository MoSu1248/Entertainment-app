import "../Main/MainModal.scss";
import { motion } from "motion/react";
import { useMovieModalStore } from "../../Store/MovieModalStore";
import CloseIcon from "../../../assets/icon-close.svg?react";
import SimilarMovies from "../SimilarMovies";

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
              <div className="player__wrapper">
                <iframe
                  key={trailerUrl}
                  width="100%"
                  height="100%"
                  src={`${trailerUrl.replace("watch?v=", "embed/")}?autoplay=1&mute=0&controls=0&modestbranding=0`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="overlay">
                  <motion.h2>{info.name || info.original_name}</motion.h2>
                </div>
              </div>
            ) : (
              <div className="player__wrapper">
                <img
                  src={`https://image.tmdb.org/t/p/w780${info.backdrop_path || info.poster_path}`}
                  alt=""
                />
                <div className="overlay">
                  <motion.h2>{info.name || info.original_name} </motion.h2>
                </div>
              </div>
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
                <div>
                  {info.vote_average !== 0 && (
                    <p className="modal__label">
                      Voting Avg :
                      <span className="modal__text">{info.vote_average}</span>
                    </p>
                  )}
                </div>
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
              </div>
            </div>
          </motion.div>
        )}
        <SimilarMovies movie_id={info.id} />
      </motion.div>
    </div>
  );
}
