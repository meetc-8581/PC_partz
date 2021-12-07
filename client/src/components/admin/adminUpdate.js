import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const AdminUpdate = () => {
  const [ID, setID] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Inventory, setInventory] = useState("");

  const history = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function getproduct() {
      console.log(params.id);
      const cartRes = await axios.get(
        `http://localhost:3000/products/${params.id}`,
        {
          withCredentials: true,
        }
      );
      console.log(cartRes.data);
      setID(cartRes.data[0]._id);
      setBrand(cartRes.data[0].brand);
      setModel(cartRes.data[0].model);
      setPrice(cartRes.data[0].price);
      setCategory(cartRes.data[0].category);
      setInventory(cartRes.data[0].inventory);
    }
    getproduct();
    console.log("done");
  }, []);

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

      const res = await axios.put(
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

  async function handelDelete() {
    console.log(ID);
    try {
      const res = await axios.delete(
        `http://localhost:3000/admin/product/${ID}`,

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
          <h2>Update items to the Database</h2>
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
                placeholder={Brand}
                value={Brand}
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
                placeholder={Model}
                value={Model}
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
                placeholder={Price}
                value={Price}
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
                placeholder={Category}
                value={Category}
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
                placeholder={Inventory}
                value={Inventory}
                onChange={(e) => setInventory(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <button type="submit" className="btn btn-primary btn-lg">
              Confirm
            </button>
          </div>
        </form>
        <button
          type="button "
          className="btn btn-danger btn-lg mt-5"
          onClick={handelDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminUpdate;
