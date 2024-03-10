import { useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { createMind } from "../../Services/mindServices";

function AddMind({ setOpenModal, openModal }) {
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

  const handleCreate = async () => {
    if (!formData.name || !formData.content) {
      return;
    }
    try {
      const response = await createMind(formData);
      if (response.success === true) {
        formData.name = "";
        formData.content = "";
        toast.success(response.message);
        setOpenModal(false);
      }
    } catch (error) {
      console.log("Error occurred", error);
    }
  };
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-gray-800">
          <h1 className="text-white font-bold">Add New Mind</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">
          <div className="w-full">
            <label htmlFor="">
              <h1 className="text-white py-2">Name of the Mind</h1>
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
              <h1 className="text-text py-2">Provide the Mind Description</h1>
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
            className="text-primary border-2 px-5 py-1 hover:bg-primary hover:text-black rounded-md float-end"
            onClick={handleCreate}
          >
            Add Mind
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddMind;
