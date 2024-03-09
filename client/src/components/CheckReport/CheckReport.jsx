import { Modal } from "flowbite-react";

// eslint-disable-next-line react/prop-types
function CheckReport({ openModal, setOpenModal, reportObject }) {
  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        reportObject={reportObject}
      >
        <Modal.Header className="bg-gray-800">
          <h1 className="text-white font-bold">Reports</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">


          <div className="w-full">
            <label htmlFor="">
              <h1 className="text-white py-2">Report Type</h1>
              <input
                type="text"
                disabled
                className="w-full rounded-md bg-gray-700 text-text"
                value={""}
              />
            </label>
          </div>
          <div className="w-full mt-3">
            <label htmlFor="">
              <h1 className="text-text py-2">Report Description</h1>
              <textarea
                name="right_desc"
                disabled
                value={""}
                rows={8}
                className="w-full rounded-md bg-gray-700 text-white"
              ></textarea>
            </label>
          </div>



          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CheckReport;
