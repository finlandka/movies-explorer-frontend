import './movies-card.css';
import {useLocation} from "react-router-dom";
import React from "react";

function MoviesCard({ film, handleCardLike, likedMovies }) {
  const location = useLocation();

  function handleLikeClick() {
    handleCardLike(film);
  }

  return (
    <li className="movies-card">
      <a className="movies-card__link" href={film.trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="movies-card__pic"
             src={`${location.pathname === '/movies' ? `https://api.nomoreparties.co/${film.image.formats.thumbnail.url}` : film.thumbnail}`}
             alt={film.nameRU}/>
        <div className="movies-card__desc">
          <div className="movies-card__title-desc">
            <h2 className="movies-card__title">{film.nameRU}</h2>
            {
              location.pathname === '/movies' ?
                <button className="movies-card__check-back" type="button" onClick={(e) => {
                  e.preventDefault();
                  handleLikeClick();
                }}>
                  <span
                    className={`movies-card__check ${likedMovies.has(film.id || film.movieId) ? 'movies-card__check-on' : 'movies-card__check-off'}`}></span>
                </button>
                :
                <button className="movies-card__delete" type="button" onClick={(e) => {
                  e.preventDefault();
                  handleLikeClick();
                }}></button>
            }
          </div>
          <span
            className="movies-card__period">{`${Math.floor(film.duration / 60)}ч${film.duration - (60 * Math.floor(film.duration / 60))}м`}</span>
        </div>
      </a>
    </li>
  )
}

export default MoviesCard;