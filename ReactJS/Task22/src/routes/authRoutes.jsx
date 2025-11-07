import React from "react";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import { Navigate } from "react-router-dom";

const authRoutes=[{
  
    children:[{index:true,element:<Navigate to={"/login"} />},
        {path:"register",Component:RegisterPage},
        {path:"login",Component:LoginPage}
    ]
}]
export default authRoutes