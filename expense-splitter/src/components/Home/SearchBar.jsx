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
    <div className="mx-auto relative w-full max-w-xs ">
      <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 size-7 text-primary" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search groups"
        className="pl-12 pr-4 py-2 border-2 shadow-lg rounded-global w-full focus:outline-none focus:ring-2 focus:ring-primary
        dark:bg-black dark:placeholder:text-dark-text"
      />
    </div>
  );
}

export default SearchBar;
