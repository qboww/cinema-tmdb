import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams, useLocation, Navigate } from "react-router-dom";
import { useRef } from "react";
import Loader from "../../components/Loader/Loader";
import useTmdbApi from "../../hooks/useTmdbApi";
import { Toaster } from "react-hot-toast";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { fetchMovieById } = useTmdbApi();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const goBackRef = useRef(location.state || "/movies");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [fetchMovieById, movieId]);

  if (!movie) {
    return <Loader />;
  }

  return (
    <div className={css.container}>
      <div className={css.detailsContainer}>
        <div className={css.imageContainer}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className={css.infoContainer}>
          <h1 className={css.title}>{movie.title}</h1>
          <div className={css.dataTextContainer}>
            <div className={css.overviewSection}>
              <h3 className={css.header}>Overview</h3>
              <p className={css.overview}>{movie.overview}</p>
            </div>
            <div className={css.statisticsSection}>
              <h3 className={css.header}>Statistics</h3>
              <ul className={css.statisticsList}>
                <li>Release date: {movie.release_date}</li>
                <li>Vote average: {movie.vote_average}</li>
                <li>Votes: {movie.vote_count}</li>
              </ul>
            </div>
            <div className={css.genresSection}>
              <h3 className={css.header}>Genres</h3>
              <div className={css.genreBadges}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={css.genreBadge}>
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className={css.navContainer}>
        <div className={css.linksContainer}>
          <div className={css.links}>
            <NavLink to="cast" className={css.navLink}>
              Cast
            </NavLink>
            <NavLink to="reviews" className={css.navLink}>
              Reviews
            </NavLink>
          </div>
          <Link to={goBackRef.current} className={css.goBack} onClick={() => window.history.back()}>
            Go Back
          </Link>
        </div>
        {/* Navigate to the cast route by default */}
        {location.pathname === `/movies/${movieId}` && <Navigate to="cast" replace />}
        <Outlet />
      </nav>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MovieDetailsPage;
