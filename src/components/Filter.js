import React from "react";

const Filter = ({ handleFilter, handleSort }) => {
  return (
    <div className="filter-status">
      <span>Filter : </span>
      <button className="button-filter" onClick={() => handleFilter(true)}>
        <span>completed</span>
      </button>
      <button className="button-filter" onClick={() => handleFilter(false)}>
        Uncompleted
      </button>
      <span>Urutkan : </span>
      <button className="button-filter" onClick={handleSort}>
        priority
      </button>
    </div>
  );
};

export default Filter;
