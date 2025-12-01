import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo_ecoview.png";
import { FaUserAlt } from "react-icons/fa";

function Navbar({ closeMenuTrigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 👇 Fecha o menu automaticamente quando a rota mudar
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // 👇 Também fecha o menu se o App mandar (ex: após carregamento)
  useEffect(() => {
    if (closeMenuTrigger) setIsOpen(false);
  }, [closeMenuTrigger]);

  return (
    <nav className="navbar">
      {/* Botão de Hambúrguer */}
      <button
        className={`nav-btn menu-btn ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>

      {/* Logo */}
      <div className="nav-logo">
        <img src={logo} alt="EcoView Logo" />
      </div>

      {/* Botão de Usuário */}
      <Link to="/login" className="nav-btn user-btn">
        <FaUserAlt size={22} className="user-icon" />
      </Link>

      {/* Menu lateral */}
      <div className={`side-menu ${isOpen ? "show" : ""}`}>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/indicadores-info">Sobre os Indicadores</Link></li>
          <li><Link to="/relatorios">Relatórios</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
}

export default Navbar;

