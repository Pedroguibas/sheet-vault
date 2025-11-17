import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Login.css";

type SigninFormType = {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

const Signin = () => {
  const [formdata, setFormdata] = useState<SigninFormType>({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev: SigninFormType) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formdata);
  };

  return (
    <section className="login-section">
      <div className="login-form-container">
        <h1>Cadastro</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-input-container">
            <label htmlFor="email" className="login-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="login-input"
              onChange={handleChange}
            />
          </div>
          <div className="form-input-container">
            <label htmlFor="user" className="login-label">
              Usuário:
            </label>
            <input
              type="text"
              id="user"
              name="username"
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
          <div className="form-input-container">
            <label htmlFor="confirm_password" className="login-label">
              Senha:
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              className="login-input"
              onChange={handleChange}
            />
          </div>
          <div className="submit-btn-container">
            <button className="outline-btn">Cadastrar</button>
          </div>
        </form>
        <p className="login-p">
          Já tem uma conta?{" "}
          <Link to="/signin/" className="link">
            Entre com ela
          </Link>
          !
        </p>
      </div>
    </section>
  );
};

export default Signin;
