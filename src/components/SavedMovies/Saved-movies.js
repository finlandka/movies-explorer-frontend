import './saved-movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React, {useEffect} from "react";

function SavedMovies({ displayedSaveFilms, isLoading, onFilter, handleCardLike, likedMovies, getSaveMovies }) {
  console.log(likedMovies);
  useEffect(() => {
    getSaveMovies();
  }, [getSaveMovies])
  return (
    <section className="saved-movies">
      <SearchForm onFilter={onFilter}/>
      <MoviesCardList films={displayedSaveFilms} isLoading={isLoading} handleCardLike={handleCardLike} likedMovies={likedMovies}/>
    </section>
  );
}

export default SavedMovies;