import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";
import Loader from "../../components/Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { fetchCast } = useTmdbApi();
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCast(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchData();
  }, [fetchCast, movieId]);

  if (!cast) {
    return <Loader />;
  }

  return (
    <div className={css.imagesContainer}>
      <h3 className={css.header}>Cast</h3>
      {cast && cast.cast && cast.cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.cast.slice(0, 10).map((actor) => (
            <li key={actor.id} className={css.castItem}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                  alt={actor.name}
                  className={css.img}
                />
              ) : (
                <div className={css.noImagePlaceholder}>No Image</div>
              )}
              <div className={css.actorDetails}>
                <h4 className={css.actorName}>{actor.name}</h4>
                <p className={css.characterName}>Character: {actor.character}</p>
                <p className={css.actorPopularity}>Popularity: {actor.popularity}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h4>Sorry, but there is no cast information available for this movie</h4>
      )}
    </div>
  );
};

export default MovieCast;
