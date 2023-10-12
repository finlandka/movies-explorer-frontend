import './movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {
  MORE_TWO_ROW,
  MORE_ONE_ROW,
  CARDS_PER_ROW_FOUR,
  CARDS_PER_ROW_TWO,
  CARDS_PER_ROW_ONE,
  ROW_FOUR,
  ROW_FIVE,
  YET
} from "../../utils/constants";
import React, {useEffect, useState} from "react";

function Movies({ films, isLoading, onFilter, handleCardLike, likedMovies, storedFind, storedCheck, storedMovies, error }) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [cardsRow, setCardsRow] = useState(4);
  const [cardsRowMore, setCardsRowMore] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerRow(CARDS_PER_ROW_ONE);
        setCardsRow(ROW_FIVE);
        setCardsRowMore(MORE_TWO_ROW);
      } else if (window.innerWidth < 1280) {
        setCardsPerRow(CARDS_PER_ROW_TWO);
        setCardsRow(ROW_FOUR);
        setCardsRowMore(MORE_ONE_ROW);
      } else {
        setCardsPerRow(CARDS_PER_ROW_FOUR);
        setCardsRow(ROW_FOUR);
        setCardsRowMore(MORE_ONE_ROW);
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
      {error && <span>error</span>}
      <MoviesCardList films={displayedMovies} isLoading={isLoading} handleCardLike={handleCardLike}
                      likedMovies={likedMovies}/>
      <div className="movies__another">
        {showMoreButton ? <button className="movies__button" onClick={showMoreFilms} type="button">{YET}</button> : ''}
      </div>
    </section>
  );
}

export default Movies;