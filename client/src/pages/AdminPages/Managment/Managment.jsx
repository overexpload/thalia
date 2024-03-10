import { useEffect, useState } from "react";
import CheckReport from "../../../components/CheckReport/CheckReport";
import { getUsers, unBlockUser } from "../../../Services/userService";
import { blockUser } from "../../../Services/userService";
import { toast } from "react-toastify";

function Managment() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [userReport, setUserReport] = useState([]);

  const handleModal = (userId) => {
    const user = users.find((user) => {
      return user._id === userId;
    });
    setUserReport(user.reports);
    setOpenModal(true);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response.success === true) {
        setUsers(response?.userList);
      }
    };
    fetchUsers();
  }, [setOpenModal, setUsers, setUserReport, userReport, openModal]);

  const handleBlock = async (userId) => {
    const response = await blockUser(userId);
    if (response?.success === true) {
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, is_blocked: true };
        }
        return user;
      });
      setUsers(updatedUsers);
      toast(response?.message);
    }
  };
  const handleUnBlock = async (userId) => {
    const response = await unBlockUser(userId);
    if (response?.success === true) {
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, is_blocked: false };
        }
        return user;
      });
      setUsers(updatedUsers);
      toast(response?.message);
    }
  };
  return (
    <>
      <CheckReport
        openModal={openModal}
        setOpenModal={setOpenModal}
        userReport={userReport}
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
                {users?.map((user, index) => {
                  return (
                    <>
                      <tbody key={index}>
                        <tr className="border-b border-gray-600">
                          <th scope="row" className="px-6 py-4 font-medium">
                            {user?.fullname}
                          </th>
                          <td className="px-6 py-4">{user?.email}</td>
                          <td className="px-6 py-4">{user?.reports.length}</td>
                          <td className="px-6 py-4">
                            <button
                              className="border border-gray-600 bg-gray-700 py-1 px-6 rounded"
                              onClick={() => handleModal(user?._id)}
                            >
                              View
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {user?.is_blocked ? (
                              <button
                                className="border py-1 px-4 rounded hover:bg-green-700"
                                onClick={() => handleUnBlock(user?._id)}
                              >
                                UnBlock
                              </button>
                            ) : (
                              <button
                                className="border py-1 px-6 rounded hover:bg-red-700"
                                onClick={() => handleBlock(user?._id)}
                              >
                                Block
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Managment;
