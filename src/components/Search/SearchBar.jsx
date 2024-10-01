import { useState, useEffect } from "react";
import { fetchBooks } from "../../utils/api";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const data = await fetchBooks(query, 0, 5);
      setSuggestions(data.items || []);
    } catch (error) {
      toast.error("Failed to fetch suggestions.");
    }
  };

  // Debounce the suggestion fetch
  const debouncedFetch = debounce(fetchSuggestions, 300);

  useEffect(() => {
    debouncedFetch(input);
    return debouncedFetch.cancel;
  }, [input, debouncedFetch]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSelect = (suggestion) => {
    setInput(suggestion.volumeInfo.title);
    setSuggestions([]);
    onSearch(suggestion.volumeInfo.title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search books..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSelect(suggestion)}>
              {suggestion.volumeInfo.title} by{" "}
              {suggestion.volumeInfo.authors?.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
