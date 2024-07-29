import React, { useEffect, useState } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import { Toaster } from "react-hot-toast";
import css from "./HomePage.module.css";

const HomePage = () => {
  const { fetchTrendingMovies } = useTmdbApi();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies(setMovies);
  }, [fetchTrendingMovies]);

  return (
    <div className={css.container}>
      <div className={css.aboutText}>
        <h1 className={css.title}>Trending Movies</h1>
        <p className={css.description}>
          We provide you with some new films of the day, presented by{" "}
          <a
            className={css.link}
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB
          </a>
        </p>
        <p className={css.description}>Here are films that you might not have seen!</p>
      </div>
      <MovieList movies={movies} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default HomePage;
