import './navigation.css';
import {Link, useLocation} from "react-router-dom";
import React from "react";

function Navigation({ isOpen, onOpenMenu, onCloseMenu, loggedIn }) {
  const location = useLocation();

  return (
    <>
      {loggedIn ? (
        <>
          <div className="header__section-menu">
            <nav className="header__menu">
              <Link to="/movies" className="header__link">Фильмы</Link>
              <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
            </nav>
            <Link to="/profile" className="header__link-profile">Аккаунт</Link>
          </div>

          <button className="header__burger" onClick={onOpenMenu} type="button"></button>
          <div className={`header__cover ${isOpen ? 'header__cover_active' : ''}`}></div>
          <div className={`header__hidden ${isOpen ? 'header__hidden_active' : ''}`}>
          <button className="header__close" onClick={onCloseMenu} type="button"></button>
          <nav className="header__menu-burger">
            <Link to="/" className={`header__link-burger ${location.pathname === '/' ? 'header__link-burger_active' : ''}`}
            onClick={onCloseMenu}>Главная</Link>
            <Link to="/movies"
            className={`header__link-burger ${location.pathname === '/movies' ? 'header__link-burger_active' : ''}`}
            onClick={onCloseMenu}>Фильмы</Link>
            <Link to="/saved-movies"
            className={`header__link-burger ${location.pathname === '/saved-movies' ? 'header__link-burger_active' : ''}`}
            onClick={onCloseMenu}>Сохранённые фильмы</Link>
          </nav>
          <Link to="/profile" className="header__link-profile">Аккаунт</Link>
          </div>
        </>

        ) : (
      <nav className="header__menu-login">
        <Link to="/signup" className="header__link-login">Регистрация</Link>
        <Link to="/signin" className="header__link-login header__link-login_active">Войти</Link>
      </nav>
        )}
    </>
  );
}

export default Navigation;