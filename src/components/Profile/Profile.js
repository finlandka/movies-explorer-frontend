import './profile.css';
import {Link} from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Елена!</h2>
      <div className="profile__line">
        <p className="profile__row profile__row_title">Имя</p>
        <p className="profile__row">Елена</p>
      </div>
      <div className="profile__line">
        <p className="profile__row profile__row_title">E-mail</p>
        <p className="profile__row">pochta@yandex.ru</p>
      </div>
      <ul className="profile__menu">
        <li>
          <Link to="" className="profile__edit">Редактировать</Link>
        </li>
        <li>
          <Link to="/signout" className="profile__logout">Выйти из аккаунта</Link>
        </li>
      </ul>
    </section>
  );
}

export default Profile;