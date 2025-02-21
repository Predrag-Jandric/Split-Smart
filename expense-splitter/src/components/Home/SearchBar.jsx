import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

// just a search bar component which is on the homepage and is used to search for groups
export default function SearchBar({ searchQuery, onSearch, clearSearch }) {
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  return (
    <div className="relative w-full max-w-xs">
      {searchQuery ? (
        <IoClose
          className="absolute left-2 top-1/2 size-8 -translate-y-1/2 transform cursor-pointer text-primary transition hover:bg-border dark:text-darkPrimary dark:hover:bg-darklegendBG"
          onClick={handleClearSearch}
        />
      ) : (
        <IoIosSearch className="absolute left-2 top-1/2 size-8 -translate-y-1/2 transform text-primary dark:text-darkPrimary" />
      )}

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

