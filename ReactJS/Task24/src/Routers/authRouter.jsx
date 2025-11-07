import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AuthLayout from "../Layout/AuthLayout";

const AuthRouter = [
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
];

export default AuthRouter;
