import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../components/Loader/Loader";

const Home = lazy(() => import("../pages/UserPages/Home/Home"));

export default function UserRoute() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}
