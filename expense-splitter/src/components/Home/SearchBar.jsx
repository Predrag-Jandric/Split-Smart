import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="mx-auto relative w-full max-w-xs">
      <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 size-7 text-primary dark:text-darkPrimary" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search groups"
        className="input pl-12 text-lg"
      />
    </div>
  );
}

export default SearchBar;
