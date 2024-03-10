import { FaComment } from "react-icons/fa";
import { ListGroup } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";
import PropTypes from "prop-types";
import thaliaAPI from "../../../API/thaliaAPI";

import {
     dislikeDiscussion,
     getComments,
     getCommunity,
     likeDiscussion,
} from "../../../Services/communityService";
import "./DiscussionCard.css";

import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import CommentCard from "../CommentCard/CommentCard";

export default function DiscussionCard({ discussion, type, setDiscussion }) {
     const [community, setCommunity] = useState(null);
     const [openList, setOpenList] = useState(false);
     const { user } = useSelector((state) => state.auth);
     const [isCommentOpen, setIsCommentOpen] = useState("hidden");
     const [comments, setComments] = useState([]);
     const [newComment, setNewComment] = useState("");

     useEffect(() => {
          if (discussion) {
               (async () => {
                    try {
                         ListGroup;
                         const response = await getCommunity(
                              discussion?.community_id
                         );
                         if (response.data.community) {
                              setCommunity(response.data.community);
                         }
                    } catch (error) {
                         toast.error("internal server error");
                    }
               })();
          }
     }, [discussion]);

     const handleDelete = () => {
          toast("delete");
     };

     const handleSubmitComment = async () => {
          const response = await thaliaAPI.post(
               "/community/discussions/comment",
               {
                    content: newComment,
                    discussion_id: discussion._id,
               }
          );
          if (response.data.success) {
               setComments([response.data.comment, ...comments]);
          }
     };

     const handleLike = async (id) => {
          const response = await likeDiscussion(id);
          if (response.data.success) {
               setDiscussion((current) =>
                    current.map((item) => {
                         if (item._id === id) {
                              item.likes = response.data.likedDiscussion.likes;
                         }
                         return item;
                    })
               );
          } else {
               toast.error("internal server error");
          }
     };
     const handleDislike = async (id) => {
          const response = await dislikeDiscussion(id);
          if (response.data.success) {
               setDiscussion((current) =>
                    current.map((item) => {
                         if (item._id === id) {
                              item.likes =
                                   response.data.dislikedDiscussion.likes;
                         }
                         return item;
                    })
               );
          } else {
               toast.error("internal server error");
          }
     };

     useEffect(() => {
          (async () => {
               const response = await getComments(discussion._id);
               if (response.data.comment) {
                    setComments(response.data.comment);
               } else {
                    toast.error("internal server error");
               }
          })();
     }, [discussion]);

     return (
          <section className="mb-5 bg-gray-900 w-full rounded-md p-2">
               <header className="header flex justify-between relative mb-5">
                    {type === "RECENT" ? (
                         <div className="profile-img flex gap-3 items-start cursor-pointer">
                              {community?.icon ? (
                                   <img
                                        src={community.icon}
                                        alt=""
                                        className="w-10 h-10 rounded-md"
                                   />
                              ) : (
                                   community?.community_name && (
                                        <div className="profile-icon bg-gray-700 w-10 h-10 pe-1 flex justify-center items-center rounded-full">
                                             <span className="text-2xl font-bold">
                                                  {community.community_name[0].toUpperCase()}
                                             </span>
                                        </div>
                                   )
                              )}
                              <div
                                   className="user-name"
                                   style={{ lineHeight: ".5" }}
                              >
                                   <h1 className="text-lg">
                                        {community?.community_name}
                                   </h1>
                                   <span
                                        className=""
                                        style={{ fontSize: "10px" }}
                                   >
                                        Posted by @
                                        {discussion.userProfile.username}
                                   </span>
                              </div>
                         </div>
                    ) : (
                         <div className="profile-img flex gap-3">
                              {discussion.userProfile.profile_img ? (
                                   <img
                                        src={
                                             discussion.userProfile?.profile_img
                                        }
                                        alt=""
                                        className="w-10 h-10 rounded-md"
                                   />
                              ) : (
                                   <div className="profile-icon">
                                        <span>
                                             {discussion.userProfile.email[0].toUpperCase()}
                                        </span>
                                   </div>
                              )}
                              <div className="user-name">
                                   <h1 className="text-lg">
                                        {discussion.userProfile.username}
                                   </h1>
                              </div>
                         </div>
                    )}
                    <div
                         className="btn cursor-pointer"
                         onClick={() => setOpenList(!openList)}
                    >
                         <button className="text-2xl">
                              <PiDotsThreeOutlineVerticalBold />
                         </button>
                    </div>
                    {openList && (
                         <div className="absolute right-0 top-8">
                              <ListGroup className="w-48">
                                   {discussion.user_id === user?._id ? (
                                        <ListGroup.Item onClick={handleDelete}>
                                             Delete
                                        </ListGroup.Item>
                                   ) : (
                                        <ListGroup.Item>Report</ListGroup.Item>
                                   )}
                              </ListGroup>
                         </div>
                    )}
               </header>
               <div className="content py-5">
                    {discussion.content_type === "TEXT" ? (
                         <p>{discussion.content}</p>
                    ) : (
                         <>
                              <p className="my-3 text-slate-200">
                                   {discussion.caption}
                              </p>
                              <img src={discussion.content} alt="" />
                         </>
                    )}
               </div>
               <div className="footer flex items-center gap-4 mt-3">
                    <div className="like-section flex items-center gap-3 text-sm">
                         {discussion.likes.includes(user?._id) ? (
                              <div
                                   className="dislike-button text-accent text-2xl"
                                   onClick={() => handleDislike(discussion._id)}
                              >
                                   <FaHeart />
                              </div>
                         ) : (
                              <div
                                   className="like-button text-2xl"
                                   onClick={() => handleLike(discussion._id)}
                              >
                                   <IoMdHeartEmpty />
                              </div>
                         )}
                         {discussion.likes.length} likes
                    </div>
                    <div className="comment text-xl text-accent flex items-center gap-4 cursor-pointer">
                         <FaComment />
                         <div
                              className="text-sm text-white"
                              onClick={() => {
                                   if (isCommentOpen === "hidden") {
                                        setIsCommentOpen("block");
                                   } else {
                                        setIsCommentOpen("hidden");
                                   }
                              }}
                         >
                              {discussion.comments} comments
                         </div>
                    </div>
               </div>
               <div className={`comments-container ${isCommentOpen} py-5`}>
                    <h2 className="font-bold text-xl">comments</h2>
                    <div className="add-comment flex items-center h-min my-3 px-2">
                         <input
                              type="text"
                              className="rounded-md add-comment-inp mr-2 bg-gray-800 w-full"
                              name="comment"
                              placeholder="Add your comment"
                              onChange={(e) => setNewComment(e.target.value)}
                         />
                         <div
                              className="cursor-pointer"
                              onClick={handleSubmitComment}
                         >
                              <IoSend />
                         </div>
                    </div>
                    {comments.map((item, index) => {
                         return (
                              <CommentCard
                                   key={index}
                                   comment={item}
                                   discussion_id={discussion._id}
                              />
                         );
                    })}
               </div>
          </section>
     );
}

DiscussionCard.propTypes = {
     discussion: PropTypes.object,
     type: PropTypes.string,
     setDiscussion: PropTypes.func,
};
