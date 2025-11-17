import "../assets/css/Header.css";

const Header = () => {
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
              <button className="outline-btn">Entrar</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
