import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams, useLocation, Navigate } from "react-router-dom";
import { useRef } from "react";
import Loader from "../../components/Loader/Loader";
import useTmdbApi from "../../hooks/useTmdbApi";
import { Toaster, toast } from "react-hot-toast";
import clsx from "clsx";
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

  const handlePurchase = () => {
    const price = parseInt(movie.budget.toString().substring(0, 2));
    
    toast.success(`Successfully purchased "${movie.title}" for $${price}!`, {
      duration: 4000,
      position: "top-right",
      style: {
        background: '#4CAF50',
        color: '#fff',
        fontWeight: 'bold',
      },
      icon: '🎬',
    });
  };

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
            <div className={css.statGenCont}>
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
            <div className={css.genreAvCont}>
              <div className={`${css.genresSection}  ${css.badgesExt}`}>
                <div>
                  <h3 className={css.header}>Pricing</h3>
                  <div className={css.priceCont}>
                    <div className={`${css.genreBadges}`}>
                      <p>Price in US:</p>
                      <span className={css.genreBadge}>
                        ${parseInt(movie.budget.toString().substring(0, 2))}
                      </span>
                    </div>
                    <button onClick={handlePurchase}>
                      Purchase for ${parseInt(movie.budget.toString().substring(0, 2))}
                    </button>
                  </div>
                </div>
              </div>
              <div className={css.genresSection}>
                <h3 className={css.header}>Availabilty</h3>
                <span
                  className={clsx(
                    css.genreBadge,
                    movie.budget > 1000000 ? css.available : css.notAvailable,
                  )}
                >
                  {movie.budget > 1000000 ? "Available" : "Not available"}
                </span>
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
        {location.pathname === `/movies/${movieId}`}
        <Outlet />
      </nav>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MovieDetailsPage;