import React from "react";

export const Pagination = (props) => {
  return (
    <div>
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <span className="page-link">
              <button
                className="btn"
                onClick={() =>
                  props.setCurrentPage(Math.max(0, props.currentPage - 1))
                }
              >
                Previous
              </button>
            </span>
          </li>
          {props.pages
            .slice(
              Math.max(0, props.currentPage - 2),
              Math.max(5, props.currentPage + 2)
            )
            .map((pageIndex) => (
              <li
                key={pageIndex}
                className={
                  pageIndex === props.currentPage
                    ? "page-item active text-white"
                    : "page-item"
                }
              >
                <span className="page-link">
                  <button
                    className="btn"
                    onClick={() => props.setCurrentPage(pageIndex)}
                  >
                    {pageIndex + 1}
                  </button>
                </span>
              </li>
            ))}
          <li className="page-item disabled">
            <span className="page-link">
              <button className="btn">
                <b>....</b>
              </button>
            </span>
          </li>
          <li className="page-item">
            <span className="page-link">
              <button
                className="btn"
                onClick={() =>
                  props.setCurrentPage(
                    Math.min(props.totalpages - 1, props.currentPage + 1)
                  )
                }
              >
                Next
              </button>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
