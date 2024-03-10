import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircle from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import thaliaAPI from "../../../API/thaliaAPI";
import { useDispatch } from "react-redux";
import { acceptJoinRequest } from "../../../Services/communityService";

export default function NewRequest({
     openDrawer,
     setOpenDrawer,
     community,
     setCommunity,
}) {
     const dispatch = useDispatch();
     const [userList, setUserList] = useState([]);

     useEffect(() => {
          if (community) {
               (async () => {
                    try {
                         const response = await thaliaAPI.get(
                              `/community/pending-request/${community._id}`
                         );
                         if (response.data.userList) {
                              setUserList(response.data.userList);
                         }
                    } catch (error) {
                         toast.error(error.response?.data.message);
                    }
               })();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [community]);

     async function acceptRequest(user_id) {
          if (community) {
               const response = await dispatch(
                    acceptJoinRequest({ community_id: community._id, user_id })
               );
               if (response.payload.member) {
                    setUserList((current) =>
                         current.filter((item) => item.user_id !== user_id)
                    );
                    if (community) {
                         setCommunity({
                              ...community,
                              members: community.members.map((item) => {
                                   if (item.user_id === user_id) {
                                        item.status = "active";
                                   }
                                   return item;
                              }),
                         });
                    }
               }
          }
     }

     return (
          <div>
               <Drawer
                    anchor={"right"}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
               >
                    <div className="container bg-gray-900 w-96 h-screen p-5 flex flex-col">
                         <h1 className="text-xl text-white font-medium">
                              New Requests
                         </h1>
                         {userList &&
                              userList.map((item, index) => {
                                   return (
                                        <div
                                             key={index}
                                             className="member-request-card w-full flex justify-between bg-gray-800 p-2 rounded-md"
                                        >
                                             <div className="flex gap-3">
                                                  {item.userProfile
                                                       .profile_img ? (
                                                       <img
                                                            src={
                                                                 item
                                                                      .userProfile
                                                                      .profile_img
                                                            }
                                                            alt=""
                                                            className="w-10 h-10 rounded-full"
                                                       />
                                                  ) : (
                                                       <div className="w-10 h-10 bg-gray-900 rounded-full">
                                                            <h1>
                                                                 {
                                                                      item
                                                                           .userProfile
                                                                           .email[0]
                                                                 }
                                                            </h1>
                                                       </div>
                                                  )}
                                                  <h1 className="text-2xl text-slate-400">
                                                       {
                                                            item.userProfile
                                                                 .username
                                                       }
                                                  </h1>
                                             </div>
                                             <div
                                                  className="add-btn text-4xl text-white cursor-pointer"
                                                  onClick={() =>
                                                       acceptRequest(
                                                            item.user_id
                                                       )
                                                  }
                                             >
                                                  <AddCircle />
                                             </div>
                                        </div>
                                   );
                              })}
                    </div>
               </Drawer>
          </div>
     );
}
NewRequest.propTypes = {
     openDrawer: PropTypes.bool,
     setOpenDrawer: PropTypes.func,
     community: PropTypes.object,
     setCommunity: PropTypes.func,
};
