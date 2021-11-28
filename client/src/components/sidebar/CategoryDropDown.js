import React, { useState } from "react";
import "./CategoryDropDown.css";

const CategoryDropDown = (props) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [category_id, setCategory_id] = useState([]);

  return (
    <div className="fw-light">
      <div className="border-bottom">
        <a
          className="ropdown-toggle w-100 d-flex justify-content-between text-dark text-decoration-none"
          href="#"
          onClick={() => {
            setOpenCategory(!openCategory);
          }}
        >
          <div className="fw-normal fs-5">Category</div>
          <div>
            {openCategory ? (
              <i className="bi bi-chevron-up"></i>
            ) : (
              <i className="bi bi-chevron-down"></i>
            )}
          </div>
        </a>
      </div>
      {openCategory && (
        <div className="category-list">
          <ul className="list-group">
            {props.category.map((cat, i) => {
              return (
                <li key={cat} className="list-group-item border-0">
                  <input
                    className="form-check-input m-1"
                    type="checkbox"
                    value={cat}
                    ref={category_id[i]}
                  />
                  {cat}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
