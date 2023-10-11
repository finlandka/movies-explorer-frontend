import './not-found-page.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <div>
          <h1 className="not-found-page__title">404</h1>
          <p className="not-found-page__desc">Страница не найдена</p>
        </div>
        <button className="not-found-page__link" onClick={() => window.history.back()}>Назад</button>
      </div>
    </div>
  );
}

export default NotFoundPage;