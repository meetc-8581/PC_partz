import React from "react";
import "./Search.css";

export const Search = (props) => {
  let textInput = React.createRef();

  let handleClickSearch = (e) => {
    props.setQuery(textInput.current.value);
    props.handelclick();
  };

  return (
    <div className="list-group-item border-0 ">
      <div className="border-bottom d-flex justify-content-between">
        <div className="fw-normal fs-5">Search</div>
      </div>
      <div className="search mt-2">
        <i className="bi bi-search icon"></i>
        <input
          type="text"
          className="form-control"
          placeholder="Search pc parts"
          ref={textInput}
        />
        <button className="btn btn-primary" onClick={handleClickSearch}>
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
    //
  );
};
