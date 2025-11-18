import { Link } from "react-router-dom";
import "../../assets/css/Login.css";
import { useState } from "react";
import axios from "axios";
import type React from "react";

type LoginFormType = {
  user: string;
  password: string;
};

const Login = () => {
  const [formdata, setFormdata] = useState<LoginFormType>({
    user: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev: LoginFormType) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/login?user=${formdata.user}&password=${formdata.password}`)
    console.log(data);
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
            />
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
