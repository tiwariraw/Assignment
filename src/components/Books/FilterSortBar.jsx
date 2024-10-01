import { useState } from "react";
import "./FilterSortBar.css";

const FilterSortBar = ({ onFilterSort }) => {
  const [filters, setFilters] = useState({
    author: "",
    genre: "",
    publishYear: "",
  });

  const [sort, setSort] = useState({
    field: "",
    order: "asc",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    setSort({ field, order });
  };

  const applyFiltersSort = () => {
    onFilterSort({ filters, sort });
  };

  return (
    <div className="filter-sort-bar">
      <div className="filters">
        <input
          type="text"
          name="author"
          placeholder="Filter by Author"
          value={filters.author}
          onChange={handleFilterChange}
          className="author-filter-input"
        />
        <input
          type="text"
          name="genre"
          placeholder="Filter by Genre"
          value={filters.genre}
          onChange={handleFilterChange}
          className="genre-filter-input"
        />
        <input
          type="number"
          name="publishYear"
          placeholder="Filter by Publish Year"
          value={filters.publishYear}
          onChange={handleFilterChange}
          className="publish-year-filter-input"
        />
        <button onClick={applyFiltersSort} className="apply-filters-btn">
          Apply Filters
        </button>{" "}
      </div>
      <div className="sort-select-container">
        <div className="sort">
          <select onChange={handleSortChange} className="sort-select">
            <option value="">Sort By</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="author-asc">Author A-Z</option>
            <option value="author-desc">Author Z-A</option>
            <option value="publishYear-asc">Publish Year Asc</option>
            <option value="publishYear-desc">Publish Year Desc</option>
          </select>
        </div>
        <button onClick={applyFiltersSort} className="apply-btn">
          Apply Sort
        </button>
      </div>
    </div>
  );
};

export default FilterSortBar;
