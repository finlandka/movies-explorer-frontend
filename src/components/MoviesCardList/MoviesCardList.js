import './movies-card-list.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";


function MoviesCardList({ films }) {

  return (
    <section>
      <ul className="movies-card-list">
        <MoviesCard films={films}/>
      </ul>
    </section>
  );
}

export default MoviesCardList;