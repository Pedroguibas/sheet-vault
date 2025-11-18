import { useNavigate } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  }

  return (
    <header>
      <div className="header-container">
        <button className="header-brand-container">
          <img
            src="/DnD-brand.webp"
            alt="Logo Dungeons and Dragons"
            className="header-brand"
          />
        </button>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <button className="navbar-button">Minhas Fichas</button>
            </li>
            <li className="navbar-item">
              <button className="navbar-button">Meu Perfil</button>
            </li>
            <li className="navbar-item">
              <button onClick={() => handleClick("/login")} className="outline-btn">Entrar</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
