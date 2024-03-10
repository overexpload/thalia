import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import EditMind from "../../../components/EditMind/EditMind";
import AddMind from "../../../components/AddMind/AddMind";
import { getDelete } from "../../../Services/mindServices";
import { getMind } from "../../../Services/mindServices";
import timeFormat from "../../../utils/timeFormat";

function MyMind() {
  const [openModal, setOpenModal] = useState(false);
  const [mindDetails, setmindDetails] = useState([]);

  const [editMind, setEditMind] = useState();
  const [mindModal, setMindModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };
  const handleEditModal = (mindId) => {
    setMindModal(true);
    const mindToEdit = mindDetails.find((mind) => {
      return mind?._id === mindId;
    });
    console.log(mindToEdit);
    setEditMind(mindToEdit);
  };
  useEffect(() => {
    const getMindData = async () => {
      const response = await getMind();
      if (response.success === true) {
        console.log(response.contents);
        setmindDetails(response.contents);
      }
    };
    getMindData();
  }, [
    setOpenModal,
    setMindModal,
    openModal,
    mindModal,
    setmindDetails,
    setEditMind,
  ]);
  const handleDelete = async (mindId) => {
    const response = await getDelete(mindId);
    if (response.success === true) {
      setmindDetails((prevDetails) =>
        prevDetails.filter((mind) => mind._id !== mindId)
      );
      toast.success(response.message);
    }
  };
  return (
    <>
      <EditMind
        setOpenModal={setMindModal}
        openModal={mindModal}
        mindDetails={editMind ? editMind : null}
      />
      <AddMind setOpenModal={setOpenModal} openModal={openModal} />
      <div className="h-full bg-background">
        <div className="col-span-9">
          {/* Text Components  */}
          <div className="text-text flex justify-between">
            <div>
              <h1 className="text-2xl py-12">Mind Management</h1>
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
                {mindDetails.map((mind, index) => {
                  return (
                    <>
                      <tbody className="text-text" key={index}>
                        <tr className="border-b border-gray-500">
                          <th scope="row" className="px-6 py-4 font-medium">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">{mind?.name}</td>
                          <td className="px-6 py-4">
                            {timeFormat(mind?.createdAt)}
                          </td>
                          <td className="px-6 py-4 flex justify-center">
                            <button
                              className="border py-1 px-6 rounded hover:bg-green-500"
                              onClick={() => handleEditModal(mind?._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="border py-1 px-6 rounded ml-2 hover:bg-red-700"
                              onClick={() => handleDelete(mind?._id)}
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

export default MyMind;
