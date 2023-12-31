import './movies-card-list.css';
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import {NOT_FOUND_RESULT} from "../../utils/constants";
import React from "react";


function MoviesCardList({ films, isLoading, handleCardLike, likedMovies }) {
  const filmElement = films && films.map((film) => {
    return <MoviesCard key={film.id || film.movieId} film={film} handleCardLike={handleCardLike}
                       likedMovies={likedMovies}/>
  });
  const isFind = localStorage.getItem('find')
  return (
    <>
      {isLoading ? <Preloader/> :
        <section>
          {films.length === 0 ? (isFind ? NOT_FOUND_RESULT : '') :
            <ul className="movies-card-list">
              {filmElement}
            </ul>}
        </section>}
    </>
  );
}

export default MoviesCardList;