import './nav-tab.css';
import React from "react";
import {Link} from "react-router-dom";


function NavTab({ aboutProjectRef, techsRef, aboutMeRef, scrollToRef }) {
  return (
    <ul className="nav-tab">
      <li>
        <Link to="/#about-project" className="nav-tab__link" onClick={() => scrollToRef(aboutProjectRef)}>О
          проекте</Link>
      </li>
      <li>
        <Link to="/#techs" className="nav-tab__link" onClick={() => scrollToRef(techsRef)}>Технологии</Link>
      </li>
      <li>
        <Link to="/#about-me" className="nav-tab__link" onClick={() => scrollToRef(aboutMeRef)}>Студент</Link>
      </li>
    </ul>
  );
}

export default NavTab;