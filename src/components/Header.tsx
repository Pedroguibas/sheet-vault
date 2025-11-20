import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { SessionType, SetSessionUpdateType } from "../App.tsx";
import "../assets/css/Header.css";

type HeaderProps = {
  session: SessionType;
  setSessionUpdate: SetSessionUpdateType;
};

const Header = ({ session, setSessionUpdate }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setSessionUpdate((prev) => prev + 1);
  };

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
              <button
                onClick={() => handleClick("/minhasfichas/")}
                className="navbar-button"
              >
                Minhas Fichas
              </button>
            </li>
            <li className="navbar-item">
              <button className="navbar-button">Meu Perfil</button>
            </li>
            {session ? (
              <li className="navbar-item">
                <button onClick={handleLogout} className="outline-btn">
                  Sair
                </button>
              </li>
            ) : (
              <li className="navbar-item">
                <button
                  onClick={() => handleClick("/login")}
                  className="outline-btn"
                >
                  Entrar
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
