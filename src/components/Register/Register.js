import './register.css';
import {Link} from "react-router-dom";

function Register() {
  return (
    <div className="register">
      <Link className="header__logo" to="/" title="Учебный проект"></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <label className="register__label" htmlFor="registerName">Имя</label>
        <input
          id="registerName"
          className="register__input"
          type="text"
          name="name"
          placeholder="Имя"
          required
        />
        <label className="register__label" htmlFor="registerEmail">E-mail</label>
        <input
          id="registerEmail"
          className="register__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <label className="register__label" htmlFor="registerPassword">Пароль</label>
        <input
          id="registerPassword"
          className="register__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <div className="register__error">Что-то пошло не так...</div>
        <button className="register__button" type="submit">
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