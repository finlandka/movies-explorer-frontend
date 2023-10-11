import './filter-checkbox.css';

function FilterCheckbox({ onCheck, storedCheck, toggleCheck }) {
  function handleChange(e) {
    const newCheck = e.target.checked;
    onCheck(newCheck);
    storedCheck !== undefined && localStorage.setItem('check', String(newCheck));
    toggleCheck(newCheck)
  }

  return (
    <div className="filter-checkbox">
      <input className="filter-checkbox__input" id="shortFilms" type="checkbox" name="short-films"
             onChange={handleChange} checked={storedCheck !== undefined && storedCheck}/>
      <label className="filter-checkbox__classic-label" htmlFor="shortFilms"></label>
      <span className="filter-checkbox__label">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;