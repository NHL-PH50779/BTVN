import AdminLayout from "../layout/adminLayout";
import CreateCourse from "../pages/Admin/Course/CreateCourse";
import ManagementCourse from "../pages/Admin/Course/ManagementCourse";
import CreateLesson from "../pages/Admin/Lession/CreateLesson";
import LessonList from "../pages/Admin/Lession/LessonList";
import ProtectedRoute from "./Protected/Protected";

const adminRoutes = [{
    path: "admin",
    element: (
        <ProtectedRoute>
            <AdminLayout />
        </ProtectedRoute>
    ),
    children: [
        { index: true, Component: ManagementCourse },
        { path: "course", Component: CreateCourse },
        { path: "courses", Component: ManagementCourse },
        { path: "course/update/:id", Component: CreateCourse },
        { path: "course/:id/lessons", Component: LessonList },
        { path: "course/:id/lessons/create", Component: CreateLesson },
        { path: "course/:id/lessons/update/:lessonId", Component: CreateLesson },
    ]

}]
export default adminRoutes