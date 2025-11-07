import ClientLayout from "../Layout/ClientLayout";
import AddProjects from "../Page/Tasks/AddPTask";
import EditProjects from "../Page/Projects/EditProjects";
import HomeProjects from "../Page/Projects/HomeProjects";
import PrivateRouter from "./Protected/PrivateRouter"; // Import
import HomeTask from "../Page/Tasks/HomeTask";
import AddPTask from "../Page/Tasks/AddPTask";
import EditTask from "../Page/Tasks/EditTask";

const ClientRouter = [
  {
    path: "/",
    element: (
      <PrivateRouter allowedRoles={["admin", "user","student"]}>
        <ClientLayout />
      </PrivateRouter>
    ),
    children: [
      { index: true, element: <HomeProjects /> },
      { path: "add", element: <AddProjects /> },
      { path: "edit/:id", element: <EditProjects /> },
      { path: "tasks/:projectId", element: <HomeTask /> },
      { path: "tasks/add", element: <AddPTask /> },
      { path: "tasks/edit/:id", element: <EditTask /> },
    ],
  },
];

export default ClientRouter;
