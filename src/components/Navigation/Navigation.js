import './navigation.css';
import {Link} from "react-router-dom";
import React from "react";

function Navigation({ isOpen, onOpenMenu, onCloseMenu }) {

  return (
    <>
      <div className="navigation__burger" onClick={onOpenMenu}></div>
      <div className={`navigation__cover ${isOpen ? 'navigation__cover_active' : ''}`}></div>
      <div className={`navigation__hidden ${isOpen ? 'navigation__hidden_active' : ''}`}>
        <div className="navigation__close" onClick={onCloseMenu}></div>
        <nav className="navigation__menu-burger">
          <Link to="/" className="navigation__link-burger" onClick={onCloseMenu}>Главная</Link>
          <Link to="/movies" className="navigation__link-burger navigation__link-burger_active"
                onClick={onCloseMenu}>Фильмы</Link>
          <Link to="/saved-movies" className="navigation__link-burger" onClick={onCloseMenu}>Сохранённые фильмы</Link>
        </nav>
        <Link to="/profile" className="navigation__link-profile">Аккаунт</Link>
      </div>
      <div className="navigation__section-menu">
        <nav className="navigation__menu">
          <Link to="/movies" className="navigation__link">Фильмы</Link>
          <Link to="/saved-movies" className="navigation__link">Сохранённые фильмы</Link>
        </nav>
        <Link to="/profile" className="navigation__link-profile">Аккаунт</Link>
      </div>
      <nav className="navigation__menu-login" style={{ display: "none" }}>
        <Link to="/signup" className="navigation__link-login">Регистрация</Link>
        <Link to="/signin" className="navigation__link-login navigation__link-login_active">Войти</Link>
      </nav>
    </>
  );
}

export default Navigation;