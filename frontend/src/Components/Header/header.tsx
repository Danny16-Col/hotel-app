import { Link } from "react-router-dom";
import "./header.css";

//==== rutas de las paginas ====
function Header() {
  return (
    <header className="header">
        <h2>HotelApp</h2>
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
        </nav>
    </header>
  );
}

export default Header;
