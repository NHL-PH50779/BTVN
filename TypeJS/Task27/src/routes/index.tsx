import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundePage from "../components/NotFoundePage";
import clientRoutes from "./clientRoutes";

let router = createBrowserRouter([
    ...clientRoutes,
    { path: "*", Component: NotFoundePage }
])

const AppRouter = () => {
    return (
    <div>
    <RouterProvider router={router} />
    </div>
    )
}
export default AppRouter