import './not-found-page.css';
import {Link} from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <div>
          <h1 className="not-found-page__title">404</h1>
          <p className="not-found-page__desc">Страница не найдена</p>
        </div>
        <Link to="/" className="not-found-page__link">Назад</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;