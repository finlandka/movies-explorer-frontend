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
      <img className="movies-card__pic" src={`https://api.nomoreparties.co/${film.image.url}`} alt={film.nameRU}/>
      <div className="movies-card__desc">
        <div className="movies-card__title-desc">
          <h2 className="movies-card__title">{film.nameRU}</h2>
          {
            location.pathname === '/movies' ?
              <button className="movies-card__check-back" type="button" onClick={handleLikeClick}>
                  <span
                    className={`movies-card__check ${likedMovies.has(film.id) ? 'movies-card__check-on' : 'movies-card__check-off'}`}></span>
              </button>
              :
              <button className="movies-card__delete" type="button"></button>
          }
        </div>
        <span
          className="movies-card__period">{`${Math.floor(film.duration / 60)}ч${film.duration - (60 * Math.floor(film.duration / 60))}м`}</span>
      </div>
    </li>
  )
}

export default MoviesCard;