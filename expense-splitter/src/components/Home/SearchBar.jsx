import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function SearchBar({ searchQuery, onSearch, clearSearch }) {
  const handleSearch = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  return (
    <div className="mx-auto relative w-full max-w-xs">
      {searchQuery ? (
        <IoClose
          className="dark:hover:bg-darklegendBG hover:bg-border transition absolute left-2 top-1/2 transform  -translate-y-1/2 size-8 text-primary dark:text-darkPrimary cursor-pointer"
          onClick={handleClearSearch}
        />
      ) : (
        <IoIosSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 size-8 text-primary dark:text-darkPrimary" />
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

export default SearchBar;