import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export default function Protect({ role }) {
  const { user } = useAppSelector((state) => state.auth);
  const token = Cookies.get("token");
  const isAuth = token && user && user.role === role;

  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
}

Protect.propTypes = {
  role: PropTypes.string.isRequired,
};
