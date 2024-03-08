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
        <Routes>
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Suspense>
      <div className="grid grid-cols-12 h-screen bg-background">
        <div className="col-span-3 text-text">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/managment"} element={<Managment />} />
              <Route path={"/rights"} element={<Rights />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}
