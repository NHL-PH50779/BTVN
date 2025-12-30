import { Router } from "express";
import { createTodo, getTodo, getTodos, removeTodo, replaceTodo, updateTodo } from "../controllers/todo.controller.js";
import {todo} from "../schemas/todo.schema.js";
import validBodyRequest from "../middlewares/validBodyRequest.js";
import { check } from "zod";

const todoRoutes= Router();
todoRoutes.use(checkAuth)
todoRoutes.post("/", validBodyRequest(todo), createTodo);
todoRoutes.get("/", getTodos);
todoRoutes.get("/:id", getTodo);
todoRoutes.patch("/:id", replaceTodo);

todoRoutes.patch("/:id", updateTodo);
todoRoutes.delete("/:id", removeTodo);

export default todoRoutes;