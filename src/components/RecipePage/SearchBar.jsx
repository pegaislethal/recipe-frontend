import React from 'react';
import { MdSearch } from 'react-icons/md';


const SearchBar = () => {
  return (
    <div className="w-full space-y-2 max-w-md mx-auto">
      <label htmlFor="searchInput" className="sr-only">
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          id="searchInput"
          placeholder="Search item here..."
          className="w-full py-2 pl-4 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <MdSearch className="absolute right-3  text-gray-500 " />
      </div>
    </div>
  );
};

export default SearchBar;
