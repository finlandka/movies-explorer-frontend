import './register.css';
import React, { useCallback, useState } from "react";
import {Link} from "react-router-dom";

function Register({onRegister, registerError, resetRegisterError}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    return () => {
      resetRegisterError();
    };
  }, [resetRegisterError]);

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

  const handleChangePassword = useCallback(e => {
    setPassword(e.target.value);
    const isValid = e.target.validity.valid;
    setPasswordError(isValid ? '' : e.target.validationMessage);
  }, [])

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (nameError || emailError || passwordError) {
      return;
    }
    setIsLoading(true);
    onRegister(name, email, password)
      .finally(() => setIsLoading(false));
  }, [name, email, password, nameError, emailError, passwordError, onRegister])

  const isFormValid = name && email && password && !nameError && !emailError && !passwordError;

  return (
    <div className="register">
      <Link className="register__logo" to="/" title="Учебный проект"></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__label" htmlFor="registerName">Имя</label>
        <input
          id="registerName"
          className="register__input"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangeName}
          disabled={isLoading}
        />
        <p className="register__error">{nameError}</p>
        <label className="register__label" htmlFor="registerEmail">E-mail</label>
        <input
          id="registerEmail"
          className="register__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChangeEmail}
          pattern="[\w-]+@[\w-]*\.[a-z]*"
          disabled={isLoading}
        />
        <p className="register__error">{emailError}</p>
        <label className="register__label" htmlFor="registerPassword">Пароль</label>
        <input
          id="registerPassword"
          className="register__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="5"
          maxLength="15"
          value={password}
          onChange={handleChangePassword}
        />
        <p className="register__error">{passwordError}</p>
        <p className="register__error register__submit-error">{registerError}</p>
        <button className="register__button" type="submit" disabled={!isFormValid}>
          Зарегистрироваться
        </button>
        <p className="register__text">Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="register__link" title="Войти">Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;