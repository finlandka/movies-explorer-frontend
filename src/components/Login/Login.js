import './login.css';
import {Link} from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <Link className="header__logo" to="/" title="Учебный проект"></Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__label" htmlFor="loginEmail">E-mail</label>
        <input
          id="loginEmail"
          className="login__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <label className="login__label" htmlFor="loginPassword">Пароль</label>
        <input
          id="loginPassword"
          className="login__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <div className="login__error">Что-то пошло не так...</div>
        <button className="login__button" type="submit">
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