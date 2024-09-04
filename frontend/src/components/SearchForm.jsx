import React, { useState } from "react";
import "../styles/search.css";

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", inputValue);
    // Add your search logic here
  };

  return (
    <form onSubmit={handleSubmit} role="search">
      <label htmlFor="search">Search for stuff</label>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        autoFocus
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Go</button>
    </form>
  );
};

export default SearchForm;
