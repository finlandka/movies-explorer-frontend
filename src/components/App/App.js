import './App.css';
import React, {useEffect, useState} from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";

import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import {filter} from "../../utils/filter";

import {CurrentUserContext} from '../../context/CurrentUserContext';
import {LoggedInContext} from '../../context/LoggedInContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SavedMovies from '../SavedMovies/Saved-movies';

import dataSave from "../../data-save";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const myRoutesHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const myRoutesFooter = ['/', '/movies', '/saved-movies'];
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [displayedSaveMovies, setDisplayedSaveMovies] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [cardsRow, setCardsRow] = useState(4);
  const [cardsRowMore, setCardsRowMore] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [showMoreButtonSave, setShowMoreButtonSave] = useState(false);
  const [storedFind, setStoredFind] = useState('');
  const [storedCheck, setStoredCheck] = useState(false);
  const [storedMovies, setStoredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(new Set());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerRow(1);
        setCardsRow(5);
        setCardsRowMore(2);
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
    setDisplayedMovies(allMovies.slice(0, cardsRow * cardsPerRow));
    const rowMovies = Math.ceil(allMovies.length / cardsPerRow);
    setShowMoreButton(rowMovies > cardsRow);

    setDisplayedSaveMovies(dataSave.slice(0, cardsRow * cardsPerRow));
    const rowSaveMovies = Math.ceil(dataSave.length / cardsPerRow);
    setShowMoreButtonSave(rowSaveMovies > cardsRow);
  }, [cardsPerRow, cardsRow, allMovies]);

  useEffect(() => {
    setStoredFind(localStorage.getItem('find'));
    setStoredCheck(localStorage.getItem('check') === 'true');
    setStoredMovies(JSON.parse(localStorage.getItem('allMovies')));
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi.getToken(token)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function showMoreFilms() {
    const newDisplayedMovies = allMovies.slice(0, allMovies.length + cardsRowMore * cardsPerRow);
    setDisplayedMovies(newDisplayedMovies);
    const rowMovies = Math.ceil((allMovies.length - newDisplayedMovies.length) / cardsPerRow);
    setShowMoreButton(rowMovies > 0);
  }

  function showMoreSaveFilms() {
    setDisplayedSaveMovies(dataSave.slice(0, displayedSaveMovies.length + cardsRowMore * cardsPerRow));
  }

  function isMyRoutes(myRoutes) {
    return myRoutes.includes(location.pathname);
  }

  function handleOpenMenu() {
    setIsOpenMenu(true);
  }

  function handleCloseMenu() {
    setIsOpenMenu(false);
  }

  function onRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        onLogin(email, password);
      })
      .catch(error => {
        setRegisterError(error);
      });
  }

  function onLogin(email, password) {
    mainApi.authorization(email, password)
      .then((result) => {
        setLoggedIn(true);
        localStorage.setItem('token', result.token);
        getUser();
        navigate("/movies", { replace: true });
      })
      .catch(error => {
        setLoginError(error);
      });
  }

  function getUser() {
    mainApi.getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(console.error);
  }

  function updateUser(data) {
    mainApi.setUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch(console.error);
  }

  function onLogout() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
  }

  function handleCardLike(movie) {
    const newLikedMovies = new Set(likedMovies);

    if (likedMovies.has(movie.id)) {
      mainApi.deleteMovie(movie)
        .then(result => {
          newLikedMovies.delete(movie.id);
          setLikedMovies(newLikedMovies);
        })
        .catch(console.error)
    } else {
      mainApi.addMovie(movie)
        .then(result => {
          newLikedMovies.add(movie.id);
          setLikedMovies(newLikedMovies);
        })
        .catch(console.error)
    }
  }

  function findMovies(find, check) {
    setIsLoading(true);

    if (storedFind === find && storedCheck === check && storedMovies) {
      setAllMovies(storedMovies);
      setIsLoading(false);
    } else {

      moviesApi.getMovies()
        .then(result => {
          const filteredMovies = filter(result, find, check);
          setAllMovies(filteredMovies);
          setIsLoading(false);

          localStorage.setItem('find', find);
          localStorage.setItem('check', String(check));
          localStorage.setItem('allMovies', JSON.stringify(filteredMovies));

          setStoredFind(find);
          setStoredCheck(check);
          setStoredMovies(filteredMovies);
        })
        .catch(console.error);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <div className="page">

          {isMyRoutes(myRoutesHeader) && (
            <Header
              isOpen={isOpenMenu}
              onOpenMenu={handleOpenMenu}
              onCloseMenu={handleCloseMenu}
              loggedIn={loggedIn}
            />
          )}
          <main>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/signin" element={<Login onLogin={onLogin} loginError={loginError}/>}/>
              <Route path="/signup" element={<Register onRegister={onRegister} registerError={registerError}/>}/>
              <Route path="/movies" element={
                <Movies
                  films={displayedMovies}
                  isLoading={isLoading}
                  isShowMore={showMoreButton}
                  dataShowMore={showMoreFilms}
                  onFilter={findMovies}
                  storedFind={storedFind}
                  storedCheck={storedCheck}
                  handleCardLike={handleCardLike}
                  likedMovies={likedMovies}
                />}/>
              <Route path="/saved-movies" element={
                <SavedMovies
                  films={displayedSaveMovies}
                  isShowMore={showMoreButtonSave}
                  dataShowMore={showMoreSaveFilms}
                />}/>
              <Route path="/profile" element={<Profile onLogout={onLogout} updateUser={updateUser}/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </main>

          {isMyRoutes(myRoutesFooter) && <Footer/>}

        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
