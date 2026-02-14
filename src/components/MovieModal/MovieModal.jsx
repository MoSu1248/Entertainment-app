import React, { useEffect, useState } from "react";
import "./MovieModal.scss";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../assets/icon-close.svg?react";

export default function MovieModal() {
  const { id, type } = useParams();
  const [info, setInfo] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();
  const element = document.querySelector("body");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`,
        );
        const data = await res.json();
        setInfo(data);
      } catch (err) {
        console.error("Failed to fetch movie info:", err);
        console.log(err);
      } finally {
        console.log("loading...");
      }
    };

    fetchMovie();
  }, [id]);

  function handleClose() {
    element.style.overflowY = "visible";
    navigate(-1);
  }

  const imageUrlBack = `https://image.tmdb.org/t/p/original${info.backdrop_path} `;
  const imageUrlPoster = `https://image.tmdb.org/t/p/w780${info.poster_path}`;

  return (
    <motion.div
      className="modal__wrapper"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.5 }}
      // exit={{ opacity: 0, scale: 0.95 }}
      style={{
        zIndex: 1000, // above all cards
      }}
    >
      <motion.div
        className="modal__container"
        transition={{ duration: 0.3 }}
        layoutId={String(id)}
        // initial={{ opacity: 0, scale: 0.95 }}
        // animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button onClick={() => handleClose()} className="close__btn">
          <CloseIcon />
        </button>
        {info && (
          <div key={info.id}>
            {info.backdrop_path ? (
              <img
                className="image_top"
                layoutId={`image-${info.id}`}
                src={imageUrlBack}
                alt={info.title}
              />
            ) : (
              <img
                className="image_top"
                layoutId={`image-${info.id}`}
                src={imageUrlPoster}
                alt={info.title}
              />
            )}
            <h1>{info.title}</h1>
            <p>{info.overview}</p>
            <p>{info.release_date}</p>
            <ul>
              {info.genres?.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
