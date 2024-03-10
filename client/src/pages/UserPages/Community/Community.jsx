import AddCircle from "@mui/icons-material/AddCircle";
import "./Community.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
// import NewCommunity from "../../components/Modal/NewCommunity";
// import YourCommunity from "../../components/community/YourCommunity";
// import DiscoverCommunity from "../../components/community/DiscoverCommunity";
import { useNavigate, useParams } from "react-router-dom";
// import RecentDiscussions from "../../components/community/RecentDiscussions";
import NewCommunity from "../../../components/community/NewCommunity";

export default function Community() {
     const { tab } = useParams();
     const navigate = useNavigate();
     const [showSidebar, setShowSidebar] = useState("hidden");
     const [currentTab, setCurrentTab] = useState(tab.toUpperCase());
     const [showNewCommunity, setShowNewCommunity] = useState(false);
     return (
          <div className="bg-red-600">
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
               <h1>dhsfs</h1>
          </div>
     );
}
