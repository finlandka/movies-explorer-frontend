import React from "react";
import './about-me.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/about-me_photo.png';

const AboutMe = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="about-me content-block">
      <h2 className="content-block__title">Студент</h2>
      <div className="about-me__card">
        <article className="about-me__info">
          <h3 className="about-me__title">Елена</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__description">Я родилась в Нефтеюганске. Живу в Санкт-Петербурге. Закончила
            геологический факультет СПбГУ. У меня есть муж
            и две дочери. Я люблю слушать музыку. Кодить начала еще в университете. С 2013 года работала в СПбГУ
            программистом. После того, как прошла курс по веб-разработке, ищу новую работу.</p>
        </article>
        <img className="about-me__photo" src={photo} alt="Елена"></img>
        <a href="https://github.com/finlandka" target="_blank" rel="noopener noreferrer" title="github"
           className="about-me__link">Github</a>
      </div>
      <Portfolio/>
    </section>
  );
});

export default AboutMe;