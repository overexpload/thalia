import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

export default function Navbar() {
  return (
    <>
      <div className="flex w-full px-10 py-1 bg-background">
        <Link to={"/"}>
          <img src={Logo} className="w-24" alt="" />
        </Link>
      </div>
      <div className="w-full h-[0.1px] bg-gray-700"></div>
    </>
  );
}
