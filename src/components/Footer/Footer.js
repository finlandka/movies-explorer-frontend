import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrap">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <ul className="footer__menu">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank"
               rel="noopener noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;