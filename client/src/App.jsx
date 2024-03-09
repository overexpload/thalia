import "./App.css";
import { Routes, Route } from "react-router";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Nabar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protect from "./components/Auth/Protect";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Protect role="ADMIN"/>}>
          <Route path={"/admin/*"} element={<AdminRoute />} />
        </Route>
        <Route path={"/*"} element={<UserRoute />} />
      </Routes>
      <ToastContainer stacked />
    </>
  );
}

export default App;
