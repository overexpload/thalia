import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

export default function Navbar() {
  return (
    <>
      <div className="flex sticky z-40 top-0 w-full px-10 py-1 bg-gradient-to-r from-[#2d1525] to-background">
        <Link to={"/"}>
          <img src={Logo} className="w-24" alt="" />
        </Link>
      </div>
      <div className="w-full h-[0.1px] z-40 bg-gray-800"></div>
    </>
  );
}
