import Figure from "../../../components/Figure/Figure";
import Sidebar from "../../../components/Sidebar/Sidebar";

function Home() {
  return (
    <>
      <div className="grid grid-cols-12 h-screen bg-background">
        <div className="col-span-3 text-text">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <div className="flex justify-around py-5">
            <Figure />
            <Figure />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
