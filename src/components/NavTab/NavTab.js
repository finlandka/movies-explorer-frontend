import './nav-tab.css';
import React from "react";
import {Link} from "react-router-dom";


function NavTab({ aboutProjectRef, techsRef, aboutMeRef, scrollToRef }) {
  return (
    <nav className="nav-tab">
      <Link to="/#about-project" className="nav-tab__link" onClick={() => scrollToRef(aboutProjectRef)}>О проекте</Link>
      <Link to="/#techs" className="nav-tab__link" onClick={() => scrollToRef(techsRef)}>Технологии</Link>
      <Link to="/#about-me" className="nav-tab__link" onClick={() => scrollToRef(aboutMeRef)}>Студент</Link>
    </nav>
  );
}

export default NavTab;