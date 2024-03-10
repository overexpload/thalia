import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

export default function ViewMarkModal({
  openModal,
  setOpenModal,
  content,
  setContent,
}) {
  return (
    <>
      <Modal
        size={"6xl"}
        className="p-10"
        show={openModal}
        position={"top-center"}
        onClose={() => {
          setContent("");
          setOpenModal(false);
        }}
      >
        <Modal.Header>{content.name}</Modal.Header>
        <Modal.Body>
          <ReactMarkdown className="prose md:ps-32 lg:prose-xl">
            {content.content}
          </ReactMarkdown>
        </Modal.Body>
      </Modal>
    </>
  );
}

ViewMarkModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  setContent: PropTypes.func.isRequired,
};
