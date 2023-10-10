import './App.css';
import React, {useEffect, useState, useCallback} from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";

import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import {filter} from "../../utils/filter";

import {CurrentUserContext} from '../../context/CurrentUserContext';
import {LoggedInContext} from '../../context/LoggedInContext';

import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
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
  const [likedMoviesIds, setLikedMoviesIds] = useState({ });
  const [storedFind, setStoredFind] = useState('');
  const [storedCheck, setStoredCheck] = useState(false);
  const [storedMovies, setStoredMovies] = useState([]);
  const history = useNavigate();

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
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const find = localStorage.getItem('find');
    const check = localStorage.getItem('check');
    const movies = localStorage.getItem('allMovies');
    const storedLikedMovies = localStorage.getItem('likedMovies');
    const storedLikedMoviesIds = localStorage.getItem('likedMoviesIds');

    if (find) setStoredFind(find);
    if (check) setStoredCheck(check === 'true');
    if (movies) setStoredMovies(JSON.parse(movies));
    if (storedLikedMovies) setLikedMovies(new Set(JSON.parse(storedLikedMovies)));
    if (storedLikedMoviesIds) setLikedMoviesIds(JSON.parse(storedLikedMoviesIds));
  }, [history]);

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
        localStorage.setItem('currentUser', JSON.stringify(result));
      })
      .catch(console.error);
  }

  function updateUser(data) {
    mainApi.setUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
        localStorage.setItem('currentUser', JSON.stringify(result));
      })
      .catch(console.error);
  }

  function onLogout() {
    setLoggedIn(false);
    setCurrentUser({});
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
        .catch(console.error);
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
        .catch(console.error);
    }
  };


  const getSaveMovies = useCallback(() => {
    mainApi.getMovies()
      .then(result => {
        setLikedMovies(new Set(result.map(movie => movie.movieId)));
        setSaveMovies(result);
        setDisplayedSaveMovies(result);
      })
      .catch(console.error)
  }, [])

  function findSavedMovies(find, check) {
    setDisplayedSaveMovies(filter(saveMovies, find, check));
  }

  function findMovies(find, check) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then(result => {
        const filteredMovies = filter(result, find, check);
        setAllMovies(filteredMovies);
        setIsLoading(false);
        localStorage.setItem('allMovies', JSON.stringify(filteredMovies));
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={{loggedIn, loading}}>
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

                />}/>}/>
              <Route path="/saved-movies" element={<ProtectedRouteElement element={
                <SavedMovies
                  displayedSaveFilms={displayedSaveMovies}
                  isLoading={isLoading}
                  onFilter={findSavedMovies}
                  handleCardLike={handleCardLike}
                  likedMovies={likedMovies}
                  getSaveMovies={getSaveMovies}
                />}/>}/>
              <Route path="/profile" element={<ProtectedRouteElement
                element={<Profile onLogout={onLogout} updateUser={updateUser}/>}/>}/>
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
