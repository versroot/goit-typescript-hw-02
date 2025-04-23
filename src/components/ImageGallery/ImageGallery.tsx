import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../types/types";

interface Props {
  images: Image[];
  onImageClick: (img: Image) => void;
}

export default function Gallery({ images, onImageClick }: Props) {
  return (
    <div className={css.grid}>
      {images.map((img) => (
        <ImageCard key={img.id} data={img} onClick={() => onImageClick(img)} />
      ))}
    </div>
  );
}
