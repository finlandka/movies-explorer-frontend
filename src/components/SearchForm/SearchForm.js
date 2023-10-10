import './search-form.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onFilter, storedFind, storedCheck }) {
  const [find, setFind] = React.useState(storedFind || '');
  const [isChecked, setIsChecked] = React.useState(storedCheck || false);

  React.useEffect(() => {
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
        <FilterCheckbox onCheck={setIsChecked} storedCheck={isChecked}/>
      </form>

    </section>
  );
}

export default SearchForm;