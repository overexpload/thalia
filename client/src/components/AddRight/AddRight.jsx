import { useState } from "react";
import { Modal } from "flowbite-react";

// eslint-disable-next-line react/prop-types
function AddRight({ setOpenModal, openModal }) {
  const [formData, setFormData] = useState({
    right_name: "",
    right_desc: "",
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
          <h1 className="text-white font-bold">Add New Right</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">
          <div className="w-full">
            <label htmlFor="">
              <h1 className="text-white py-2">Name of the Right</h1>
              <input
                type="text"
                className="w-full rounded-md bg-gray-700 text-text"
                value={formData.right_name}
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
                value={formData.right_desc}
                onChange={handleChange}
                id=""
                rows={8}
                className="w-full rounded-md bg-gray-700 text-white"
              ></textarea>
            </label>
            {/* <div>
              <label
                className="block mb-2 text-sm font-medium text-text"
                htmlFor="small_size"
              >
                Select the image
              </label>
              <input
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
              />
            </div> */}
          </div>
          <button className="text-primary border-2 px-2 py-2 rounded-md float-end">
            Add Right
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddRight;
