import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Authenticate() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);
  useEffect(() => {
    if (parseUser?.role === "ADMIN") {
      navigate("/admin");
    } else if (parseUser?.role === "USER") {
      navigate("/home");
    }
  }, [parseUser, navigate]);
  return <>{!user ? <Outlet /> : null}</>;
}
