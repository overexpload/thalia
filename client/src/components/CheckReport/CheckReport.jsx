import { Modal } from "flowbite-react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function CheckReport({ openModal, setOpenModal, reportObject }) {
  const [show, setShow] = useState(false);
  const handleView = () => {
    setShow((state) => !state);
  };
  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        reportObject={reportObject}
      >
        <Modal.Header className="bg-gray-800">
          <h1 className="text-white font-bold">User Reports</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">
          <div className="w-full">
            <div id="accordion-collapse" data-accordion="collapse">
              <h2 id="accordion-collapse-heading-1">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 gap-3"
                  data-accordion-target="#accordion-collapse-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-collapse-body-1"
                  onClick={handleView}
                >
                  <span>Personal Harrasment</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-1"
                className={show ? "block" : "hidden"}
                aria-labelledby="accordion-collapse-heading-1"
              >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Flowbite is an open-source library of interactive components
                    built on top of Tailwind CSS including buttons, dropdowns,
                    modals, navbars, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CheckReport;
