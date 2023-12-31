import './App.css';
import React, {useEffect, useState, useCallback} from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";

import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import {filter} from "../../utils/filter";

import {CurrentUserContext} from '../../context/CurrentUserContext';
import {LoggedInContext} from '../../context/LoggedInContext';

import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import ProtectedAuthRouteElement from '../ProtectedAuthRoute/ProtectedAuthRoute';

import {ERROR_MESSAGE} from "../../utils/constants";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SavedMovies from '../SavedMovies/Saved-movies';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const myRoutesHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const myRoutesFooter = ['/', '/movies', '/saved-movies'];
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [displayedSaveMovies, setDisplayedSaveMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(new Set());
  const [likedMoviesIds, setLikedMoviesIds] = useState({});
  const [storedFind, setStoredFind] = useState('');
  const [storedCheck, setStoredCheck] = useState(false);
  const [storedMovies, setStoredMovies] = useState([]);
  const [updateUserMessage, setUpdateUserMessage] = useState('');
  const [error, setError] = useState(null);

  const resetRegisterError = React.useCallback(() => {
    setRegisterError('');
  }, []);

  const resetLoginError = React.useCallback(() => {
    setLoginError('');
  }, []);

  const findSavedMovies = useCallback((find, check) => {
    setDisplayedSaveMovies(filter(saveMovies, find, check));
  }, [saveMovies]);

  const getSaveMovies = useCallback(() => {
    mainApi.getMovies()
      .then(result => {
        setLikedMovies(new Set(result.map(movie => movie.movieId)));
        setSaveMovies(result);
        setDisplayedSaveMovies(result);
      })
      .catch(() => setError(ERROR_MESSAGE))
  }, [])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const savedUser = JSON.parse(localStorage.getItem("currentUser"));
      mainApi.getToken(token)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
            setCurrentUser(savedUser);
          }
          setLoading(false);
        })
        .catch(() => {
          setError(ERROR_MESSAGE);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if(savedUser && !saveMovies.length) {
      mainApi.getMovies()
        .then(result => {
          setLikedMovies(new Set(result.map(movie => movie.movieId)));
          setSaveMovies(result);
          setDisplayedSaveMovies(result);
          result.forEach((movie) => {
            setLikedMoviesIds((prevIds) => {
              const newLikedMoviesIds = prevIds;
              newLikedMoviesIds[movie.movieId] = movie._id
              localStorage.setItem('likedMoviesIds', JSON.stringify(newLikedMoviesIds));
              return newLikedMoviesIds
            })
          })
        })
        .catch(() => setError(ERROR_MESSAGE))
    }
  }, [saveMovies, currentUser])

  useEffect(() => {
    const isMoviesPage = location.pathname === '/movies';
    const find = localStorage.getItem('find') || '';
    const check = localStorage.getItem('check') || 'false';
    const movies = localStorage.getItem('allMovies');
    const storedLikedMovies = localStorage.getItem('likedMovies');
    const storedLikedMoviesIds = localStorage.getItem('likedMoviesIds');
    if (find) setStoredFind(find);
    if (check) {
      isMoviesPage && setStoredCheck(check === 'true');
      isMoviesPage ? findSavedMovies(find, check === 'true') : findSavedMovies('', false);
    }
    if (movies) setStoredMovies(JSON.parse(movies));
    if (storedLikedMovies) setLikedMovies(new Set(JSON.parse(storedLikedMovies)));
    if (storedLikedMoviesIds) setLikedMoviesIds(JSON.parse(storedLikedMoviesIds));
  }, [allMovies, location.pathname, findSavedMovies]);

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
    return mainApi.register(name, email, password)
      .then(() => {
        onLogin(email, password);
      })
      .catch(error => {
        setRegisterError(error);
      });
  }

  function onLogin(email, password) {
    return mainApi.authorization(email, password)
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
        localStorage.setItem('currentUser', JSON.stringify(result));
      })
      .catch(() => setError(ERROR_MESSAGE));
  }

  function updateUser(data) {
    return mainApi.setUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
        localStorage.setItem('currentUser', JSON.stringify(result));
        setUpdateUserMessage('Данные успешно обновлены');
      })
      .catch((error) => setUpdateUserMessage(error));
  }

  function onLogout() {
    // Cleanup
    setLoggedIn(false);
    setCurrentUser({});
    setStoredFind("");
    setAllMovies([]);
    setStoredMovies([]);
    setStoredCheck(false);
    setSaveMovies([]);
    setLikedMovies(new Set())
    setLikedMoviesIds({})
    localStorage.clear();

  }

  const handleCardLike = (movie) => {
    if (likedMovies.has(movie.movieId || movie.id)) {
      if (!movie._id) {
        movie._id = likedMoviesIds[movie.id]
      }
      mainApi
        .deleteMovie(movie._id)
        .then(() => {
          setLikedMovies((prevLikedMovies) => {
            const newLikedMovies = new Set(prevLikedMovies);
            newLikedMovies.delete(movie.movieId || movie.id);
            const updatedLikedMoviesArray = Array.from(newLikedMovies);
            localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMoviesArray));
            return newLikedMovies;
          });
          setLikedMoviesIds((prevIds) => {
            const newLikedMoviesIds = prevIds;
            delete newLikedMoviesIds[movie.movieId || movie.id]
            localStorage.setItem('likedMoviesIds', JSON.stringify(newLikedMoviesIds));
            return newLikedMoviesIds
          })
          getSaveMovies()
        })
        .catch(() => setError(ERROR_MESSAGE));
    } else {
      mainApi
        .addMovie(movie)
        .then((movie) => {
          setLikedMovies((prevLikedMovies) => {
            const newLikedMovies = new Set(prevLikedMovies);
            newLikedMovies.add(movie.movieId || movie.id);
            const updatedLikedMoviesArray = Array.from(newLikedMovies);
            localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMoviesArray));
            return newLikedMovies;
          });
          setLikedMoviesIds((prevIds) => {
            const newLikedMoviesIds = prevIds;
            newLikedMoviesIds[movie.movieId || movie.id] = movie._id
            localStorage.setItem('likedMoviesIds', JSON.stringify(newLikedMoviesIds));
            return newLikedMoviesIds
          })
        })
        .catch(() => setError(ERROR_MESSAGE));
    }
  };


  const findMovies = useCallback((find, check) => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then(result => {
        const filteredMovies = filter(result, find, check);
        setAllMovies(filteredMovies);
        setIsLoading(false);
        localStorage.setItem('allMovies', JSON.stringify(filteredMovies));
      })
      .catch(() => setError(ERROR_MESSAGE));
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={{ loggedIn, loading }}>
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
              <Route path="/signin"
                     element={<ProtectedAuthRouteElement element={<Login onLogin={onLogin} loginError={loginError} resetLoginError={resetLoginError}/>}
                       />}/>
              <Route path="/signup" element={<ProtectedAuthRouteElement element={<Register onRegister={onRegister} registerError={registerError}
                                                       resetRegisterError={resetRegisterError}/>}/>}/>
              <Route path="/movies" element={<ProtectedRouteElement element={
                <Movies
                  films={allMovies}
                  isLoading={isLoading}
                  onFilter={findMovies}
                  handleCardLike={handleCardLike}
                  likedMovies={likedMovies}
                  storedFind={storedFind}
                  storedCheck={storedCheck}
                  storedMovies={storedMovies}
                  error={error}
                />}/>}/>
              <Route path="/saved-movies" element={<ProtectedRouteElement element={
                <SavedMovies
                  displayedSaveFilms={displayedSaveMovies}
                  isLoading={isLoading}
                  onFilter={findSavedMovies}
                  handleCardLike={handleCardLike}
                  likedMovies={likedMovies}
                  getSaveMovies={getSaveMovies}
                  error={error}
                />}/>}/>
              <Route path="/profile" element={<ProtectedRouteElement
                element={<Profile onLogout={onLogout} updateUser={updateUser}
                                  updateUserMessage={updateUserMessage}/>}/>}/>
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
