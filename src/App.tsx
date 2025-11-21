import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import PublicOnly from "./components/shared/PublicOnly.tsx";
import PrivateOnly from "./components/shared/PrivateOnly.tsx";
import Header from "./components/Header.tsx";
import Login from "./components/pages/Login.tsx";
import Signin from "./components/pages/Signin.tsx";
import Home from "./components/pages/Home.tsx";
import MySheet from "./components/pages/MySheets.tsx";
import Sheet from "./components/pages/Sheet.tsx";

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
      <main>
        <Routes>
          <Route
            path="/login/"
            element={
              <PublicOnly session={session}>
                <Login setSessionUpdate={setSessionUpdate} />
              </PublicOnly>
            }
          />
          <Route
            path="/signin/"
            element={
              <PublicOnly session={session}>
                <Signin setSessionUpdate={setSessionUpdate} />
              </PublicOnly>
            }
          />
          <Route
            path="/minhasfichas/"
            element={
              <PrivateOnly session={session}>
                <MySheet session={session} />
              </PrivateOnly>
            }
          />
          <Route
            path="/ficha/"
            element={
              <PrivateOnly session={session}>
                <Sheet session={session} />
              </PrivateOnly>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
