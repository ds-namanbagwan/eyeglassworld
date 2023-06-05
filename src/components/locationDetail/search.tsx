import * as React from "react";

const SearchBar = () => (
  <div className="cover">
    <form method="get" className="search Header-form">
      <div className="Header-searchBar">
        <div className="td flex">
          <input className="search-input Header-input" type="text" placeholder="Search by City, State, or ZIP code" name="text" required />
          <button className="search-button Header-submit">
            <span className="Header-submitLabel">GO </span>
          </button>
        </div>
      </div>
    </form>
  </div>
);
export default SearchBar;