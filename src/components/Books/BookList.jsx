import { useState, useEffect } from "react";
import { fetchBooks } from "../../utils/api";
import BookItem from "./BookItem";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { toast } from "react-toastify";
import SearchBar from "../Search/SearchBar";
import FilterSortBar from "../Books/FilterSortBar";
import "./BookList.css";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BookList = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("django");
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});
  const maxResults = 20;

  useEffect(() => {
    loadBooks(true);
    // eslint-disable-next-line
  }, [query]);

  const loadBooks = async (isNewSearch = false) => {
    try {
      setLoading(true);
      const currentIndex = isNewSearch ? 0 : startIndex;
      let queryString = query;

      if (filters.author) {
        queryString += `+inauthor:"${filters.author}"`;
      }
      if (filters.genre) {
        queryString += `+subject:"${filters.genre}"`;
      }
      if (filters.publishYear) {
        queryString += `+publishedDate:"${filters.publishYear}"`;
      }

      const data = await fetchBooks(queryString, currentIndex, maxResults);
      let fetchedBooks = data.items || [];

      if (sort.field) {
        fetchedBooks.sort((a, b) => {
          const fieldA = a.volumeInfo[sort.field] || "";
          const fieldB = b.volumeInfo[sort.field] || "";
          if (fieldA < fieldB) return sort.order === "asc" ? -1 : 1;
          if (fieldA > fieldB) return sort.order === "asc" ? 1 : -1;
          return 0;
        });
      }

      setBooks((prevBooks) =>
        isNewSearch ? fetchedBooks : [...prevBooks, ...fetchedBooks]
      );

      setStartIndex(currentIndex + maxResults);
      setTotalItems(data.totalItems);

      if (currentIndex + maxResults >= data.totalItems) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      toast.error("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setStartIndex(0);
    setBooks([]);
  };

  const handleFilterSort = ({ filters, sort }) => {
    setFilters(filters);
    setSort(sort);
    setStartIndex(0);
    setBooks([]);
    loadBooks(true);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error occured while signing out");
      });
  };

  return (
    <div className="book-list-container">
      <div className="cart1">
        <Link to="/cart" className="cart-link1">
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="cart-items1">{cartItems.length}</div>
        </Link>
      </div>

      <div className="logout-btn-container">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      <FilterSortBar onFilterSort={handleFilterSort} />

      <div
        className="book-count"
        style={{ margin: "10px 0", fontSize: "18px", fontWeight: "bold" }}
      >
        Total Books: {totalItems}
      </div>

      <InfiniteScroll
        dataLength={books.length}
        next={() => loadBooks()}
        hasMore={hasMore}
        loader={loading && <LoadingSpinner loading={true} />}
        endMessage={<p>No more books to display.</p>}
      >
        <div className="book-grid">
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BookList;
