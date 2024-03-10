import { useEffect, useRef, useState } from "react";
import { getRecentDiscussions } from "../../../Services/communityService";
import { toast } from "react-toastify";
import DiscussionCard from "../DiscussionCard/DiscussionCard";

export default function RecentDiscussions() {
     const [recentDiscussions, setRecentDiscussions] = useState([]);
     const page = useRef(1);
     useEffect(() => {
          (async () => {
               try {
                    const response = await getRecentDiscussions(page.current);
                    if (response.data.success) {
                         setRecentDiscussions(response.data.discussions);
                         page.current = page.current + 1;
                    }
               } catch (error) {
                    toast.error("Internal server error");
               }
          })();
     }, []);

     return (
          <div className="recent-discussions sm:ms-96 min-h-screen bg-gray-700 text-text p-5">
               {recentDiscussions.map((item, index) => {
                    return (
                         <DiscussionCard
                              key={index}
                              discussion={item}
                              setDiscussion={setRecentDiscussions}
                              type={"RECENT"}
                         />
                    );
               })}
          </div>
     );
}
