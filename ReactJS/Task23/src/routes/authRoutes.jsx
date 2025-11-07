import React from "react";

import { Navigate } from "react-router-dom";
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/loginPage";

const authRoutes=[{
  
    children:[{index:true,element:<Navigate to={"/login"} />},
        {path:"register",Component:RegisterPage},
        {path:"login",Component:LoginPage}
    ]
}]
export default authRoutes