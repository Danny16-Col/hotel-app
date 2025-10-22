import Hotels from "../Components/Hotels/hotels";
import Footer from "../Components/Footer/footer";
import "./home.css";

function Home() {
  return (
    <>
      <main className="home-container">
        <section className="hero-section">
          <h1 className="hero-title">¡Bienvenidos!</h1>
          <h2 className="hero-subtitle">Haz una reserva hacia tu felicidad ✨</h2>
          <p className="hero-description">
            Somos la única aplicación del mundo donde la prioridad eres tú.
            Explora múltiples hoteles de gran trayectoria, diseñados para ofrecerte
            la máxima comodidad y experiencias inolvidables.
          </p>
          <a href="#hotels" className="hero-btn">
            Explorar Hoteles
          </a>
        </section>

        <section id="hotels" className="hotels-section">
          <Hotels />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
