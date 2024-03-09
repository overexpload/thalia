import MybodyCard from "../MyBodyCard/MybodyCard";
import MyLawsCard from "../MyLawsCard/MyLawsCard";
import MyMindCard from "../MyMindCard/MyMindCard";
import CommunityCard from "../CommunityCard/CommunityCard";

export default function UserHome() {
  return (
    <div className="relative justify-center items-center flex overflow-hidden bg-gradient-to-r from-[#3e1734] to-background py-10 md:py-40">
      <div className="flex flex-wrap gap-5 justify-center z-20 items-center">
        <MybodyCard />
        <MyMindCard />
        <MyLawsCard />
        <CommunityCard />
      </div>
      <img src="https://cdn.dribbble.com/users/1595839/screenshots/11700339/media/5b39c07a6a721b6b440288c6c6ec5cb1.gif" className="absolute opacity-10 top-0 hidden md:inline-block md:w-full z-10" alt="" />
    </div>  
  );
}
