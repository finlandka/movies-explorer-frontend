import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrap">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <nav className="footer__menu">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank"
             rel="noopener noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;