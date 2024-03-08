import { useState } from "react";
import CheckReport from "../../../components/CheckReport/CheckReport";

function Managment() {
  const [openModal, setOpenModal] = useState(false);
  const [reportObject, setReportObject] = useState();
  const handleModal = () => {
    console.log("Handle Modal Called");
    setOpenModal(true);
  };
  return (
    <>
      <CheckReport
        openModal={openModal}
        setOpenModal={setOpenModal}
        reportObject={reportObject}
      />
      <div className=" h-screen bg-background">
        <div className="col-span-9">
          <div className="text-text">
            <h1 className="text-2xl py-12">User Managment</h1>

            <div>
              <table className="w-full text-sm text-left rtl:text-right rounded">
                <thead className="text-xs bg-secondary rounded">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-primary">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-primary">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-primary">
                      Reports
                    </th>
                    <th scope="col" className="px-6 py-3 text-primary">
                      View Reports
                    </th>
                    <th scope="col" className="px-6 py-3 text-primary">
                      Block/Unblock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <th scope="row" className="px-6 py-4 font-medium">
                      Amarnath as
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">
                      <button
                        className="border border-gray-600 bg-gray-700 py-1 px-6 rounded"
                        onClick={handleModal}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="border py-1 px-6 rounded hover:bg-red-700">
                        Block
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="border-b">
                    <th scope="row" className="px-6 py-4 font-medium">
                      Amarnath as
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">
                      <button
                        className="border border-gray-600 bg-gray-700 py-1 px-6 rounded"
                        onClick={handleModal}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="border py-1 px-6 rounded hover:bg-red-700">
                        Block
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Managment;
