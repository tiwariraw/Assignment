import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBookById } from "../../utils/api";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { toast } from "react-toastify";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (error) {
        toast.error("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner loading={true} />;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  const { volumeInfo } = book;
  const {
    title,
    authors,
    imageLinks,
    categories,
    publishedDate,
    publisher,
    pageCount,
    language,
    previewLink,
  } = volumeInfo;

  return (
    <div className="book-details-container">
      <div className="book-details">
        <img
          src={imageLinks?.thumbnail || "https://placehold.co/160x170"}
          alt={title}
          className="book-details-image"
        />
        <div className="book-details-info">
          <h2>{title}</h2>

          <p>
            <strong>Author(s):</strong> {authors?.join(", ") || "Not Available"}
          </p>

          <p>
            <strong>Genre:</strong> {categories?.join(", ") || "Not Available"}
          </p>

          <p>
            <strong>Published Date:</strong> {publishedDate || "Not Available"}
          </p>

          <p>
            <strong>Publisher:</strong> {publisher || "Not Available"}
          </p>

          <p>
            <strong>Page Count:</strong> {pageCount || "Not Available"}
          </p>

          <p>
            <strong>Language:</strong> {language || "Not Available"}
          </p>

          <a href={previewLink} target="_blank" className="preview-link">
            Preview
          </a>

          <Link
            to="/"
            className="back-to-list"
            style={{ marginInline: "1rem" }}
          >
            &larr; Back to Book List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
