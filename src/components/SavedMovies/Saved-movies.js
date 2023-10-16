import './saved-movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React, {useEffect} from "react";

function SavedMovies({ displayedSaveFilms, isLoading, onFilter, handleCardLike, likedMovies, storedCheck, getSaveMovies, error }) {
  useEffect(() => {
    getSaveMovies();
  }, [getSaveMovies])
  return (
    <section className="saved-movies">
      <SearchForm onFilter={onFilter} storedCheck={storedCheck}/>
      {error && <span>error</span>}
      <MoviesCardList films={displayedSaveFilms} isLoading={isLoading} handleCardLike={handleCardLike} likedMovies={likedMovies}/>
    </section>
  );
}

export default SavedMovies;