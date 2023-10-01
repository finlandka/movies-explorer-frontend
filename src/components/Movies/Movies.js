import './movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

function Movies({ films, isShowMore, dataShowMore }) {

  return (
    <section className="movies">
      <SearchForm/>
      <MoviesCardList films={films}/>
      <div className="movies__another">
        {isShowMore ? <button className="movies__button" onClick={dataShowMore}>Еще</button> : ''}
      </div>
    </section>
  );
}

export default Movies;