import {SHORT_FILM} from "./constants";

function filter(data, find, check) {
  const lowerFind = find.toLowerCase();
  const filteredMovies = data.filter(function (movie) {
    const lowerNameRU = movie.nameRU.toLowerCase();
    const lowerNameEN = movie.nameEN.toLowerCase();
    if (check) {
      return (lowerNameRU.includes(lowerFind) || lowerNameEN.includes(lowerFind)) && movie.duration <= SHORT_FILM
    } else {
      return lowerNameRU.includes(lowerFind) || lowerNameEN.includes(lowerFind)
    }
  })
  return filteredMovies;
}

export {filter};