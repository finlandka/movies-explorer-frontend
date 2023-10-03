import './movies-card.css';
import {useLocation} from "react-router-dom";

function MoviesCard({ films }) {
  const location = useLocation();

  const filmElement = films.map((film) => {
    return (
      <li key={film.id} className="movies-card">
        <img className="movies-card__pic" src={film.url} alt={film.title}/>
        <div className="movies-card__desc">
          <div className="movies-card__title-desc">
            <h2 className="movies-card__title">{film.title}</h2>
            {
              location.pathname === '/movies' ?
                <button className="movies-card__check-back" type="button">
                  <span
                    className={`movies-card__check ${film.short ? 'movies-card__check-on' : 'movies-card__check-off'}`}></span>
                </button>
                :
                <button className="movies-card__delete" type="button"></button>
            }
          </div>
          <span className="movies-card__period">{film.duration}</span>
        </div>
      </li>
    )
  })

  return (
    <>{filmElement}</>
  );
}

export default MoviesCard;