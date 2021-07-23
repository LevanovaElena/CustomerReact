import React from "react";

function Pagination() {
  return (
    <div className="btn-group" role="group" aria-label="Basic outlined example">
      <button type="button" className="btn btn-outline-primary">
        Prev
      </button>
      <button type="button" className="btn btn-outline-primary">
        1
      </button>
      <button type="button" className="btn btn-outline-primary">
        Next
      </button>
    </div>
  );
}

export default Pagination;
