import './not-found-page.css';
import {Link} from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <h2 className="not-found-page__title">404</h2>
        <p className="not-found-page__desc">Страница не найдена</p>
        <Link to="/" className="not-found-page__link">Назад</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;