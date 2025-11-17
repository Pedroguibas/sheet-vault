import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Login from "./components/pages/Login.tsx";
import Signin from "./components/pages/Signin.tsx";

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route path="/signin/" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
