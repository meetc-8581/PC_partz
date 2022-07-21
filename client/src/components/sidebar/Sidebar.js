import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sidebar.css";
import CategoryDropDown from "./CategoryDropDown";
import { Search } from "./Search";

export const Sidebar = (props) => {
  const [category, setCategory] = useState([]);
  // const [openCategory, setOpenCategory] = useState(true);

  let minPriceRef = React.createRef();
  let maxPriceRef = React.createRef();

  function handelclick() {
    var arr = [0, 10000];

    arr[0] = minPriceRef.current.value === "" ? 0 : minPriceRef.current.value;
    arr[1] =
      maxPriceRef.current.value === "" ? 1000 : maxPriceRef.current.value;
    props.setPrice(arr);
  }

  useEffect(() => {
    async function getCategories() {
      const categoryRes = await axios.get("/products/category");
      setCategory(categoryRes.data);
    }
    getCategories();
  }, []);

  return (
    <div className="sidebar sticky-top pt-3">
      <h4>Categories and Filters</h4>
      <Search
        query={props.query}
        setQuery={props.setQuery}
        handelclick={handelclick}
      />
      <div className="mt-3 card border-0 ">
        <div className="list-group-item border-0 ">
          <CategoryDropDown
            category={category}
            setSearchCategory={props.setSearchCategory}
            searchCategory={props.searchCategory}
            handelclick={handelclick}
          />
        </div>
        <div className="list-group-item border-0 ">
          <div className="border-bottom d-flex justify-content-between">
            <div className="fw-normal fs-5">Price</div>
          </div>
          <div className="pt-3">
            <div className="input-group mb-3 w-100">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control me-2"
                placeholder="min"
                ref={minPriceRef}
              />

              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control me-2"
                placeholder="max"
                ref={maxPriceRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
