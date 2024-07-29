import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTmdbApi from "../../hooks/useTmdbApi";
import Loader from "../../components/Loader/Loader";
import css from "./MovieReviews.module.css";

const stripHtmlTags = (html) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || "";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const MovieReviews = () => {
  const { fetchReviews } = useTmdbApi();
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, [fetchReviews, movieId]);

  if (!reviews) {
    return <Loader />;
  }

  return (
    <div className={css.reviewsContainer}>
      <h3 className={css.header}>Reviews</h3>
      <div>
        {reviews.results.length > 0 ? (
          <ul className={css.reviewsList}>
            {reviews.results.slice(0, 10).map((review) => (
              <li key={review.id} className={css.reviewItem}>
                <div className={css.reviewHeader}>
                  <h4 className={css.author}>{review.author}</h4>
                  <span className={css.reviewRating}>{review.author_details.rating}/10</span>
                </div>
                <p className={css.reviewContent}>{stripHtmlTags(review.content)}</p>
                <div className={css.reviewDetails}>
                  <p className={css.reviewDate}>Comment Date: {formatDate(review.created_at)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h4>Sorry, but there are no reviews for this movie</h4>
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
