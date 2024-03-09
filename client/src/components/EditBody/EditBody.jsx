import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { editBody } from "../../Services/bodyServices";

// eslint-disable-next-line react/prop-types
function EditBody({ setOpenModal, openModal, bodyDetails }) {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  });
  useEffect(() => {
    if (bodyDetails) {
      setFormData({
        name: bodyDetails?.name || "",
        content: bodyDetails?.content || "",
      });
    }
  }, [bodyDetails]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    const response = await editBody(formData, bodyDetails?._id);
    if (response.success === true) {
      toast.success(response.message);
      formData.name = "";
      formData.content = "";
      setOpenModal(false);
    }
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-gray-800">
          <h1 className="text-white font-bold">Edit Topic</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">
          <div className="w-full">
            <label htmlFor="">
              <h1 className="text-white py-2">Name of the Topic</h1>
              <input
                type="text"
                className="w-full rounded-md bg-gray-700 text-text"
                value={formData?.name}
                onChange={handleChange}
                name="name"
              />
            </label>
          </div>
          <div className="w-full mt-3">
            <label htmlFor="">
              <h1 className="text-text py-2">Topic Description</h1>
              <textarea
                name="content"
                value={formData?.content}
                onChange={handleChange}
                rows={8}
                className="w-full rounded-md bg-gray-700 text-white"
              ></textarea>
            </label>
          </div>
          <button
            className="text-primary border-2 px-2 py-2 rounded-md float-end"
            onClick={handleEdit}
          >
            Update
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default EditBody;
