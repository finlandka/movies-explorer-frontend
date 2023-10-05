import './profile.css';
import {Link} from "react-router-dom";

function Profile() {
  return (
    <section>
      <form className="profile">
        <h1 className="profile__title">Привет, Елена!</h1>
        <div className="profile__line">
          <label htmlFor="profileName" className="profile__label">Имя</label>
          <input
            className="profile__input"
            id="profileName"
            name="name"
            placeholder="Елена"
            type="text"
            required
            minLength="2"
            maxLength="30"
          ></input>
        </div>
        <div className="profile__line">
          <label className="profile__label">E-mail</label>
          <input
            className="profile__input"
            id="profileEmail"
            name="email"
            placeholder="pochta@yandex.ru"
            type="email"
            required
          ></input>
        </div>
        <ul className="profile__menu">
          <li>
            <Link to="" className="profile__edit">Редактировать</Link>
          </li>
          <li>
            <Link to="/" className="profile__logout">Выйти из аккаунта</Link>
          </li>
        </ul>
      </form>
    </section>
  );
}

export default Profile;