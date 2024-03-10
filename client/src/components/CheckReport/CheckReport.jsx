import { Modal } from "flowbite-react";
import { useState } from "react";

function CheckReport({ openModal, setOpenModal, userReport }) {
  const [accordionStates, setAccordionStates] = useState(
    Array(userReport.length).fill(false)
  );

  const handleView = (index) => {
    setAccordionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        userReport={userReport}
      >
        <Modal.Header className="bg-gray-800">
          <h1 className="text-white font-bold">User Reports</h1>
        </Modal.Header>
        <Modal.Body className="ring-1 bg-background rounded-b-md px-2 py-2">
          {userReport?.length === 0 ? (
            <>
              <h1 className="text-white">No Reports for this User</h1>
            </>
          ) : (
            <>
              <div className="w-full">
                {userReport?.map((report, index) => (
                  <div
                    id={`accordion-collapse-${index}`}
                    data-accordion="collapse"
                    key={index}
                  >
                    <h2 id={`accordion-collapse-heading-${index}`}>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 gap-3"
                        data-accordion-target={`#accordion-collapse-body-${index}`}
                        aria-expanded={accordionStates[index]}
                        aria-controls={`accordion-collapse-body-${index}`}
                        onClick={() => handleView(index)}
                      >
                        <span className="text-text text-lg">
                          Report {index + 1}
                        </span>
                        <svg
                          data-accordion-icon
                          className={`w-3 h-3 rotate-180 shrink-0 ${
                            accordionStates[index] ? "rotate-180" : ""
                          }`}
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
                      id={`accordion-collapse-body-${index}`}
                      className={accordionStates[index] ? "block" : "hidden"}
                      aria-labelledby={`accordion-collapse-heading-${index}`}
                    >
                      <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <p className="mb-2 text-text dark:text-gray-400">
                          {report?.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CheckReport;
