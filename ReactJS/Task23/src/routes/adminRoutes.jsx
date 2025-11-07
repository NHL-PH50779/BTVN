import AdminLayout from "../layouts/admin/adminLayout";
import CreateCategory from "../pages/admin/CreateCategory";
import CreateProduct from "../pages/admin/CreateProduct";
import ManagementCategory from "../pages/admin/ManagementCategory";
import ManagementProduct from "../pages/admin/ManagementProduct";
import ProtectedRoute from "./Protected/Protected";

const adminRoutes = [
    {
        path: "admin",
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, Component: ManagementProduct },
            { path: "products", Component: ManagementProduct },
            { path: "products/create", Component: CreateProduct },
            { path: "products/update/:id", Component: CreateProduct },
            { path: "categories", Component: ManagementCategory },
            { path: "categories/create", Component: CreateCategory },
            { path: "categories/update/:id", Component: CreateCategory },
        ],
    },
];

export default adminRoutes;
