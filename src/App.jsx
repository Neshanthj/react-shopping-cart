// Import necessary dependencies and styles
import React, { createContext, useState } from "react";
import Api from "./Api.json"; // Importing JSON data from Api.json
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons CSS
import "./App.css"; // Custom styles
import Card from "./Components/Card"; // Importing the Card component

// Creating a new context
const dataContext = createContext();

// Main App component
function App() {
  // State to manage the selected product, defaulting to the first product in the API data
  const [selectedProduct, setSelectedProduct] = useState(Api.products[0]);

  // Function to handle the change in selected product
  const handleProductChange = (productId) => {
    // Find the selected product from the API data based on productId
    const product = Api.products.find((item) => item.id === productId);
    // Set the selected product in the state
    setSelectedProduct(product);
  };

  // Render the UI
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          {/* Heading and information */}
          <h4 className="view-product-header">View Another Product</h4>
          <p className="select-product-info">Select a different product from the list below</p>

          {/* Dropdown to select different products */}
          <select
            className="product-dropdown form-select"
            onChange={(e) => handleProductChange(parseInt(e.target.value))}
            value={selectedProduct.id} // Set the selected value to the currently selected product ID
          >
            {/* Mapping through the products to create dropdown options */}
            {Api.products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {/* Providing the selectedProduct data through context to the Card component */}
        <dataContext.Provider value={{ data: selectedProduct }}>
          <Card />
        </dataContext.Provider>
      </div>
    </div>
  );
}

// Exporting the App component as default along with the dataContext
export { App as default, dataContext };
