import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "./layouts/MainLayout";
import TodosPage from "./pages/TodosPage";
import ImportantPage from "./pages/ImportantPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateTodoPage from "./pages/CreateTodoPage"
import FormTodo from "./pages/CreateTodoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route element={<HomeLayout />}>
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/important" element={<ImportantPage />} />
          <Route path="/todos/:id" element={<TodoDetailPage />} />
          <Route path="/todos/:id/edit" element={<FormTodo mode="update" />} />
          <Route path="/todos/create" element={<CreateTodoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
