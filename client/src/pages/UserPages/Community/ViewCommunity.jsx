import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import "./ViewCommunity.css";
import { useDispatch, useSelector } from "react-redux";
import {
     getCommunity,
     getDiscussions,
     getMyCommunity,
} from "../../../Services/communityService";
import DiscussionCard from "../../../components/community/DiscussionCard/DiscussionCard";
import { resetCommunity } from "../../../features/communitySlice";
import NewDiscussion from "../../../components/community/NewDiscussion/NewDiscussion";

export default function ViewCommunity() {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const [currentCommunity, setCurrentCommunity] = useState(null);
     const { user } = useSelector((state) => state.auth);
     const { id } = useParams();
     const [discussion, setDiscussion] = useState([]);
     const [showDropDown, setShowDropDown] = useState("hidden");
     const pagination = useRef(1);
     const { myCommunity, isSuccess, isError } = useSelector(
          (state) => state.community
     );
     const [newDiscussion, setNewDiscussion] = useState(false);
     const [member, setMember] = useState(null);

     async function fetchDiscussion() {
          if (currentCommunity) {
               const response = await getDiscussions(
                    currentCommunity._id,
                    pagination.current
               );
               if (response.discussions.length > 0) {
                    if (pagination.current === 1) {
                         setDiscussion(response.discussions);
                    } else {
                         setDiscussion([
                              ...discussion,
                              ...response.discussions,
                         ]);
                    }
               }
          }
     }

     useEffect(() => {
          if (currentCommunity) {
               fetchDiscussion();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [currentCommunity]);

     useEffect(() => {
          if (currentCommunity && user) {
               const member = currentCommunity.members.filter(
                    (member) => member.user_id === user?._id
               );
               setMember(member[0]);
          }
     }, [currentCommunity, user]);

     useEffect(() => {
          if (id) {
               (async () => {
                    const response = await getCommunity(id);
                    setCurrentCommunity(response.data.community);
               })();
          }
     }, [id]);

     useEffect(() => {
          dispatch(getMyCommunity());
     }, [dispatch]);
     useEffect(() => {
          dispatch(resetCommunity());
     }, [isSuccess, isError, dispatch]);

     //scroll handler
     useEffect(() => {
          const handleScroll = () => {
               const bodyHeight = document.body.clientHeight;
               const scrollHeight = window.scrollY;
               const innerHeight = window.innerHeight;
               const isAtBottom = bodyHeight - (scrollHeight + innerHeight) < 1;
               if (isAtBottom) {
                    if (discussion.length >= pagination.current * 10) {
                         pagination.current = pagination.current + 1;
                         fetchDiscussion();
                    }
               }
          };
          window.addEventListener("scroll", handleScroll);
          return () => {
               window.removeEventListener("scroll", handleScroll);
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [dispatch, discussion]);

     return (
          <section className="view-community grid grid-cols-12 relative text-text">
               <section
                    className={`col-span-12 ${showDropDown} sm:block sm:col-span-5 md:col-span-5 lg:col-span-3 z-20`}
                    onClick={() => setShowDropDown("hidden")}
               >
                    <div
                         className={`left-side-bar fixed bg-gray-900 w-full sm:w-auto 2xl:w-96  pt-5 px-3`}
                    >
                         <h1 className="mb-8 text-2xl">Community</h1>
                         <div
                              className="discover-community w-full bg-gray-800 py-3 rounded-md hover:bg-gray-700 cursor-pointer"
                              onClick={() => navigate("/community/discover")}
                         >
                              <h1 className="text-center">
                                   Discover Communities
                              </h1>
                         </div>

                         <h1 className="your-community text-lg my-5">
                              Your Communities
                         </h1>
                         {myCommunity &&
                              myCommunity.map((item, index) => {
                                   return (
                                        <div
                                             className={`community-choose-card mb-3 flex gap-3 overflow-hidden items-center ${
                                                  item._id !== id
                                                       ? "bg-gray-800"
                                                       : "bg-gray-700"
                                             } hover:bg-gray-700 p-1 px-2 rounded-md cursor-pointer`}
                                             key={index}
                                             onClick={() => {
                                                  navigate(
                                                       `/community/view/${item._id}`
                                                  );
                                             }}
                                        >
                                             <div className="icon w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg relative">
                                                  {item?.icon ? (
                                                       <img
                                                            src={item.icon}
                                                            alt=""
                                                       />
                                                  ) : (
                                                       <h1 className="text-xl">
                                                            {item?.community_name[0].toUpperCase()}
                                                       </h1>
                                                  )}
                                             </div>
                                             <div className="deatils">
                                                  <h1 className="text-lg">
                                                       {item.community_name}
                                                  </h1>
                                             </div>
                                        </div>
                                   );
                              })}
                    </div>
               </section>
               <section className="body col-span-12 sm:col-span-7 md:col-span-7 lg:col-span-9">
                    <header className="header flex justify-between shadow-lg p-2 px-5">
                         <div className="profile flex gap-3">
                              <div className="icon h-16 w-28  rounded-md flex items-center justify-center relative">
                                   {currentCommunity?.icon ? (
                                        <img
                                             src={currentCommunity.icon}
                                             alt=""
                                             className="h-14 w-14 rounded-md"
                                        />
                                   ) : (
                                        <h1 className="text-2xl bg-gray-700 px-8 py-3 rounded-md">
                                             {currentCommunity?.community_name[0].toUpperCase()}
                                        </h1>
                                   )}
                                   <button
                                        className="sm:hidden cursor-pointer btn absolute z-20 w-full h-full"
                                        onClick={() => setShowDropDown("block")}
                                   ></button>
                              </div>
                              <h1
                                   className="text-2xl"
                                   //    onClick={() => setOpenDrawer(true)}
                              >
                                   {currentCommunity?.community_name}
                              </h1>
                         </div>
                         {member && member.is_admin && (
                              <button
                                   className="text-2xl"
                                   //    onClick={() => setOpenNewRequest(true)}
                              >
                                   <FaUserPlus />
                              </button>
                         )}
                    </header>
                    <body className="container grid grid-cols-12 p-5">
                         <section className="discussion-section col-span-12 lg:col-span-8">
                              <div className="new-discusssion flex items-center gap-3">
                                   <div
                                        className="file-upload-button text-3xl text-primary "
                                        // onClick={() => setOpenMediaUpload(true)}
                                   >
                                        <FaFileCirclePlus />
                                   </div>
                                   <input type="hidden" />
                                   <button
                                        className="new-text-discussion-input w-5/6 h-12 rounded bg-gray-700 flex justify-start items-center px-3 text-slate-500"
                                        // onClick={() => setNewDiscussion(true)}
                                   >
                                        Write Something
                                   </button>
                                   <div className="send-icon">send</div>
                              </div>
                              <div
                                   className="discussions w-full flex flex-col items-center py-5 sm:p-5"
                                   //    ref={discussionRef}
                              >
                                   {discussion?.map((item, index) => {
                                        return (
                                             <DiscussionCard
                                                  discussion={item}
                                                  setDiscussion={setDiscussion}
                                                  key={index}
                                                  type={"DEFAULT"}
                                             />
                                        );
                                   })}
                              </div>
                         </section>
                         <div className="right-section hidden lg:block sm:col-span-4 bg-gray-900 p-5 rounded-md">
                              <h1 className="text-lg">About</h1>
                              <p className="text-sm py-2 pb-5">
                                   {currentCommunity?.about}
                              </p>

                              {currentCommunity?.privacy === "public" ? (
                                   <div className="">
                                        <h1 className="text-lg">Public</h1>
                                        <p className="text-sm py-2 pb-5">
                                             Everyone can see discussions
                                        </p>
                                   </div>
                              ) : (
                                   <div className="">
                                        <div className="flex items-center gap-2 text-lg">
                                             <RiGitRepositoryPrivateFill />
                                             <h1 className="text-lg">
                                                  Private
                                             </h1>
                                        </div>
                                        <p className="text-sm py-5">
                                             Only the members of this community
                                             are allowed to see discussions
                                        </p>
                                   </div>
                              )}
                              <h1 className="text-lg">Activity</h1>
                              <div className="analytics"></div>
                         </div>
                    </body>
               </section>
               <NewDiscussion
                    openModal={newDiscussion}
                    setOpenModal={setNewDiscussion}
                    community={currentCommunity}
                    setDiscussion={setDiscussion}
               />
               {/* <CommunityDrawer
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    community={currentCommunity}
                    setCommunity={setCurrentCommunity}
               />
               <NewRequest
                    openDrawer={openNewRequest}
                    setOpenDrawer={setOpenNewRequest}
                    community={currentCommunity}
                    setCommunity={setCurrentCommunity}
               />
               {currentCommunity && (
                    <MediaDiscussion
                         showUploadImage={openMediaUpload}
                         setshowUploadImage={setOpenMediaUpload}
                         community={currentCommunity._id}
                         setDiscussion={setDiscussion}
                    />
               )} */}
          </section>
     );
}
