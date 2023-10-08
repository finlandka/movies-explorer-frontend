import './filter-checkbox.css';

function FilterCheckbox({onCheck, storedCheck}) {
  function handleChange(e) {
    const newCheck = e.target.checked;
    onCheck(newCheck);
    localStorage.setItem('check', String(newCheck));
  }

  return (
    <div className="filter-checkbox">
      <input className="filter-checkbox__input" id="shortFilms" type="checkbox" name="short-films" onChange={handleChange} checked={storedCheck}/>
      <label className="filter-checkbox__classic-label" htmlFor="shortFilms"></label>
      <span className="filter-checkbox__label">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;