import React from "react";
import { FaGithub, FaWhatsapp, FaEnvelope, FaCode } from "react-icons/fa";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer text-center text-light py-4">
      <div className="container">
        <h5 className="mb-3">Carlos Daniel Cortés Ríos</h5>
        <p className="mb-1">Ingeniero de Software</p>

        <div className="footer-icons my-3">
          <a
            href="mailto:carlosdacario@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Enviar correo"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/Danny16-Col"
            target="_blank"
            rel="noopener noreferrer"
            title="Mi GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://wa.me/573504686495"
            target="_blank"
            rel="noopener noreferrer"
            title="Enviar mensaje por WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="#"
            title="Desarrollador"
          >
            <FaCode />
          </a>
        </div>

        <p className="small text-secondary">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
