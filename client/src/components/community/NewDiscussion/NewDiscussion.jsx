import { Modal } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createDiscussion } from "../../../Services/communityService";
import aiThaliaAPI from "../../../API/aiThaliaAPI";
import Loader from "../../../components/Loader/Loader1/Loader";

export default function NewDiscussion({
     openModal,
     setOpenModal,
     community,
     setDiscussion,
}) {
     const { user } = useSelector((state) => state.auth);
     const [content, setContent] = useState("");
     const [error, setError] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     async function onSubmit() {
          if (content && user && community) {
               const payload = {
                    user_id: user?._id,
                    community_id: community?._id,
                    content,
                    content_type: "TEXT",
               };
               setIsLoading(true);
               const isToxic = await aiThaliaAPI.post("/toxic", {
                    text: content,
               });
               if (isToxic.data.label === "toxic" && isToxic.data.score > 0.8) {
                    setIsLoading(false);
                    toast.warning("your post contains toxicity");
               } else {
                    setError("");
                    const response = await createDiscussion(payload);
                    setIsLoading(false);
                    if (response.discussion) {
                         toast.success("new discussion added");
                         setDiscussion((current) => [
                              response.discussion,
                              ...current,
                         ]);
                         setContent("");
                         setOpenModal(false);
                    }
               }
          } else {
               setError("Enter any content");
          }
     }

     return (
          <Modal
               show={openModal}
               size="xl"
               onClose={() => setOpenModal(false)}
               popup
          >
               <Modal.Body className="bg-gray-800 border text-white">
                    {isLoading ? (
                         <Loader />
                    ) : (
                         <>
                              <Modal.Header />
                              {error && (
                                   <span className="text-red-600 text-sm">
                                        {error}
                                   </span>
                              )}
                              <h1 className="text-xl font-medium mt-5">
                                   New Discussion
                              </h1>
                              <textarea
                                   name="content"
                                   id=""
                                   cols={60}
                                   rows={5}
                                   className="rounded-md bg-gray-700 my-5 text-sm"
                                   onChange={(e) => setContent(e.target.value)}
                                   value={content}
                              ></textarea>
                              <div className="btn-group flex gap-3">
                                   <button
                                        className="btn px-3 py-1 bg-red-600 hover:bg-red-800 rounded-md"
                                        onClick={() => {
                                             setError("");
                                             setContent("");
                                        }}
                                   >
                                        Clear
                                   </button>
                                   <button
                                        className="btn px-3 py-1 bg-primary hover:bg-primary-hover rounded-md"
                                        onClick={() => onSubmit()}
                                   >
                                        Submit
                                   </button>
                              </div>
                         </>
                    )}
               </Modal.Body>
          </Modal>
     );
}

NewDiscussion.propTypes = {
     openModal: PropTypes.bool.isRequired,
     setOpenModal: PropTypes.func.isRequired,
     community: PropTypes.object.isRequired,
     setDiscussion: PropTypes.func.isRequired,
};
