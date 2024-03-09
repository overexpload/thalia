import { useState } from "react";
import { Modal } from "flowbite-react";

function AddBody({ openModal, setOpenModal }) {
  const [formData, setFormData] = useState({
    body_name: "",
    body_desc: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
                value={formData.body_name}
                onChange={handleChange}
                name="body_name"
              />
            </label>
          </div>
          <div className="w-full mt-3">
            <label htmlFor="">
              <h1 className="text-text py-2">Provide the Topic Description</h1>
              <textarea
                name="body_desc"
                value={formData.body_desc}
                onChange={handleChange}
                id=""
                rows={8}
                className="w-full rounded-md bg-gray-700 text-white"
              ></textarea>
            </label>
          </div>
          <button className="text-primary border-2 px-2 py-2 rounded-md float-end">
            Add Topic
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddBody;