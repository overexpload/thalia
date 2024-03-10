import MybodyCard from "../MyBodyCard/MybodyCard";
import MyLawsCard from "../MyLawsCard/MyLawsCard";
import MyMindCard from "../MyMindCard/MyMindCard";
import CommunityCard from "../CommunityCard/CommunityCard";
import Chat from "../../assets/Chat.svg";
import BotModal from "../BotModal/BotModal";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserHome() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <BotModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="relative justify-center items-center flex overflow-hidden bg-gradient-to-r from-[#3e1734] to-background py-20 md:py-40">
        <div className="flex flex-wrap gap-5 justify-center z-20 items-center">
          <Link to={"/my-body"}>
            <MybodyCard />
          </Link>
          <Link to={"/my-mind"}>
            <MyMindCard />
          </Link>
          <Link to={"/my-rights"}>
            <MyLawsCard />
          </Link>
          <CommunityCard />
        </div>
        <img
          src="https://cdn.dribbble.com/users/1595839/screenshots/11700339/media/5b39c07a6a721b6b440288c6c6ec5cb1.gif"
          className="absolute opacity-10 top-0 hidden md:inline-block md:w-full z-10"
          alt=""
        />
        <div className="fixed chat-didi flex justify-center right-7 md:bottom-24 md:right-14 z-20">
          <div className="bg-text my-tooltip mr-[-25px] pr-9 px-3 py-1 rounded-s-full">
            <h1 className="text-secondary mt-3 font-semibold">
              Chat with Didi
            </h1>
          </div>
          <div
            onClick={() => setOpenModal(true)}
            className="w-14 h-14 cursor-pointer  rounded-full flex items-center justify-center bg-text"
          >
            <img src={Chat} alt="" className="w-8 z-40 " />
          </div>
        </div>
      </div>
    </>
  );
}
