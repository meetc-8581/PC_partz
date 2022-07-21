import React, { useState } from "react";

export const Dropdown = (props) => {
  const [isActive, setIsActive] = useState(false);

  const dropDownBtn = React.useRef(null);

  if (props.id === document.activeElement.id) {
    setIsActive(true);
  } else {
    // setIsActive(false);
  }

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          ref={dropDownBtn}
        >
          Categories
        </button>
      </div>
      <div>
        {isActive && (
          <ul
            className="dropdown-menu d-inline"
            aria-labelledby="dropdownMenuButton1"
          >
            {props.category.map((option) => {
              return (
                <li key={option}>
                  <a className="dropdown-item display-inline" href="/hello">
                    {option}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
