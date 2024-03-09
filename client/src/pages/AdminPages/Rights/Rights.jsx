import { useEffect, useState } from "react";
import AddRight from "../../../components/AddRight/AddRight";
import EditRight from "../../../components/EditRight/EditRight";
import { getRight } from "../../../Services/rightServices";
import { getDelete } from "../../../Services/rightServices";
import timeFormat from "../../../utils/timeFormat";
import { toast } from "react-toastify";

function Rights() {
  const [openModal, setOpenModal] = useState(false);
  const [rightDetails, setRightDetails] = useState([]);

  const [editRight, setEditRight] = useState();
  const [editModal, setEditModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };
  const handleEditModal = (rightId) => {
    setEditModal(true);
    const rightToEdit = rightDetails.find((right) => {
      return right?._id === rightId;
    });
    setEditRight(rightToEdit);
  };
  useEffect(() => {
    console.log("Runnning..");
    const getRights = async () => {
      const response = await getRight();
      setRightDetails(response.rights);
    };
    getRights();
  }, [
    setOpenModal,
    setEditModal,
    openModal,
    editModal,
    setRightDetails,
    setEditRight,
  ]);
  const handleDelete = async (rightId) => {
    const response = await getDelete(rightId);
    if (response.success === true) {
      setRightDetails((prevDetails) =>
        prevDetails.filter((right) => right._id !== rightId)
      );
      toast.success(response.message);
    }
  };
  return (
    <>
      <EditRight
        setOpenModal={setEditModal}
        openModal={editModal}
        rightDetails={editRight ? editRight : null}
      />
      <AddRight setOpenModal={setOpenModal} openModal={openModal} />
      <div className="h-full bg-background">
        <div className="col-span-9">
          {/* Text Components  */}
          <div className="text-text flex justify-between">
            <div>
              <h1 className="text-2xl py-12">Rights Management</h1>
            </div>
            <div className="px-8">
              <button
                className="text-xl py-12 text-pretty text-primary underline"
                onClick={handleModal}
              >
                Create
              </button>
            </div>
          </div>
          {/* Table Component  */}
          <div>
            <>
              <table className="w-full text-sm text-left rtl:text-right rounded">
                <thead className="text-xs bg-secondary rounded">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-primary">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-primary">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-primary">
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-primary text-center"
                    >
                      Edit or Delete
                    </th>
                  </tr>
                </thead>
                {rightDetails.map((right, index) => {
                  return (
                    <>
                      <tbody className="text-text" key={index}>
                        <tr className="border-b border-gray-500">
                          <th scope="row" className="px-6 py-4 font-medium">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">{right?.name}</td>
                          <td className="px-6 py-4">
                            {timeFormat(right?.createdAt)}
                          </td>
                          <td className="px-6 py-4 flex justify-center">
                            <button
                              className="border py-1 px-6 rounded hover:bg-green-500"
                              onClick={() => handleEditModal(right?._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="border py-1 px-6 rounded ml-2 hover:bg-red-700"
                              onClick={() => handleDelete(right?._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
export default Rights;
