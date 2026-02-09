import React, { useEffect, useState } from "react";
import "./MovieModal.scss";
import { Link, useParams } from "react-router";

export default function MovieModal() {
  const { id, type } = useParams();
  const [info, setInfo] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const element = document.querySelector("body");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`,
        );
        const data = await res.json();
        setInfo(data);
        element.style.overflowY = "hidden";
      } catch (err) {
        console.error("Failed to fetch movie info:", err);
        console.log(err);
      } finally {
        console.log("loading...");
      }
    };

    fetchMovie();
  }, [id]);

  console.log(info);

  return (
    <div className="modal__wrapper">
      <div className="modal__container">
        {info && (
          <div key={info.id}>
            <img
              src={`https://image.tmdb.org/t/p/w780${info.backdrop_path}`}
              alt=""
            />
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
      </div>
    </div>
  );
}
