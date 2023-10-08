import './profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import React, {useCallback, useState} from "react";
import {Link} from "react-router-dom";

function Profile({onLogout, updateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChangeName = useCallback(e => {
    setName(e.target.value);
    const isValid = e.target.validity.valid;
    setNameError(isValid ? '' : e.target.validationMessage);
  }, [])

  const handleChangeEmail = useCallback(e => {
    setEmail(e.target.value);
    const isValid = e.target.validity.valid;
    setEmailError(isValid ? '' : e.target.validationMessage);
  }, [])

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (nameError || emailError) {
      return;
    }
    updateUser({name: name, email: email});
  }, [name, email, nameError, emailError, updateUser])

  const isFormValid = !nameError && !emailError;

  return (
    <section>
      <form className="profile" onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="profile__line">
          <label htmlFor="profileName" className="profile__label">Имя</label>
          <input
            className="profile__input"
            id="profileName"
            name="name"
            placeholder="Имя"
            type="text"
            required
            minLength="2"
            maxLength="30"
            value={currentUser.name}
            onChange={handleChangeName}
          ></input>
        </div>
        <div className="profile__line">
          <label className="profile__label">E-mail</label>
          <input
            className="profile__input"
            id="profileEmail"
            name="email"
            placeholder="Email"
            type="email"
            required
            value={currentUser.email}
            onChange={handleChangeEmail}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          ></input>
        </div>
        <ul className="profile__menu">
          <li>
            <button className="profile__edit" type="submit" disabled={!isFormValid}>Редактировать</button>
          </li>
          <li>
            <Link to="/" className="profile__logout" onClick={onLogout}>Выйти из аккаунта</Link>
          </li>
        </ul>
      </form>
    </section>
  );
}

export default Profile;