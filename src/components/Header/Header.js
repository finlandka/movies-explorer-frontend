import './header.css';
import React from "react";
import Navigation from "../Navigation/Navigation";
import {Link, useLocation} from "react-router-dom";

function Header({ isOpen, onOpenMenu, onCloseMenu }) {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' ? 'header_dark' : ''}`}>
      <Link className="header__logo" to="/" title="Учебный проект"></Link>
      <Navigation
        isOpen={isOpen}
        onOpenMenu={onOpenMenu}
        onCloseMenu={onCloseMenu}
      />
    </header>
  );
}

export default Header;