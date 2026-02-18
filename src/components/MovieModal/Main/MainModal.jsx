import React, { useEffect, useState } from "react";
import SeriesModal from "../Details/SeriesModal";
import PersonModal from "../Details/PersonModal";
import MovieModal from "../Details/MovieModal";
import { useMovieModalStore } from "../../Store/MovieModalStore";
import "./MainModal.scss";
export default function MainModal() {
  const { modaltype, modalId } = useMovieModalStore();
  const [info, setInfo] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${modaltype}/${modalId}?api_key=${TMDB_API_KEY}&append_to_response=videos`,
        );
        const data = await res.json();
        setInfo(data);
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
  }, [modalId, modaltype]);

  let modalContent = null;
  console.log(modaltype);

  if (modaltype === "tv") {
    modalContent = <SeriesModal info={info} trailerUrl={trailerUrl} />;
  } else if (modaltype === "movie") {
    modalContent = <MovieModal info={info} trailerUrl={trailerUrl} />;
  } else if (modaltype === "person") {
    modalContent = <PersonModal info={info} />;
  }

  return modalContent;
}
