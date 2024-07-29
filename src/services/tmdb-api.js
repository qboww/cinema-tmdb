import axios from "axios";
import toast from "react-hot-toast";

class TmdbApi {
  constructor() {
    this.tmdbApi = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      params: {
        api_key: import.meta.env.VITE_REACT_APP_TMDB_API_KEY,
      },
    });
  }

  async fetchMovies() {
    try {
      const response = await this.tmdbApi.get("/trending/movie/day");
      return response.data.results;
    } catch (error) {
      toast.error("Error fetching trending movies: ", error);
      throw error;
    }
  }

  async fetchMovieById(id) {
    try {
      const response = await this.tmdbApi.get(`/movie/${id}`);
      return response.data;
    } catch (error) {
      toast.error(`Error fetching movie with ID ${id}: `, error);
      throw error;
    }
  }

  async fetchCast(id) {
    try {
      const response = await this.tmdbApi.get(`/movie/${id}/credits`);
      return response.data;
    } catch (error) {
      toast.error(`Error fetching cast for movie with ID ${id}: `, error);
      throw error;
    }
  }

  async fetchReviews(id) {
    try {
      const response = await this.tmdbApi.get(`/movie/${id}/reviews`);
      return response.data;
    } catch (error) {
      toast.error(`Error fetching reviews for movie with ID ${id}: `, error);
      throw error;
    }
  }

  async fetchMovieByQuery(query) {
    try {
      const response = await this.tmdbApi.get("/search/movie", {
        params: { query },
      });
      const results = response.data.results;
      if (results.length === 0) throw new Error(`No results found for query "${query}"`);
      return results;
    } catch (error) {
      toast.error(`Error searching movies with query "${query}"`, error);
      throw error;
    }
  }
}

export default TmdbApi;
