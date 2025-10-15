import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
