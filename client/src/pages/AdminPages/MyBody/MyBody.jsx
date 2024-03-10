import { useEffect, useState } from "react";
import EditBody from "../../../components/EditBody/EditBody";
import AddBody from "../../../components/AddBody/AddBody";
import { getTopics } from "../../../Services/bodyServices";
import { deleteBody } from "../../../Services/bodyServices";
import timeFormat from "../../../utils/timeFormat";
import { toast } from "react-toastify";
import { Pagination } from "flowbite-react";
import Swal from "sweetalert2";

function MyBody() {
  const [openModal, setOpenModal] = useState(false);
  const [bodyDeatails, setBodyDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const [editBody, setEditBody] = useState();
  const [editModal, setEditModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };
  const onPageChange = (page) => setCurrentPage(page);
  const handleEditModal = (bodyId) => {
    setEditModal(true);
    const bodyToEdit = bodyDeatails.find((body) => {
      return body?._id === bodyId;
    });
    setEditBody(bodyToEdit);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getTopics(currentPage);
      if (response.success === true) {
        setBodyDetails(response.contents);
        setCount(response.count)
      }
    };
    getData();
  }, [
    openModal,
    setOpenModal,
    setBodyDetails,
    setEditModal,
    editModal,
    setEditBody,
    currentPage
  ]);
  const handleDelete = async (bodyId) => {
    const response = await deleteBody(bodyId);
    if (response.success === true) {
      setBodyDetails((prevDetails) =>
        prevDetails.filter((body) => body?._id !== bodyId)
      );
      toast.success(response.message);
    }
  };
  return (
    <>
      <EditBody
        setOpenModal={setEditModal}
        openModal={editModal}
        bodyDetails={editBody ? editBody : null}
      />
      <AddBody setOpenModal={setOpenModal} openModal={openModal} />
      <div className="min-h-screen bg-background">
        <div className="col-span-9">
          {/* Text Components  */}
          <div className="text-text flex justify-between">
            <div>
              <h1 className="text-2xl py-12">Body Topics</h1>
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
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-primary text-center"
                  >
                    Edit or Delete
                  </th>
                </tr>
              </thead>
              {bodyDeatails.map((data, index) => {
                return (
                  <>
                    <tbody className="text-text" key={index}>
                      <tr className="border-b border-gray-500">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{data?.name}</td>
                        <td className="px-6 py-4">
                          {timeFormat(data.createdAt)}
                        </td>
                        <td className="px-6 py-4 flex justify-center">
                          <button
                            className="border py-1 px-6 rounded hover:bg-green-500"
                            onClick={() => handleEditModal(data?._id)}
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
                                  handleDelete(data?._id);
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
          </div>
          <div className="flex z-20 mypage overflow-x-auto w-[80%] sm:justify-end">
              {count > 10 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(count / 10)}
                  onPageChange={onPageChange}
                />
              )}
            </div>
        </div>
      </div>
    </>
  );
}

export default MyBody;
