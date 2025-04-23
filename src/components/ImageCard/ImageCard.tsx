import css from "./ImageCard.module.css";

interface Props {
  data: {
    urls: { small: string };
    alt_description: string | null;
  };
  onClick: () => void;
}

export default function Image({ data, onClick }: Props) {
  const { urls, alt_description } = data;

  return (
    <div className={css.imagewrapper}>
      <img
        src={urls.small}
        alt={alt_description || "Unsplash image"}
        onClick={onClick}
        className={css.image}
      />
    </div>
  );
}
