import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Login from "./components/pages/Login.tsx";

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/login/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
