import React from 'react';
import './techs.css';

const Techs = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="techs content-block">
      <h2 className="content-block__title">Технологии</h2>
      <div className="techs__block">
        <h3 className="techs__title">7 технологий</h3>
        <p className="content-block__text techs__text">На курсе веб-разработки мы освоили технологии, которые применили
          в дипломном проекте.</p>
        <ul className="techs__all-techs">
          <li className="techs__tech">HTML</li>
          <li className="techs__tech">CSS</li>
          <li className="techs__tech">JS</li>
          <li className="techs__tech">React</li>
          <li className="techs__tech">Git</li>
          <li className="techs__tech">Express.js</li>
          <li className="techs__tech">mongoDB</li>
        </ul>
      </div>
    </section>
  );
});

export default Techs;