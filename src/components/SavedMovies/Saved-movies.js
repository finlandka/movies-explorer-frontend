import './saved-movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React, {useEffect} from "react";

function SavedMovies({ films, isLoading, onFilter, handleCardLike, likedMovies, getSaveMovies }) {
  useEffect(() => {
    getSaveMovies();
  }, [getSaveMovies])
  return (
    <section className="saved-movies">
      <SearchForm/>
      <MoviesCardList films={films} isLoading={isLoading} handleCardLike={handleCardLike} likedMovies={likedMovies}/>
    </section>
  );
}

export default SavedMovies;