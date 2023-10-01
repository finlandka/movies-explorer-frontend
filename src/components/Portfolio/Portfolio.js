import './portfolio.css';
import React from "react";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/finlandka/how-to-learn" target="_blank"
             rel="noopener noreferrer" title="Статичный сайт">Статичный сайт</a>
          <a className="portfolio__arrow" href="https://github.com/finlandka/how-to-learn" target="_blank"
             rel="noreferrer" title="Статичный сайт">↗</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://finlandka.github.io/russian-travel/" target="_blank"
             rel="noopener noreferrer" title="Адаптивный сайт">Адаптивный сайт</a>
          <a className="portfolio__arrow" href="https://finlandka.github.io/russian-travel/" target="_blank"
             rel="noopener noreferrer" title="Адаптивный сайт">↗</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://voloh.nomoredomainsicu.ru" target="_blank"
             rel="noopener noreferrer" title="Одностраничное приложение">Одностраничное приложение</a>
          <a className="portfolio__arrow" href="https://voloh.nomoredomainsicu.ru" target="_blank"
             rel="noopener noreferrer" title="Одностраничное приложение">↗</a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;