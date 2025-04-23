import css from "./LoadMoreBtn.module.css";
interface Props {
  onClick: () => void;
}

export default function LoadMore({ onClick }: Props) {
  return (
    <div className={css.wrapper}>
      <button onClick={onClick} className={css.loadmore}>
        Load More
      </button>
    </div>
  );
}
