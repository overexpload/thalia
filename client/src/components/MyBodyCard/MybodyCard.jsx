import Heart from "../../assets/Heart.svg";
export default function MybodyCard() {
  return (
    <div className="text-text flex flex-col items-center justify-center px-28 md:px-12 py-12 rounded-lg cursor-pointer hover:bg-secondary hover:text-primary bg-primary/[0.12]">
      <img src={Heart} className="w-28" alt="" />
      <h1 className="font-bold">My Body</h1>
    </div>
  );
}
