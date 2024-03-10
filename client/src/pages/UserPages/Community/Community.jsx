import AddCircle from "@mui/icons-material/AddCircle";
import "./Community.css";
// import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
// import NewCommunity from "../../components/Modal/NewCommunity";
// import YourCommunity from "../../components/community/YourCommunity";
// import DiscoverCommunity from "../../components/community/DiscoverCommunity";
import { useNavigate, useParams } from "react-router-dom";
// import RecentDiscussions from "../../components/community/RecentDiscussions";
import NewCommunity from "../../../components/community/NewCommunity";
import RecentDiscussions from "../../../components/community/RecentDiscussions/RecentDiscussions";
import YourCommunity from "../../../components/community/YourCommunity/YourCommunity";
import DiscoverCommunity from "../../../components/community/DiscoverCommunity/DiscoverCommunity";

export default function Community() {
     const { tab } = useParams();
     const navigate = useNavigate();
     const [showSidebar, setShowSidebar] = useState("hidden");
     const [currentTab, setCurrentTab] = useState(tab.toUpperCase());
     const [showNewCommunity, setShowNewCommunity] = useState(false);
     return (
          <div className="community bg-background">
               <NewCommunity
                    showModal={showNewCommunity}
                    setShowModal={setShowNewCommunity}
               />
               {/* <div className="flex gap-2 col-span-12">
                    <button
                         className="p-2 sm:hidden  flex rounded-sm mb-3"
                         onClick={() =>
                              setShowSidebar(
                                   showSidebar === "block" ? "hidden" : "block"
                              )
                         }
                    >
                         <MenuIcon />
                    </button>
                    <h1
                         className={`${
                              showSidebar === "block" ? "hidden" : "block"
                         } sm:hidden text-xl mt-2`}
                    >
                         Community
                    </h1>
               </div> */}
               <section
                    className={`sidebar fixed bg-background h-screen sm:w-96 text-text flex flex-col p-5 py-8 ${showSidebar} sm:block`}
               >
                    <h1 className="text-2xl mb-10">Community</h1>
                    {/* <div className="search my-5">
                         <input
                              type="text"
                              placeholder="search communities"
                              className="bg-gray-800 rounded-md w-full"
                         />
                    </div> */}
                    <div
                         className="nav flex flex-col gap-3"
                         onClick={() =>
                              setShowSidebar(
                                   showSidebar === "block" ? "hidden" : "block"
                              )
                         }
                    >
                         <div
                              className={`item hover:bg-gray-800 ${
                                   currentTab === "RECENT_DISCUSSIONS" &&
                                   "bg-gray-800"
                              }  rounded-md p-5 py-3`}
                              onClick={() => {
                                   setCurrentTab("RECENT_DISCUSSIONS");
                                   navigate("/community/recent_discussions");
                              }}
                         >
                              <h2 className="text-lg">Recent Discussions</h2>
                         </div>
                         <div
                              className={`item hover:bg-gray-800 ${
                                   currentTab === "DISCOVER" && "bg-gray-800"
                              }  rounded-md p-5 py-3`}
                              onClick={() => {
                                   setCurrentTab("DISCOVER");
                                   navigate("/community/discover");
                              }}
                         >
                              <h2 className="text-lg">Discover</h2>
                         </div>
                         <div
                              className={`item hover:bg-gray-800 ${
                                   currentTab === "YOUR_COMMUNITY" &&
                                   "bg-gray-800"
                              }  rounded-md p-5 py-3`}
                              onClick={() => {
                                   setCurrentTab("YOUR_COMMUNITY");
                                   navigate("/community/your_community");
                              }}
                         >
                              <h2 className="text-lg">Your Community</h2>
                         </div>
                    </div>
                    <div className="new-community mt-7 px-5 py-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-md">
                         <button
                              className="text-lg flex gap-3"
                              onClick={() => setShowNewCommunity(true)}
                         >
                              <div className="text-primary">
                                   <AddCircle />
                              </div>
                              Community
                         </button>
                    </div>
               </section>
               <section className="page-body">
                    {currentTab === "RECENT_DISCUSSIONS" ? (
                         <RecentDiscussions />
                    ) : currentTab === "YOUR_COMMUNITY" ? (
                         <YourCommunity />
                    ) : currentTab === "DISCOVER" ? (
                         <DiscoverCommunity />
                    ) : null}
               </section>
          </div>
     );
}
