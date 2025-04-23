import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import { Image } from "../../types/types";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    if (!search) return; // no fetch if search is empty

    const fetchImages = async (): Promise<void> => {
      setLoading(true);
      setError("");
      const perPage = 20;
      const url = `https://api.unsplash.com/search/photos?query=${search}&client_id=${UNSPLASH_KEY}&page=${page}&per_page=${perPage}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch images");
        const data: {
          results: Image[];
          total_pages: number;
        } = await response.json();

        setImages(
          (prev) => (page === 1 ? data.results : [...prev, ...data.results]) //  if page 1 => rerender, else append
        );
        setTotalPages(data.total_pages);
      } catch {
        setError("Could not fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [search, page]);

  const handleSubmit = (value: string): void => {
    setImages([]);
    setSearch(value);
    setPage(1);
  };

  const loadMore = (): void => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      {images.length > 0 ? (
        <ImageGallery images={images} onImageClick={openModal} />
      ) : (
        search && !loading && !error && <p>No images found.</p>
      )}
      {images.length > 0 &&
        !loading &&
        totalPages !== null &&
        page < totalPages && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onRequestClose={closeModal}
      />
    </div>
  );
}
