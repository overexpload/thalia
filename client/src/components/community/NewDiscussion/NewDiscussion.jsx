import { Modal } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createDiscussion } from "../../../Services/communityService";
import aiThaliaAPI from "../../../API/aiThaliaAPI";

export default function NewDiscussion({
     openModal,
     setOpenModal,
     community,
     setDiscussion,
}) {
     const { user } = useSelector((state) => state.auth);
     const [content, setContent] = useState("");
     async function onSubmit() {
          if (content && user && community) {
               const payload = {
                    user_id: user?._id,
                    community_id: community?._id,
                    content,
                    content_type: "TEXT",
               };
               const isToxic = await aiThaliaAPI.post("/toxic", {
                    text: content,
               });
               if (isToxic.label === "toxic" && isToxic.score > 0.8) {
                    console.log("hai");
               }
               const response = await createDiscussion(payload);
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
     }
     return (
          <Modal
               show={openModal}
               size="xl"
               onClose={() => setOpenModal(false)}
               popup
          >
               <Modal.Body className="bg-gray-800 border text-white">
                    <Modal.Header />
                    <h1 className="text-xl font-medium">New Discussion</h1>
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
                              onClick={() => setContent("")}
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
