import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import type React from "react";
import type { SetSessionUpdateType } from "../../App";
import "../../assets/css/Login.css";

type LoginFormType = {
  user: string;
  password: string;
};

type LoginProps = {
  setSessionUpdate: SetSessionUpdateType;
};

const Login = ({ setSessionUpdate }: LoginProps) => {
  const [formdata, setFormdata] = useState<LoginFormType>({
    user: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev: LoginFormType) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleFocus = () => setInvalid(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        formdata,
        { withCredentials: true }
      );
      setSessionUpdate((prev) => prev + 1);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.status == 401) setInvalid(true);
      }
    }
  };

  return (
    <section className="login-section">
      <div className="login-form-container">
        <h1>Log-in</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-input-container">
            <label htmlFor="user" className="login-label">
              Usuário:
            </label>
            <input
              type="text"
              id="user"
              name="user"
              required
              className="login-input"
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>
          <div className="form-input-container">
            <label htmlFor="password" className="login-label">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="login-input"
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <p className={`form-warning ${invalid ? "invalid-input" : ""}`}>
              Usuário ou senha inválidos*
            </p>
          </div>
          <div className="submit-btn-container">
            <button className="outline-btn">Entrar</button>
          </div>
        </form>
        <p className="login-p">
          Não tem uma conta?{" "}
          <Link to="/signin/" className="link">
            Cadastre-se
          </Link>
          !
        </p>
      </div>
    </section>
  );
};

export default Login;
