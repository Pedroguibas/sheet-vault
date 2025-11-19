import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header.tsx";
import Login from "./components/pages/Login.tsx";
import Signin from "./components/pages/Signin.tsx";
import Home from "./components/pages/Home.tsx";

export type SessionType =
  | {
      userId: string;
      username: string;
      email: string;
    }
  | undefined;

export type SetSessionUpdateType = React.Dispatch<React.SetStateAction<number>>;

const App = () => {
  const [session, setSession] = useState<SessionType>();
  const [sessionUpdate, setSessionUpdate] = useState(0);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/session`,
          {
            withCredentials: true,
          }
        );

        setSession(data);
      } catch (e) {
        setSession(undefined);
      }
    };

    fetchSession();
  }, [sessionUpdate]);

  return (
    <>
      <Header session={session} setSessionUpdate={setSessionUpdate} />
      <Routes>
        <Route
          path="/login/"
          element={
            <Login session={session} setSessionUpdate={setSessionUpdate} />
          }
        />
        <Route
          path="/signin/"
          element={
            <Signin session={session} setSessionUpdate={setSessionUpdate} />
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
