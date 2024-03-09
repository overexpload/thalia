import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../components/Loader/Loader1/Loader";

const Home = lazy(() => import("../pages/AdminPages/Home/Home"));
const Managment = lazy(() => import("../pages/AdminPages/Managment/Managment"));
const Rights = lazy(() => import("../pages/AdminPages/Rights/Rights"));
const Sidebar = lazy(() => import("../components/Sidebar/Sidebar"));
const MyBody = lazy(() => import("../pages/AdminPages/MyBody/MyBody"));

export default function AdminRoute() {
  return (
    <>
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
              <Route path={"/body"} element={<MyBody />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}
