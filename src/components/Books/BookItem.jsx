import { Link } from "react-router-dom";
import { addToCart } from "../Cart/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const BookItem = ({ book }) => {
  const dispatch = useDispatch();

  const { volumeInfo } = book;
  const { title, authors, imageLinks, categories, publishedDate } = volumeInfo;

  const availability = book.availability || "Available";
  const copies = book.copies || 5;

  const handleAddToCart = () => {
    if (copies > 0) {
      dispatch(addToCart(book));
      toast.success(`${title} added to cart`);
    } else {
      toast.error(`${title} is currently not available`);
    }
  };

  return (
    <div className="book-item">
      <img
        src={imageLinks?.thumbnail || "https://placehold.co/160x170"}
        alt={title}
        loading="lazy"
      />
      <h3 style={{ marginTop: "1rem" }}>{title}</h3>
      <p className="author">Author: {authors?.join(", ") || "Not Available"}</p>
      <p>Genre: {categories?.join(", ") || "Not Available"}</p>
      <p className="published">Published: {publishedDate || "Not Available"}</p>
      <p className="availability">
        Availability:{" "}
        <span
          className={`status ${
            availability === "Available" ? "available" : "not available"
          }`}
        >
          {availability}
        </span>
      </p>
      <p>Copies Available: {copies}</p>
      <button
        onClick={handleAddToCart}
        disabled={copies === 0}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
      <div>
        <Link to={`/books/${book.id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookItem;
