import { Component } from "react";
import HomePage from "../pages/Client/HomePage";
import { Navigate } from "react-router-dom";
import ForbiddenPage from "../pages/Client/ForbiddenPage";
import LessonHome from "../pages/Client/LessonHome";

const clientRoutes = [{
  children: [

    { path: "courses", Component: HomePage },
    { path: "courses/:id/lessons", Component: LessonHome },


    { path: "403", Component: ForbiddenPage }
  ]
}]
export default clientRoutes