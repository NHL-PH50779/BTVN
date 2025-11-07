import { ToastContainer } from "react-toastify";
import AppRouter from "./Routers";

const App = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
};

export default App;
