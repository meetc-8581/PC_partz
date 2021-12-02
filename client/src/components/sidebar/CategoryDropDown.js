import React, { useState } from "react";
import "./CategoryDropDown.css";

const CategoryDropDown = (props) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(props.category.length).fill(false)
  );

  const handleOnChange = (position) => {
    var sc = props.searchCategory;

    var index = sc.indexOf(props.category[position]);

    if (index !== -1) {
      sc.splice(index, 1);
    } else {
      sc.push(props.category[position]);
    }

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    props.setSearchCategory(sc);
    props.handelclick();
  };

  return (
    <div className="fw-light">
      <div className="border-bottom">
        <a
          className="ropdown-toggle w-100 d-flex justify-content-between text-dark text-decoration-none"
          href="#category"
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
      {
        <div
          className={openCategory ? "category-list" : "category-list-closed"}
        >
          <ul className="list-group">
            {props.category.map((cat, i) => {
              return (
                <li key={cat} className="list-group-item border-0">
                  <input
                    className="form-check-input m-1"
                    type="checkbox"
                    value={i}
                    checked={checkedState[i]}
                    onChange={() => handleOnChange(i)}
                  />
                  {cat}
                </li>
              );
            })}
          </ul>
        </div>
      }
    </div>
  );
};

export default CategoryDropDown;
