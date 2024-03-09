import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../components/Loader/Loader1/Loader";
import Authenticate from "../components/Auth/Authenticate";
import Protect from "../components/Auth/Protect";

const Home = lazy(() => import("../pages/UserPages/Home/Home"));
const Signup = lazy(() => import("../pages/UserPages/Signup/Signup"));
const Login = lazy(() => import("../pages/UserPages/Login/Login"));
const MyMindPage = lazy(() =>
  import("../pages/UserPages/MyMindPage/MyMindPage")
);
const MyLawsPage = lazy(() =>
  import("../pages/UserPages/MyLawsPage/MyLawsPage")
);
const MyBodyPage = lazy(() =>
  import("../pages/UserPages/MyBodyPage/MyBodyPage")
);

export default function UserRoute() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Authenticate />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/login"} element={<Login />} />
          </Route>
          <Route element={<Protect role="USER" />}>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/my-mind"} element={<MyMindPage />} />
            <Route path={"/my-rights"} element={<MyLawsPage />} />
            <Route path={"/my-body"} element={<MyBodyPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
