import Todo from "../models/Todo.js";
import { todo } from "../schemas/todo.schema.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";

export const createTodo = handleAsync(async (req, res) => {
  const data = await Todo.create(req.body);
  createResponse(res, 201, "Create successfully!", data);

});

export const getTodo = handleAsync(async (req, res) => {
  const data = await Todo.findById(req.params.id);
  if (!data) {
    return createError(res, 400, "Not found");
  }
  createResponse(res, 200, "Successfully!", data);
});
export const getTodos = handleAsync(async (req, res) => {
  const data = await Todo.find();
  if (!data) {
    return createError(res, 404, "Not found");
  }
  createResponse(res, 200, "Successfully!", data);
});


export const updateTodo = handleAsync(async (req, res) => {
  const data = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  createResponse(res, 200, "Update successfully!", data);
});

export const removeTodo = handleAsync(async (req, res) => {
  const data = await Todo.findByIdAndDelete(req.params.id);
  console.log(data);
  if (!data) {
    return createError(res, 400, "Not found");
  }
  return createResponse(res, 200, "Remove successfully!", data);
});

export const replaceTodo = handleAsync(async (req, res) => {
  const data = await Todo.findOneAndReplace(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!data) {
    return createError(res, 400, "Not found");
  }
  return createResponse(res, 200, "Replace successfully!", data);
});






