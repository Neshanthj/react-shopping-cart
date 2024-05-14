import React, { useContext, useState, useEffect } from "react";
import { dataContext } from "../App";

function Card() {
  // Accessing shared data and functions from the dataContext
  const { data, setprice, setcount } = useContext(dataContext);

  // Local state management for price, count, and a fixed discount value
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const discount = 15; // Fixed discount value of 15%

  // Reset price and count when the selected product changes
  useEffect(() => {
    setPrice(0);
    setCount(0);
  }, [data, setprice, setcount]);

  // Function to calculate the total price based on selected quantity
  const total = (e) => {
    setCount(parseInt(e.target.value));
    setPrice(parseInt(e.target.value) * data.price); // Updating price based on quantity and item price
  };

  // Function to remove the selected product by resetting price and count
  const remove = () => {
    setPrice(0);
    setCount(0);
  };

  // Rendering the card with product details, quantity selection, and pricing information
  return (
    <div className="col px-5 backgroundClr pt-5">
      {/* Product details */}
      <div className=" ">
        <div className="row ">
          {/* Product image */}
          <div className="col-lg-3 col-12 text-center mb-2">
            <img src={data.thumbnail} className="img-fluid " alt="..." />
          </div>
          {/* Product information */}
          <div className="col-lg-6 col-6">
            <div className="  ">
              <h2>{data.title}</h2>
              <p>
                <b>Description</b>
              </p>
              <p className="text-secondary">{data.description}</p>
              <p>
                <b>Rating : </b>
                {data.rating}
              </p>
            </div>
          </div>
          {/* Quantity selection and pricing */}
          <div className="col-lg-3 col-6 ">
            <div className=" text-end ">
              <div className="d-flex justify-content-end align-items-center m-2 text-end ">
                {/* Quantity selection dropdown */}
                <div className="wrapper">
                  <select
                    name=""
                    size={1}
                    id="select"
                    className="SelectTag "
                    onChange={(e) => {
                      total(e);
                    }}
                    value={count}
                  >
                    {/* Options for quantity selection */}
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                {/* Displaying item price */}
                <h6 className="pt-2">
                  <i className="bi bi-currency-dollar"></i>
                  {data.price.toFixed(2)}
                </h6>
              </div>
              {/* Button to remove the selected product */}
              <button className="mt-5 RemoveButton" onClick={remove}>
                REMOVE
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Pricing summary */}
      <div className="my-4">
        {/* Total price */}
        <div className="d-flex justify-content-between">
          <h5 className="text-secondary">TOTAL :</h5>
          <h6>
            <i className="bi bi-currency-dollar"></i>
            {price.toFixed(2)}
          </h6>
        </div>
        {/* Shipping */}
        <div className="d-flex justify-content-between">
          <h5 className="text-secondary h6">SHIPPING :</h5>
          <h6>FREE</h6>
        </div>
        {/* Discount */}
        <div className="d-flex justify-content-between">
          <h5 className="text-secondary h6">DISCOUNT :</h5>
          <h6>{discount}%</h6>
        </div>
      </div>

      <hr />

      {/* Subtotal and additional information */}
      <div className="my-4">
        <div className="d-flex justify-content-between">
          <h5>SUBTOTAL :</h5>
          {/* Calculating subtotal with discount */}
          <h6>
            <i className="bi bi-currency-dollar"></i>
            {((price * (100 - discount)) / 100).toFixed(2)}
          </h6>
        </div>
        {/* Additional information */}
        <div className="text-end">
          <p className="text-danger">Get Daily Cash With NespolaCard</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
