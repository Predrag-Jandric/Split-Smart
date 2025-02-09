import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Call the parent handler to filter groups
  };

  return (
    <div className="mx-auto relative w-full max-w-xs">
      <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 size-7 text-primary" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search groups"
        className="pl-12 pr-4 py-2 border-global border-border shadow-custom-dark rounded-global w-full focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default SearchBar;
