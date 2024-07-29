import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.messageWrapper}>
      <h2>Page you were looking for is not found</h2>
      <Link to="/">
        <span className="default-link">Return to the Home page</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
