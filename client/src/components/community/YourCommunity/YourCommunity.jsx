import { useEffect } from "react";
import { getMyCommunity } from "../../../Services/communityService";
import { useDispatch, useSelector } from "react-redux";
import CommunityCard from "../CommunityCard/CommunityCard";

export default function YourCommunity() {
     const dispatch = useDispatch();
     const { myCommunity } = useSelector((state) => state.community);
     useEffect(() => {
          dispatch(getMyCommunity());
     }, [dispatch]);
     return (
          <div className="sm:ms-96 min-h-screen bg-gray-700 text-text p-5">
               <h1 className="text-xl">your communities</h1>
               <div className="your-community flex gap-2 mt-5">
                    {myCommunity.map((item, index) => {
                         return (
                              <CommunityCard
                                   community={item}
                                   item={"my_community"}
                                   key={index}
                              />
                         );
                    })}
               </div>
          </div>
     );
}
