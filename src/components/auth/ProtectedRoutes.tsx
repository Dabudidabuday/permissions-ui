import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading = false } = useContext(AuthContext);

  if(isLoading) return <CircularProgress/>
  if (!user) return <Navigate to="/login" />;

  return children;
};
