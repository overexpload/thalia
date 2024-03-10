import { Modal } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { newCommunity } from "../../Services/communityService";
import { useDispatch } from "react-redux";

export default function NewCommunity({ showModal, setShowModal }) {
     const dispatch = useDispatch();
     const [error, setError] = useState("");
     const [formData, setFormData] = useState({
          community_name: "",
          privacy: "public",
          about: "",
     });

     function handleChange(e) {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     }

     async function handleSubmit() {
          if (formData.community_name) {
               setError("");
               dispatch(newCommunity(formData));
          } else if (!formData.community_name) {
               setError("Please select a name");
          }
     }
     return (
          <>
               <Modal
                    show={showModal}
                    size="2xl"
                    onClose={() => {
                         setError("");
                         setShowModal(false);
                    }}
                    popup
               >
                    <Modal.Header>
                         <div className="p-4">New Community</div>
                    </Modal.Header>
                    <Modal.Body>
                         {error && (
                              <small className="text-sm text-red-600">
                                   {error}
                              </small>
                         )}
                         <div className="input-group flex flex-col">
                              <label htmlFor="" className="font-medium">
                                   Community Name
                              </label>
                              <input
                                   type="text"
                                   name="community_name"
                                   id=""
                                   className="rounded-md"
                                   onChange={handleChange}
                              />
                         </div>
                         <div className="flex gap-3 w-full justify-between">
                              <div className="input-group flex flex-col mt-5 mb-5 w-full">
                                   <label htmlFor="" className="font-medium">
                                        Privacy
                                   </label>
                                   <select
                                        name="privacy"
                                        id=""
                                        className="rounded-md"
                                        onChange={handleChange}
                                   >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                   </select>
                              </div>
                         </div>
                         <div className="input-group flex flex-col mt-5">
                              <label htmlFor="" className="font-medium">
                                   About
                              </label>
                              <textarea
                                   name="about"
                                   id=""
                                   className="rounded-md"
                              />
                         </div>

                         <div className="btn py-5">
                              <button
                                   className="btn px-5 py-1 bg-red-700 hover:bg-red-500 rounded-md text-white"
                                   onClick={() => {
                                        setFormData({
                                             community_name: "",
                                             topic: null,
                                             privacy: "public",
                                             about: "",
                                        });
                                   }}
                              >
                                   Clear
                              </button>
                              <button
                                   className="btn px-5 py-1 bg-primary hover:bg-primary-hover ms-3 rounded-md text-white"
                                   onClick={handleSubmit}
                              >
                                   Create
                              </button>
                         </div>
                    </Modal.Body>
               </Modal>
          </>
     );
}

NewCommunity.propTypes = {
     showModal: PropTypes.bool.isRequired,
     setShowModal: PropTypes.func.isRequired,
};
