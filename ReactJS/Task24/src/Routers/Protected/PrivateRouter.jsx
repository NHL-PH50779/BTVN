import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  console.log(user);
  if (!token) {
    return <Navigate to={"/auth/login"} />;
  }
  if (!role) {
    return <Navigate to={"/auth/login"} />;
  }
  return children;
};

export default PrivateRouter;
