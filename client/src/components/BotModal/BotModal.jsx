import { Modal } from "flowbite-react";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import aiThaliaAPI from "../../API/aiThaliaAPI";
import Loader3 from "../../components/Loader/Loader3/Loader3";

export default function BotModal({ openModal, setOpenModal }) {
  const [query, setQuery] = useState("");
  const [submit, setSubmit] = useState(true);
  const scroll = useRef(null);
  const qInput = useRef();

  const [messages, setMessages] = useState([
    {
      id: "bot",
      message: "",
    },
  ]);

  useEffect(() => {
    console.log(import.meta.env.VITE_AI_BASE_URL);
    if (qInput.current && !submit) {
      qInput.current.focus();
    }
  }, [submit]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, openModal]);

  useEffect(() => {
    if (openModal && messages.length < 2) {
      setTimeout(() => {
        setMessages([
          {
            id: "bot",
            message: "Hello, Do you have anything to share with me😊",
          },
        ]);
        setSubmit(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  useEffect(() => {
    (async function () {
      if (query && submit) {
        try {
          const { data } = await aiThaliaAPI.post("/chat", { query: query });
          if (data.success) {
            setMessages([
              ...messages,
              {
                id: "bot",
                message: data.message,
              },
            ]);
            setSubmit(false);
            setQuery("");
          }
        } catch (err) {
          console.log(err);
          setQuery("");
          setSubmit(false);
          setQuery("");
        }
      }
    })();
  }, [submit, query, messages]);

  const handlSubmit = (e) => {
    e.preventDefault();
    if (query) {
      setMessages([
        ...messages,
        {
          id: "user",
          message: query,
        },
      ]);
      setSubmit(true);
    }
  };

  return (
    <>
      <Modal
        className="sm:p-10 py-10"
        size={"md"}
        dismissible
        show={openModal}
        position={"bottom-right"}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header className="bg-primary">Chat with Didi 🤎</Modal.Header>
        <Modal.Body className="min-h-80 max-h-80 w-full">
          <div className="flex flex-col w-full flex-grow h-full space-y-4 overflow-auto">
            {messages.map((e) => {
              return (
                <>
                  {e.id === "bot" ? (
                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                      <div>
                        {e.message && (
                          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                            <p className="text-sm">{e.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                      <div>
                        <div className="bg-secondary text-white p-3 rounded-l-lg rounded-br-lg">
                          <p className="text-sm">{e.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
            {submit && (
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div>
                  <div className="bg-gray-300 px-3 py-2 rounded-r-lg rounded-bl-lg">
                    <Loader3 />
                  </div>
                </div>
              </div>
            )}
            <div ref={scroll} />
          </div>
        </Modal.Body>
        <form
          onSubmit={handlSubmit}
          className="flex w-full h-full gap-4 px-5 justify-center items-center"
        >
          <input
            ref={qInput}
            type="text"
            placeholder="Ask me..."
            className="w-full rounded-lg mb-5 ring-1 ring-gray-400 border-0"
            value={query}
            disabled={submit}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={submit}
            type="submit"
            className="mb-5 cursor-pointer"
          >
            <SendIcon />
          </button>
        </form>
      </Modal>
    </>
  );
}

BotModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
