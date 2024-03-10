import { useEffect } from "react";
// import { getAllCommunity } from "../../services/communityService";
import { useDispatch, useSelector } from "react-redux";
import { resetCommunity } from "../../../features/communitySlice";
import { getAllCommunity } from "../../../Services/communityService";
import CommunityCard from "../CommunityCard/CommunityCard";

export default function DiscoverCommunity() {
     const dispatch = useDispatch();
     const { community, isSuccess, isError } = useSelector(
          (state) => state.community
     );
     const { user } = useSelector((state) => state.auth);
     useEffect(() => {
          dispatch(getAllCommunity());
     }, [dispatch]);
     useEffect(() => {
          dispatch(resetCommunity());
     }, [isSuccess, isError, dispatch]);

     return (
          <section className="your-community flex flex-col sm:ms-96 p-5 text-text flex-wrap gap-5 bg-gray-800 min-h-screen">
               <h1 className="text-xl">Discover Community</h1>
               {community.map((item, index) => {
                    const members = item.members
                         .filter((member) => member.status === "active")
                         .map((com) => com.user_id);
                    if (!members.includes(user?._id)) {
                         return (
                              <CommunityCard
                                   key={index}
                                   community={item}
                                   type={"discover"}
                              />
                         );
                    }
               })}
          </section>
     );
}
