import { useState } from "react";
import { Modal } from "flowbite-react";
import { addTopic } from "../../Services/bodyServices";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function AddBody({ openModal, setOpenModal }) {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAdd = () => {
    const addNew = async () => {
      const response = await addTopic(formData);
      if (response.success === true) {
        formData.name = "";
        formData.content = "";
        setOpenModal(false);
        toast.success(response.message);
      }
    };
    addNew();
  };
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-gray-800">
          <h1 className="text-white font-bold">Add New Topic</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">
          <div className="w-full">
            <label htmlFor="">
              <h1 className="text-white py-2">Name of the Topic</h1>
              <input
                type="text"
                className="w-full rounded-md bg-gray-700 text-text"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
            </label>
          </div>
          <div className="w-full mt-3">
            <label htmlFor="">
              <h1 className="text-text py-2">Provide the Topic Description</h1>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                id=""
                rows={8}
                className="w-full rounded-md bg-gray-700 text-white"
              ></textarea>
            </label>
          </div>
          <button
            className="text-primary border-2 px-2 py-2 rounded-md float-end"
            onClick={handleAdd}
          >
            Add Topic
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddBody;
