import { useEffect, useState } from "react";
import AddRight from "../../../components/AddRight/AddRight";
import EditRight from "../../../components/EditRight/EditRight";
import { getRight } from "../../../Services/rightServices";
import { getDelete } from "../../../Services/rightServices";
import timeFormat from "../../../utils/timeFormat";
import { toast } from "react-toastify";
import { Pagination } from "flowbite-react";
import Swal from "sweetalert2";

function Rights() {
  const [openModal, setOpenModal] = useState(false);
  const [rightDetails, setRightDetails] = useState([]);

  const [editRight, setEditRight] = useState();
  const [editModal, setEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const onPageChange = (page) => setCurrentPage(page);

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
    const getRights = async () => {
      const response = await getRight(currentPage);
      if (response.success) {
        setRightDetails(response.rights);
        setCount(response.count);
      }
    };
    getRights();
  }, [
    setOpenModal,
    setEditModal,
    openModal,
    editModal,
    setRightDetails,
    setEditRight,
    currentPage,
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
              <h1 className="text-2xl py-12">My Rights</h1>
            </div>
            <div className="px-8">
              <button
                className="text-xl py-12 text-pretty text-primary"
                onClick={handleModal}
              >
                Create
              </button>
            </div>
          </div>
          {/* Table Component  */}
          <div>
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
                      <tr className="border-b border-gray-600">
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
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure",
                                text: "are you sure wan't to delete this",
                                showCancelButton: true,
                                confirmButtonText:"delete"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleDelete(right?._id);
                                }
                              });
                            }}
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

            <div className="flex z-20 mypage overflow-x-auto w-[80%] sm:justify-end">
              {count > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(count / 10)}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Rights;
