import { Navigate } from "react-router-dom";
import type { SessionType } from "../../App.tsx";
import type React from "react";

type PrivateOnlyPropsType = {
  session: SessionType;
  children: React.ReactNode;
};

const PrivateOnly = ({ session, children }: PrivateOnlyPropsType) => {
  if (!session) return <Navigate to="/" replace />;

  return children;
};

export default PrivateOnly;
