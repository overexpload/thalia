import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import thaliaAPI from "../../../API/thaliaAPI";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";
import "./CommentCard.css";

export default function CommentCard({ comment, discussion_id }) {
     const [replys, setReplys] = useState([]);
     const [openReply, setOpenReply] = useState(false);
     const [newComment, setNewComment] = useState("");
     const [newReply, setNewReply] = useState(false);
     const [submit, setSubmit] = useState(false);

     useEffect(() => {
          if (openReply) {
               (async () => {
                    try {
                         const response = await thaliaAPI.get(
                              `/community/discussions/comment/reply/${comment._id}`
                         );
                         console.log(response);
                         if (response.data) {
                              setReplys(response.data.comment);
                         }
                    } catch (error) {
                         toast.error("error while fetching comments");
                    }
               })();
          }
     }, [openReply, comment]);

     function handleReply() {
          setOpenReply(true);
          setSubmit(true);
     }
     useEffect(() => {
          if (submit && openReply) {
               toast("reply");
               handleSubmit();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [openReply, submit, replys]);

     async function handleSubmit() {
          setSubmit(false);
          try {
               if (newComment) {
                    console.log(discussion_id);
                    const response = await thaliaAPI.post(
                         "/community/discussions/comment",
                         {
                              content: newComment,
                              discussion_id: discussion_id,
                              reply: comment._id,
                         }
                    );
                    if (response.data) {
                         setNewComment("");
                         setNewReply(false);
                         setReplys([...replys, response.data.comment]);
                    }
               }
          } catch (error) {
               console.log(error);
               toast.error("error while fetching comments");
          }
     }
     return (
          <section className="comment mt-5 pb-5 bg-gray-800">
               <div className="header flex gap-3 px-5 py-2  rounded-md">
                    <div className="profile-img-icon">
                         {comment?.user_details.profile_img ? (
                              <img
                                   src={comment?.user_details?.profile_img}
                                   alt=""
                                   style={{}}
                                   className="w-12 rounded-lg"
                              />
                         ) : (
                              <div className="profile-icon bg-gray-700 w-10 h-10 pe-1 flex justify-center items-center rounded-full">
                                   <span>
                                        {comment?.user_details?.email[0].toUpperCase()}
                                   </span>
                              </div>
                         )}
                    </div>
                    <div className="name">
                         <h1>{comment.user_details.username}</h1>
                         {/* <small className="text-xs text-slate-500">{`${date.getDay()} - ${
                       date.getMonth() + 1
                  } - ${date.getFullYear()}`}</small> */}
                    </div>
               </div>
               <div className="content p-5 bg-gray-800">
                    <span className="font-light">{comment.content}</span>
               </div>
               {newReply && (
                    <div className="add-comment flex items-center h-min my-3 px-2">
                         <input
                              type="text"
                              className="rounded-md add-comment-inp mr-2 bg-gray-800 w-1/2"
                              name="comment"
                              placeholder="Add your comment"
                              onChange={(e) => setNewComment(e.target.value)}
                         />
                         <div className="cursor-pointer" onClick={handleReply}>
                              <IoSend />
                         </div>
                    </div>
               )}
               <button
                    onClick={() => setOpenReply(!openReply)}
                    className="px-3 text-sm"
               >
                    {openReply ? "hide replies" : "View replies"}
               </button>
               <button
                    className="px-3 text-sm"
                    onClick={() => setNewReply(!newReply)}
               >
                    Reply
               </button>
               {openReply && (
                    <div className="replys m-5 ">
                         {replys &&
                              replys.map((reply, index) => {
                                   return (
                                        <div
                                             className="reply bg-gray-900 rounded-md mb-3"
                                             key={index}
                                        >
                                             <div className="header flex gap-3 px-5 py-2">
                                                  <div className="profile-img-icon">
                                                       {reply?.user_details
                                                            .profile_img ? (
                                                            <img
                                                                 src={
                                                                      reply
                                                                           ?.user_details
                                                                           ?.profile_img
                                                                 }
                                                                 alt=""
                                                                 style={{}}
                                                                 className="w-9 rounded-lg"
                                                            />
                                                       ) : (
                                                            <div className="profile-icon bg-gray-700 w-10 h-10 pe-1 flex justify-center items-center rounded-full">
                                                                 <span>
                                                                      {reply?.user_details?.email[0].toUpperCase()}
                                                                 </span>
                                                            </div>
                                                       )}
                                                  </div>
                                                  <div className="name">
                                                       <h1>
                                                            {
                                                                 reply
                                                                      .user_details
                                                                      .username
                                                            }
                                                       </h1>
                                                  </div>
                                             </div>
                                             <div className="content p-5 font-light">
                                                  {reply.content}
                                             </div>
                                        </div>
                                   );
                              })}
                    </div>
               )}
          </section>
     );
}

CommentCard.propTypes = {
     comment: PropTypes.array,
     discussion_id: PropTypes.string,
};
