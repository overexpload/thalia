// import CheckReport from "../../../components/CheckReport/CheckReport";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCommunitys } from "../../../Services/communityService";
import { UnblockCommunitys } from "../../../Services/communityService";
import { blockCommunitys } from "../../../Services/communityService";

function Community() {
  const [community, setCommunity] = useState([]);
  //   const [openModal, setOpenModal] = useState(false);
  //   const [communityReport, setCommunityReport] = useState([]);

  //   const handleModal = (communityId) => {
  //     const community = community.find((community) => {
  //       return community._id === communityId;
  //     });
  //     setCommunityReport(community.reports);
  //     setOpenModal(true);
  //   };
  useEffect(() => {
    const fetchCommunities = async () => {
      const response = await getCommunitys();
      if (response.success === true) {
        setCommunity(response?.community);
      }
    };
    fetchCommunities();
  }, [setCommunity]);

  const handleBlock = async (communityId) => {
    const response = await blockCommunitys(communityId);
    if (response?.success === true) {
      const updatedCommunity = community.map((community) => {
        if (community?._id === communityId) {
          return { ...community, is_blocked: true };
        }
        return community;
      });
      setCommunity(updatedCommunity);
      toast(response?.message);
    }
  };
  const handleUnBlock = async (communityId) => {
    const response = await UnblockCommunitys(communityId);
    if (response?.success === true) {
      const updatedCommunity = community.map((community) => {
        if (community._id === communityId) {
          return { ...community, is_blocked: false };
        }
        return community;
      });
      setCommunity(updatedCommunity);
      toast(response?.message);
    }
  };
  return (
    <>
      {/* <CheckReport
        openModal={openModal}
        setOpenModal={setOpenModal}
        community={community}
      /> */}
      <div className=" h-screen bg-background">
        <div className="col-span-9">
          <div className="text-text">
            <h1 className="text-2xl py-12">Community Managment</h1>
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
                {community?.map((community, index) => {
                  return (
                    <>
                      <tbody key={index}>
                        <tr className="border-b border-gray-600">
                          <th scope="row" className="px-6 py-4 font-medium">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">{community?.email}</td>
                          <td className="px-6 py-4">
                            {community?.community_name}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="border border-gray-600 bg-gray-700 py-1 px-6 rounded"
                              //   onClick={() => handleModal(user?._id)}
                            >
                              View
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {community?.is_blocked ? (
                              <button
                                className="border py-1 px-4 rounded hover:bg-green-700"
                                onClick={() => handleUnBlock(community?._id)}
                              >
                                UnBlock
                              </button>
                            ) : (
                              <button
                                className="border py-1 px-6 rounded hover:bg-red-700"
                                onClick={() => handleBlock(community?._id)}
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
export default Community;
