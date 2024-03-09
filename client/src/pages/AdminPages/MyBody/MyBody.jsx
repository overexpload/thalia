import { useState } from "react";
import EditRight from "../../../components/EditRight/EditRight";
import AddBody from "../../../components/AddBody/AddBody";

function MyBody() {
  const [openModal, setOpenModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [rightDetails, setRightDetails] = useState();
  const handleModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      <EditRight
        setOpenModal={setOpenModal}
        openModal={openModal}
        rightDetails={rightDetails}
      />
      <AddBody setOpenModal={setOpenModal} openModal={openModal} />
      <div className=" h-screen bg-background">
        <div className="col-span-9">
          {/* Text Components  */}
          <div className="text-text flex justify-between">
            <div>
              <h1 className="text-2xl py-12">Body Topics</h1>
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
              <tbody className="text-text">
                <tr className="border-b border-gray-500">
                  <th scope="row" className="px-6 py-4 font-medium">
                    1
                  </th>
                  <td className="px-6 py-4">Dealing with Period Cramps</td>
                  <td className="px-6 py-4">18-03-2003</td>
                  <td className="px-6 py-4 flex justify-center">
                    <button
                      className="border py-1 px-6 rounded hover:bg-green-500"
                      onClick={handleModal}
                    >
                      Edit
                    </button>
                    <button className="border py-1 px-6 rounded ml-2 hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBody;
