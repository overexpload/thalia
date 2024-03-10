import { useNavigate } from "react-router-dom";
import Community from "../../assets/Community.svg";
export default function CommunityCard() {
     const navigate = useNavigate();
     return (
          <div
               className="text-text flex flex-col items-center justify-center px-28 md:px-12 py-12 rounded-lg cursor-pointer hover:bg-secondary hover:text-primary bg-primary/[0.12]"
               onClick={() => navigate("/community/recent_discussions")}
          >
               <img src={Community} className="w-28" alt="" />
               <h1 className="font-bold">Community</h1>
          </div>
     );
}
