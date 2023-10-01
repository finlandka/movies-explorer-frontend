import './movies-card-list.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";


function MoviesCardList({ films }) {

  return (
    <ul className="movies-card-list">
      <MoviesCard films={films}/>
    </ul>
  );
}

export default MoviesCardList;