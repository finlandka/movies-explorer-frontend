import './promo.css';
import bg from '../../images/promo_logo.png';

function Promo() {
  return (
    <section className="promo">
      <img className="promo__back" src={bg} alt="Практикум"/>
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;