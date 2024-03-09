import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const user = localStorage.getItem("user");
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogout) {
      dispatch(logout());
    }
  }, [isLogout, dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Are you sure!",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#951947",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLogout(true);
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between sticky z-40 top-0 w-full px-10 py-1 bg-gradient-to-r from-[#2d1525] to-background">
        <Link to={"/"}>
          <img src={Logo} className="w-24" alt="" />
        </Link>
        {user && (
          <button
            onClick={handleClick}
            className="text-text bg-secondary font-bold px-3 py-1 rounded-md"
          >
            Logout
          </button>
        )}
      </div>
      <div className="w-full h-[0.1px] z-40 bg-gray-800"></div>
    </>
  );
}
