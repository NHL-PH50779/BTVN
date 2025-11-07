import { Navigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to={"/auth/login"} />;
  return children;
};

export default AuthProtected;
