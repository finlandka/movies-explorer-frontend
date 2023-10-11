import './search-form.css';
import React, {useEffect, useState} from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onFilter, storedFind, storedCheck }) {
  const [find, setFind] = useState(storedFind || '');
  const [isChecked, setIsChecked] = useState(storedCheck || false);

  useEffect(() => {
    storedFind !== undefined && setFind(storedFind);
    storedCheck !== undefined && setIsChecked(storedCheck);
  }, [storedFind, storedCheck]);

  function handleChangeMovie(e) {
    const newFind = e.target.value;
    setFind(newFind);
    storedFind !== undefined && localStorage.setItem('find', newFind);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFilter(find, isChecked);
  }

  function toggleCheck(isChecked) {
    onFilter(find, isChecked);
  }

  return (
    <section className="search-form">

      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__left">
          <div className="search-form__search-icon"></div>
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="movie"
            required
            defaultValue={storedFind !== undefined ? storedFind : find}
            onChange={handleChangeMovie}
          />
          <button className="search-form__button" type="submit"></button>
        </div>
        <FilterCheckbox onCheck={setIsChecked} storedCheck={isChecked} toggleCheck={toggleCheck} />
      </form>

    </section>
  );
}

export default SearchForm;