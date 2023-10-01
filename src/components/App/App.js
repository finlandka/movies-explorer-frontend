import './App.css';
import React, {useEffect, useState} from "react";
import {Routes, Route, useLocation} from "react-router-dom";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SavedMovies from '../SavedMovies/Saved-movies';

import data from "../../data";
import dataSave from "../../data-save";

function App() {
  const location = useLocation();
  const myRoutes = ['/', '/movies', '/saved-movies', '/profile'];
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [displayedSaveMovies, setDisplayedSaveMovies] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [showMoreButtonSave, setShowMoreButtonSave] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerRow(1);
      } else if (window.innerWidth < 1280) {
        setCardsPerRow(2);
      } else {
        setCardsPerRow(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setDisplayedMovies(data.slice(0, 4 * cardsPerRow));
    const rowMovies = Math.ceil(data.length / cardsPerRow);
    setShowMoreButton(rowMovies > 4);

    setDisplayedSaveMovies(dataSave.slice(0, 4 * cardsPerRow));
    const rowSaveMovies = Math.ceil(dataSave.length / cardsPerRow);
    setShowMoreButtonSave(rowSaveMovies > 4);
  }, [cardsPerRow]);

  function showMoreFilms() {
    setDisplayedMovies(data.slice(0, displayedMovies.length + 4 * cardsPerRow));
  }

  function showMoreSaveFilms() {
    setDisplayedSaveMovies(dataSave.slice(0, displayedSaveMovies.length + 4 * cardsPerRow));
  }

  function isMyRoutes() {
    return myRoutes.includes(location.pathname);
  }

  function handleOpenMenu() {
    setIsOpenMenu(true);
  }

  function handleCloseMenu() {
    setIsOpenMenu(false);
  }

  return (

    <div className="page">

      {isMyRoutes() && (
        <Header
          isOpen={isOpenMenu}
          onOpenMenu={handleOpenMenu}
          onCloseMenu={handleCloseMenu}
        />
      )}

      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/movies" element={
          <Movies
            films={displayedMovies}
            isShowMore={showMoreButton}
            dataShowMore={showMoreFilms}
          />}/>
        <Route path="/saved-movies" element={
          <SavedMovies
            films={displayedSaveMovies}
            isShowMore={showMoreButtonSave}
            dataShowMore={showMoreSaveFilms}
          />}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      {isMyRoutes() && <Footer/>}

    </div>

  );
}

export default App;
