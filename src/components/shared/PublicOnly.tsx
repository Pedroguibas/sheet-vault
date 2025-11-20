import { Navigate } from "react-router-dom";
import type { SessionType } from "../../App.tsx";
import type React from "react";

type PublicOnlyPropsType = {
  session: SessionType;
  children: React.ReactNode;
};

const PublicOnly = ({ session, children }: PublicOnlyPropsType) => {
  if (session) return <Navigate to="/" replace />;

  return children;
};

export default PublicOnly;
