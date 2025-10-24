import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import TodosPage from "./pages/TodosPage";
import ImportantPage from "./pages/ImportantPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import FormTodo from "./pages/FormTodo";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./Router/PrivateRoute";
import AuthRoute from "./Router/AuthRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route element={<MainLayout />}>
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodosPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/important"
            element={
              <PrivateRoute>
                <ImportantPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/todos/:id"
            element={
              <PrivateRoute>
                <TodoDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/todos/:id/edit"
            element={
              <PrivateRoute>
                <FormTodo mode="update" />
              </PrivateRoute>
            }
          />
          <Route
            path="/todos/create"
            element={
              <PrivateRoute>
                <CreateTodoPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;