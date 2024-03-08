import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function EditRight({ setOpenModal, openModal, rightDetails }) {
  const [formData, setFormData] = useState({
    right_name: "",
    right_desc: "",
  });
  useEffect(() => {
    if (rightDetails) {
      formData.right_name = rightDetails?.name;
      formData.right_desc = rightDetails?.description;
    }
  }, [formData, rightDetails]);
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
          <h1 className="text-white font-bold">Add New Right</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">
          <div className="w-full">
            <label htmlFor="">
              <h1 className="text-white py-2">Name of the Right</h1>
              <input
                type="text"
                className="w-full rounded-md bg-gray-700 text-text"
                value={formData?.right_name}
                onChange={handleChange}
                name="right_name"
              />
            </label>
          </div>
          <div className="w-full mt-3">
            <label htmlFor="">
              <h1 className="text-text py-2">Provide the Right Description</h1>
              <textarea
                name="right_desc"
                value={formData?.right_desc}
                onChange={handleChange}
                id=""
                rows={8}
                className="w-full rounded-md bg-gray-700 text-white"
              ></textarea>
            </label>
          </div>
          <button className="text-primary border-2 px-2 py-2 rounded-md float-end">
            Update
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default EditRight;
