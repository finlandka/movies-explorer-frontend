import React from 'react';
import './about-project.css';

const AboutProject = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="about-project content-block">
      <h2 className="content-block__title">О проекте</h2>
      <ul className="about-project__wrap">
        <li className="about-project__step">
          <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="content-block__text">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__step">
          <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="content-block__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about-project__wrap-time">
        <div className="about-project__time about-project__time_active">1 неделя</div>
        <div className="about-project__time">4 недели</div>
        <div className="about-project__name">Back-end</div>
        <div className="about-project__name">Front-end</div>
      </div>
    </section>
  );
});

export default AboutProject;