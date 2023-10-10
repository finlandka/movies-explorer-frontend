import './movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React, {useEffect, useState} from "react";

function Movies({ films, isLoading, onFilter, handleCardLike, likedMovies, storedFind, storedCheck, storedMovies }) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [cardsRow, setCardsRow] = useState(4);
  const [cardsRowMore, setCardsRowMore] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(false);
  console.log(likedMovies);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerRow(1);
        setCardsRow(5);
        setCardsRowMore(2);
      } else if (window.innerWidth < 1280) {
        setCardsPerRow(2);
      } else {
        setCardsPerRow(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setDisplayedMovies(films.slice(0, cardsRow * cardsPerRow));
    const rowMovies = Math.ceil(films.length / cardsPerRow);
    setShowMoreButton(rowMovies > cardsRow);

  }, [cardsPerRow, cardsRow, films]);

  useEffect(() => {
    setDisplayedMovies(storedMovies.slice(0, cardsRow * cardsPerRow));
    const rowMovies = Math.ceil(storedMovies.length / cardsPerRow);
    setShowMoreButton(rowMovies > cardsRow);
  }, [storedMovies, cardsPerRow, cardsRow]);

  function showMoreFilms() {
    const newCardsRow = cardsRow + cardsRowMore;
    setDisplayedMovies(films.slice(0, newCardsRow * cardsPerRow));
    setCardsRow(newCardsRow);

    const remainingMovies = Math.ceil((films.length - newCardsRow * cardsPerRow) / cardsPerRow);
    setShowMoreButton(remainingMovies > 0);
  }

  return (
    <section className="movies">
      <SearchForm onFilter={onFilter} storedFind={storedFind} storedCheck={storedCheck}/>
      <MoviesCardList films={displayedMovies} isLoading={isLoading} handleCardLike={handleCardLike} likedMovies={likedMovies}/>
      <div className="movies__another">
        {showMoreButton ? <button className="movies__button" onClick={showMoreFilms} type="button">Еще</button> : ''}
      </div>
    </section>
  );
}

export default Movies;