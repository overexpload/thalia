import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import ViewMarkModal from "../../../components/ViewMarkModal/ViewMarkModal";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import { debounce } from "../../../utils/functions";
import thaliaAPI from "../../../API/thaliaAPI";

export default function MyBodyPage() {
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState({ name: "", content: "" });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const [contents, setContents] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await thaliaAPI.get(
          `/my-body?search=${search}&&page=${currentPage}`
        );
        if (data.success) {
          setContents(data.contents);
          setCount(data.count);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [search, currentPage]);

  useEffect(() => {
    if (content.content && content.name) {
      setOpenModal(true);
    }
  }, [content]);
  const onPageChange = (page) => setCurrentPage(page);
  const debaunceSearch = debounce((text) => {
    setSearch(text);
  }, 500);

  return (
    <>
      <ViewMarkModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        content={content}
        setContent={setContent}
      />
      <div className="min-h-screen z-20 pb-28 relative flex flex-col items-center w-full space-y-4 bg-background pt-20 px-4 md:px-20">
        <h1 className="font-bold text-text text-4xl">My Body</h1>
        <div className="flex z-20 flex-wrap items-center justify-between mt-10 w-full">
          <Link to={"/home"} className="font-bold text-white">
            <ArrowBackIosIcon fontSize="small" className="mb-1" /> Back
          </Link>
          <div className="flex justify-center items-center ring-1 ring-gray-700 rounded-lg pe-2">
            <input
              onChange={(e) => debaunceSearch(e.target.value)}
              className="h-8 focus:outline-none text-text focus:ring-0 rounded-lg border-0 bg-transparent"
              type="text"
              placeholder="search"
            />
            <SearchIcon fontSize="medium" className="text-white/[0.3]" />
          </div>
        </div>
        {contents.length > 0 &&
          contents.map((e) => {
            return (
              <>
                <div
                  onClick={() => {
                    setContent(e);
                  }}
                  className="w-full py-4 z-20 px-4 bg-primary/[0.3] hover:bg-secondary rounded-lg cursor-pointer"
                >
                  <h1 className="font-bold text-text text-xl">{e.name}</h1>
                </div>
              </>
            );
          })}
        <div className="flex z-20 mypage overflow-x-auto w-[80%] sm:justify-end">
          {count > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(count / 10)}
              onPageChange={onPageChange}
            />
          )}
        </div>
        <img
          src="https://i.gifer.com/BXe0.gif"
          className="absolute opacity-10 top-0 hidden md:inline-block md:w-full z-10"
          alt=""
        />
      </div>
    </>
  );
}
