import './portfolio.css';
import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/finlandka/how-to-learn" target="_blank"
             rel="noopener noreferrer" title="Статичный сайт"><span>Статичный сайт</span><span
            className="portfolio__arrow">↗</span></a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://finlandka.github.io/russian-travel/" target="_blank"
             rel="noopener noreferrer" title="Адаптивный сайт"><span>Адаптивный сайт</span><span
            className="portfolio__arrow">↗</span></a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://voloh.nomoredomainsicu.ru" target="_blank"
             rel="noopener noreferrer" title="Одностраничное приложение"><span>Одностраничное приложение</span><span
            className="portfolio__arrow">↗</span></a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;