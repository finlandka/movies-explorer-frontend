import './search-form.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__form-section">
        <form className="search-form__form">
          <div className="search-form__search-icon"></div>
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="movie"
            required
          />
          <button className="search-form__button" type="submit"></button>
        </form>
        <FilterCheckbox/>
      </div>
    </div>
  );
}

export default SearchForm;