import "./App.css";
import { Routes, Route } from "react-router";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Nabar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/admin"} element={<AdminRoute />} />
        <Route path={"/"} element={<UserRoute />} />
      </Routes>
    </>
  );
}

export default App;
