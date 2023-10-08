import './login.css';
import React, { useCallback, useState } from "react";
import {Link} from "react-router-dom";

function Login({onLogin, loginError}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChangeEmail = useCallback(e => {
    setEmail(e.target.value);
    const isValid = e.target.validity.valid;
    setEmailError(isValid ? '' : e.target.validationMessage);
  }, [])

  const handleChangePassword = useCallback(e => {
    setPassword(e.target.value);
    const isValid = e.target.validity.valid;
    setPasswordError(isValid ? '' : e.target.validationMessage);
  }, [])

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    onLogin(email, password);
  }, [email, password, emailError, passwordError, onLogin])

  const isFormValid = !emailError && !passwordError;

  return (
    <div className="login">
      <Link className="login__logo" to="/" title="Учебный проект"></Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="loginEmail">E-mail</label>
        <input
          id="loginEmail"
          className="login__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChangeEmail}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <p className="login__error">{emailError}</p>
        <label className="login__label" htmlFor="loginPassword">Пароль</label>
        <input
          id="loginPassword"
          className="login__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="5"
          maxLength="15"
          value={password}
          onChange={handleChangePassword}
        />
        <p className="login__error">{passwordError}</p>
        <p className="login__error login__submit-error">{loginError}</p>
        <button className="login__button" type="submit" disabled={!isFormValid}>
          Войти
        </button>
        <p className="login__text">Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link" title="Регистрация">Регистрация</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;