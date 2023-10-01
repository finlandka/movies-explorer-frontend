import './filter-checkbox.css';

function FilterCheckbox() {
  return (
    <form className="filter-checkbox">
      <input className="filter-checkbox__input" id="shortFilms" type="checkbox" name="short-films"/>
      <label className="filter-checkbox__classic-label" htmlFor="shortFilms"></label>
      <span className="filter-checkbox__label">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;