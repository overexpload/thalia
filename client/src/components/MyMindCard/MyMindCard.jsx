import Brain from "../../assets/Brain.svg";

export default function MyMindCard() {
  return (
    <div className="text-text flex flex-col items-center justify-center px-28 md:px-12 py-12 rounded-lg cursor-pointer hover:bg-secondary hover:text-primary bg-primary/[0.12]">
      <img src={Brain} className="w-28" alt="" />
      <h1 className="font-bold">My Mind</h1>
    </div>
  );
}
