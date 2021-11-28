import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sidebar.css";
import CategoryDropDown from "./CategoryDropDown";

export const Sidebar = () => {
  const [category, setCategory] = useState([]);
  const [openCategory, setOpenCategory] = useState(true);
  useEffect(() => {
    async function getCategories() {
      const categoryRes = await axios.get(
        "http://localhost:3000/products/category"
      );
      setCategory(categoryRes.data);
    }
    getCategories();
  }, []);

  return (
    <div className="sidebar sticky-top pt-3">
      <h4>Categories and Filters</h4>
      <div className="mt-3 card border-0 ">
        <div className="list-group-item border-0 ">
          <CategoryDropDown category={category} />
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
              />

              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control me-2"
                placeholder="min"
              />
              <button className="btn btn-info input-group-text">Go</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
