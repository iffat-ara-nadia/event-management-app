import React from "react";

const GuestSearch = () => {
  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder=" Search Guest by name ..."
      />
      <i className="fa fa-search search-icon" />
    </div>
  );
};

export default GuestSearch;
