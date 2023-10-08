import './movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

function Movies({ films, isLoading, isShowMore, dataShowMore, onFilter, storedFind, storedCheck, handleCardLike, likedMovies }) {

  return (
    <section className="movies">
      <SearchForm onFilter={onFilter} storedFind={storedFind} storedCheck={storedCheck}/>
      <MoviesCardList films={films} isLoading={isLoading} handleCardLike={handleCardLike} likedMovies={likedMovies}/>
      <div className="movies__another">
        {isShowMore ? <button className="movies__button" onClick={dataShowMore} type="button">Еще</button> : ''}
      </div>
    </section>
  );
}

export default Movies;