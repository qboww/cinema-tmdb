import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import css from "./MovieList.module.css";

const MovieList = ({ movies, listName }) => {
  const location = useLocation();

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={css.moviesListContainer}>
      <p className={css.header}>{listName}</p>
      <ul className={css.moviesList}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.movieCard}>
            <Link
              className={css.link}
              to={{
                pathname: `/movies/${movie.id.toString()}`,
                state: { from: location.pathname },
              }}
            >
              <div className={css.cardContent}>
                <div
                  className={clsx(css.imgRateContainer, {
                    [css.noImage]: !movie.poster_path,
                  })}
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className={css.img}
                    />
                  ) : (
                    <div className={css.noImagePlaceholder}>No Image</div>
                  )}
                  <p
                    className={clsx(css.vote, {
                      [css.highVote]: movie.vote_average > 7.5,
                      [css.medVote]: movie.vote_average <= 7.5 && movie.vote_average > 6,
                      [css.lowVote]: movie.vote_average <= 6,
                    })}
                  >
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
                <div className={css.dataContainer}>
                  <p className={css.title}>{movie.title}</p>
                </div>
                <div className={css.cardBottom}>
                  <p className={css.popularity}>{movie.vote_count} votes</p>
                  <p className={css.date}>{movie.release_date}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
