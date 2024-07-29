import React from "react";
import Navigation from "./components/Navigation/Navigation";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.appContainer}>
      <Navigation />
      <div className={css.contentContainer}>
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
