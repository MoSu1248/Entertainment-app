import React, { useEffect, useState } from "react";
import "./MovieModal.scss";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useMovieModalStore } from "../Store/MovieModalStore";
import CloseIcon from "../../assets/icon-close.svg?react";

export default function MovieModal() {
  const [info, setInfo] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();
  const element = document.querySelector("body");
  const { modalId, modalState, modaltype } = useMovieModalStore();

  const setModalStateClose = useMovieModalStore(
    (state) => state.setModalStateClose,
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${modaltype}/${modalId}?api_key=${TMDB_API_KEY}&append_to_response=videos`,
        );
        const data = await res.json();
        setInfo(data);
        console.log(res);

        const trailer =
          data.videos?.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube",
          ) ||
          data.videos?.results.find(
            (video) => video.type === "Teaser" && video.site === "YouTube",
          ) ||
          data.videos?.results.find((video) => video.site === "YouTube");

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          setTrailerUrl(null);
        }
      } catch (err) {
        console.error("Failed to fetch movie info:", err);
      }
    };

    fetchMovie();
  }, [modalId]);

  function handleClose() {
    element.style.overflowY = "visible";
    navigate(-1);
  }

  return (
    <div
      className="modal__wrapper"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.5 }}
      // exit={{ opacity: 0, scale: 0.95 }}
    >
      <motion.div
        className="modal__container"
        transition={{ duration: 0.3 }}
        layoutId={String(modalId) || modalId}
        // initial={{ opacity: 0, scale: 0.95 }}
        // animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {" "}
        <button onClick={() => setModalStateClose()} className="close__btn">
          <CloseIcon />
        </button>
        {info && (
          <motion.div key={info.id}>
            {trailerUrl && (
              <div className="player__wrapper">
                <iframe
                  key={trailerUrl}
                  width="100%"
                  height="100%"
                  src={`${trailerUrl.replace("watch?v=", "embed/")}?autoplay=1&mute=0&controls=0&modestbranding=0`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>{" "}
                <div className="overlay"></div>
              </div>
            )}
            <h1>{info.title}</h1>
            <p>{info.overview}</p>
            <p>{info.release_date}</p>
            <ul>
              {info.genres?.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
