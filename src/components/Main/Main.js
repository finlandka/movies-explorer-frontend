import React, {useRef} from 'react';
import Promo from '../Promo/Promo';
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
  const aboutProjectRef = useRef(null);
  const techsRef = useRef(null);
  const aboutMeRef = useRef(null);

  function scrollToRef(ref) {
    window.scrollTo(0, ref.current.offsetTop);
  }

  return (
    <>
      <Promo/>
      <NavTab
        aboutProjectRef={aboutProjectRef}
        techsRef={techsRef}
        aboutMeRef={aboutMeRef}
        scrollToRef={scrollToRef}
      />
      <AboutProject ref={aboutProjectRef}/>
      <Techs ref={techsRef}/>
      <AboutMe ref={aboutMeRef}/>
    </>
  );
}

export default Main;