import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CompareProducts.css";

const ComparePage = ({ compareList, setCompareList }) => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter(item => item.id !== productId));
  };

  const addToCompare = (product) => {
    if (compareList.length < 4 && !compareList.find(item => item.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  return (
    <div className="compare-page">
      <button onClick={() => setShowModal(true)}>Add More</button>

      {compareList.length > 0 && (
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                {compareList.map((product) => (
                  <th key={product.id}>
                    {product.title}
                    <button onClick={() => removeFromCompare(product.id)}>Remove</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['price', 'brand', 'category', 'discountPercentage', 'description'].map((attribute) => (
                <tr key={attribute}>
                  <td>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</td>
                  {compareList.map((product) => (
                    <td key={product.id}>{product[attribute]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
            <h2>Select Products to Compare</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const isAdded = compareList.some(item => item.id === product.id);
                  return (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>${product.price}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td>
                        <button 
                          onClick={() => addToCompare(product)}
                          disabled={isAdded}
                          style={{ backgroundColor: isAdded ? "gray" : "blue", cursor: isAdded ? "not-allowed" : "pointer" }}
                        >
                          {isAdded ? "Added" : "Add"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="back-link">
        <Link to="/">Back to Products</Link>
      </div>
    </div>
  );
};

export default ComparePage;
