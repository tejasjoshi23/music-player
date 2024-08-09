import React, { useState, useEffect } from "react";
import "../../css/SearchBar.css";
import { SearchIcon } from "../../assets/svgIcons";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={query}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="search-icon">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
