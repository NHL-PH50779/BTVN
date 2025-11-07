import { Component } from "react";
import ForbiddenPage from "../pages/client/ForbiddenPage.jsx";
import HomePage from "../pages/Client/HomePage";

const clientRoutes = [{
  children: [
    {path:"products",Component:HomePage},
    { path: "403", Component: ForbiddenPage }
  ]
}]
export default clientRoutes