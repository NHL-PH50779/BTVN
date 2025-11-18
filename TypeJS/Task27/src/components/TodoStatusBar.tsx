import { useAppSelector } from "../hooks";
import { selectTodos } from "../features/todos/todosSlice";

export default function TodoStatusBar() {
  const todos = useAppSelector(selectTodos);

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const uncompleted = total - completed;

  return (
    <div style={{ padding: 10, background: "#eee", marginBottom: 10 }}>
      Todo: Tổng {total} | Hoàn thành {completed} | Chưa hoàn thành {uncompleted}
    </div>
  );
}
