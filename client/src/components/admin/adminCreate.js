import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AdminCreate = () => {
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Inventory, setInventory] = useState("");

  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const productData = {
        brand: Brand,
        model: Model,
        price: Price,
        category: Category,
        inventory: Inventory,
      };

      const res = await axios.post(
        "http://localhost:3000/admin/product",
        productData,
        {
          withCredentials: true,
        }
      );
      console.log(res.headers);

      history("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="container mt-5 m-auto text-center">
        <div className="">
          <h2>Add items to the Database</h2>
        </div>
        <form className="w-25 m-auto mt-4 fs-5" onSubmit={handleSubmit}>
          <div className="form text-start">
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                className="form-control"
                placeholder="brand"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="model" className="form-label">
                Model
              </label>
              <input
                type="text"
                name="model"
                className="form-control"
                placeholder="model"
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                name="price"
                className="form-control"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                name="category"
                className="form-control"
                placeholder="category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Inventory" className="form-label">
                Inventory
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Inventory"
                onChange={(e) => setInventory(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <button type="submit" className="btn btn-primary btn-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreate;
