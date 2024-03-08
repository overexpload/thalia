import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../components/Loader/Loader";

const Home = lazy(() => import("../pages/AdminPages/Home/Home"));
const Login = lazy(() => import("../pages/AdminPages/Login/Login"));
const Managment = lazy(() => import("../pages/AdminPages/Managment/Managment"));
const Rights = lazy(() => import("../pages/AdminPages/Rights/Rights"));
const Sidebar = lazy(() => import("../components/Sidebar/Sidebar"));

export default function AdminRoute() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Sidebar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/managment"} element={<Managment />} />
          <Route path={"/rights"} element={<Rights />} />
        </Routes>
      </Suspense>
    </>
  );
}
