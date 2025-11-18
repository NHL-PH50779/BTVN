import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTodos, selectTodos } from "../features/todos/todosSlice";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (todos.length === 0) return <p>Không có công việc nào.</p>;

  return (
    <div>
      {todos.map((t) => (
        <TodoItem key={t._id} todo={t} />
      ))}
    </div>
  );
}
