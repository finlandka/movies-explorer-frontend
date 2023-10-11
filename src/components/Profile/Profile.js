import './profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import React, {useCallback, useState} from "react";
import {Link} from "react-router-dom";

function Profile({onLogout, updateUser, updateUserMessage}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

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
    setIsLoading(true);
    updateUser({name: name, email: email})
      .finally(() => setIsLoading(false));
  }, [name, email, nameError, emailError, updateUser])

  const isFormValid = !nameError && !emailError;

  return (
    <section>
      <form className="profile" onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, {currentUser?.name}!</h1>
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
            value={name}
            onChange={handleChangeName}
            disabled={isLoading}
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
            value={email}
            onChange={handleChangeEmail}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            disabled={isLoading}
          ></input>
        </div>
        <ul className="profile__menu">
          <li>{updateUserMessage}</li>
          <li>
            <button className="profile__edit" type="submit" disabled={!isFormValid || (currentUser.name === name && currentUser.email === email)}>Редактировать</button>
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