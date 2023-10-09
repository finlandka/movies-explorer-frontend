import './movies-card-list.css';
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";


function MoviesCardList({ films, isLoading, handleCardLike, likedMovies }) {
  const filmElement = films && films.map((film) => {
    return <MoviesCard key={film.id || film.movieId} film={film} handleCardLike={handleCardLike} likedMovies={likedMovies}/>
  });
  return (
    <section>
      {isLoading && <Preloader />}
      {films.length === 0 ? 'Ничего не найдено' :
        <ul className="movies-card-list">
          {filmElement}
        </ul>
      }
    </section>
  );
}

export default MoviesCardList;