import React, { useState, useEffect } from "react";
import useTmdbApi from "../../hooks/useTmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";
import appCss from "../../App.module.css";

const MoviesPage = () => {
  const { fetchMovieByQuery } = useTmdbApi();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async (query) => {
      const results = await fetchMovieByQuery(query);
      setSearchResults(results);
    };

    if (searchParams.has("query")) {
      const urlQuery = searchParams.get("query");
      setQuery(urlQuery);
      fetchMovies(urlQuery);
    }
  }, [searchParams, fetchMovieByQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateQueryString(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const updateQueryString = (query) => {
    const params = new URLSearchParams();
    if (query.trim() !== "") {
      params.append("query", query);
    }
    setSearchParams(params);
  };

  return (
    <div className={appCss.contentContainer}>
      <div className={css.aboutText}>
        <h1 className={css.title}>Search Movies</h1>
        <p className={css.description}>
          Here you are able to find any film you want{" "}
          <a
            className={css.link}
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB
          </a>
        </p>
        <p className={css.description}>
          Just fill in the search input with the desired movie name and we will find it for you
        </p>
      </div>

      <form onSubmit={handleSearch} className={css.searchContainer}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter Movie Query"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search Movies
        </button>
      </form>

      <MovieList movies={searchResults} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
