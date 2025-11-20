import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { SetSessionUpdateType } from "../../App";
import "../../assets/css/Login.css";

type SigninFormType = {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

type SigninFormValidationType = {
  email: boolean;
  username: boolean;
  password: boolean;
  confirm_password: boolean;
};

type SigninProps = {
  setSessionUpdate: SetSessionUpdateType;
};

const Signin = ({ setSessionUpdate }: SigninProps) => {
  const [formdata, setFormdata] = useState<SigninFormType>({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [formValidation, setFormValidation] =
    useState<SigninFormValidationType>({
      email: false,
      username: false,
      password: false,
      confirm_password: false,
    });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormValidation((prev) => ({
      ...prev,
      [e.target.name]: false,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev: SigninFormType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkExists = async (field: string, value: string) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${field}?${field}=${value}`
    );
    return !!data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // realiza as duas cehcagens simultâneamente
    const [emailExists, usernameExists] = await Promise.all([
      checkExists("email", formdata.email),
      checkExists("username", formdata.username),
    ]);

    if (emailExists) {
      valid = false;
      setFormValidation((prev) => ({
        ...prev,
        email: true,
      }));
    }

    if (usernameExists) {
      valid = false;
      setFormValidation((prev) => ({
        ...prev,
        username: true,
      }));
    }

    if (formdata.password != formdata.confirm_password) {
      setFormValidation((prev) => ({
        ...prev,
        confirm_password: true,
      }));
      valid = false;
    }

    if (valid) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          formdata
        );

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/login`,
          {
            user: formdata.username,
            password: formdata.password,
          },
          {
            withCredentials: true,
          }
        );
        setSessionUpdate((prev) => prev + 1);
      } catch (e) {
        window.alert(`Erro ao criar a conta: ${e}`);
      }
    }
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
              onFocus={handleFocus}
            />
            <p
              className={`form-warning ${
                formValidation.email ? "invalid-input" : ""
              }`}
            >
              Email já cadastrado*
            </p>
          </div>
          <div className="form-input-container">
            <label htmlFor="user" className="login-label">
              Username:
            </label>
            <input
              type="text"
              id="user"
              name="username"
              required
              className="login-input"
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <p
              className={`form-warning ${
                formValidation.username ? "invalid-input" : ""
              }`}
            >
              Username já cadastrado*
            </p>
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
          </div>
          <div className="form-input-container">
            <label htmlFor="confirm_password" className="login-label">
              Confirme sua senha:
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              className="login-input"
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <p
              className={`form-warning ${
                formValidation.confirm_password ? "invalid-input" : ""
              }`}
            >
              As senhas não conferem*
            </p>
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
