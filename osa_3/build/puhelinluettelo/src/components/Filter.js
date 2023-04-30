import React from "react";

const Filter = ({ filterName, setFilterName }) => {
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <form>
      <div>
        filter shown with{" "}
        <input value={filterName} onChange={handleFilterChange} />
      </div>
    </form>
  );
};
export default Filter;
