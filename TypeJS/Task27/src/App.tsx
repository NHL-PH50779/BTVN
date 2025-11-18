import AddTodo from "../src/components/AddTodo";
import TodoList from "../src/components/TodoList";
import TodoStatusBar from "../src/components/TodoStatusBar";

export default function App() {
  return (
    <div style={{ width: 600, margin: "30px auto" }}>
      <h2>Todo App – Redux Toolkit + TypeScript</h2>
      <TodoStatusBar />
      <AddTodo />
      <TodoList />
    </div>
  );
}
