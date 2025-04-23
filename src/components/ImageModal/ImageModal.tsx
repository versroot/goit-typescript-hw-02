import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../../types/types";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  image: Image | null;
  onRequestClose: () => void;
}

export default function ImageModal({ isOpen, image, onRequestClose }: Props) {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal}
      overlayClassName={css.modaloverlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
        className={css.image}
      />
    </Modal>
  );
}
