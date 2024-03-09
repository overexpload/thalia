import "./App.css";
import { Routes, Route } from "react-router";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Nabar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/admin/*"} element={<AdminRoute />} />
        <Route path={"/*"} element={<UserRoute />} />
      </Routes>
      <ToastContainer stacked />
    </>
  );
}

export default App;
