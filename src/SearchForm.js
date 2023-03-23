import React from "react";

const SearchForm = ({ searchTerm, setSearchTerm }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for tasks"
      />
      <input type="submit" hidden />
    </form>
  );
};

export default SearchForm;
