import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

const ProductDetails = ({ compareList, setCompareList }) => {
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleCompare = (product) => {
    if (!compareList.some((item) => item.id === product.id)) {
      setCompareList([...compareList, product]);
    }
    navigate("/compare");
  };

  const removeFromCompare = (product) => {
    setCompareList(compareList.filter((item) => item.id !== product.id));
  };

  const handleSort = (key) => {
    setSortDirection(sortKey === key && sortDirection === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortKey) return 0;
    return sortDirection === "asc"
      ? a[sortKey] > b[sortKey] ? 1 : -1
      : a[sortKey] < b[sortKey] ? 1 : -1;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="product-details">
      <div className="product-table-container">
        <table>
          <thead>
            <tr>
              {[
                "title",
                "description",
                "price",
                "discountPercentage",
                "brand",
                "category",
              ].map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
              <th>Image</th>
              <th>Compare</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className={compareList.some((p) => p.id === product.id) ? "highlight" : ""}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.discountPercentage}%</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td><img src={product.thumbnail} alt={product.title} width="50" /></td>
                <td>
                  {compareList.some((p) => p.id === product.id) ? (
                    <button className="remove-btn" onClick={() => removeFromCompare(product)}>
                      Remove
                    </button>
                  ) : (
                    <button className="compare-btn" onClick={() => handleCompare(product)}>
                      Compare
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= products.length}>Next</button>
      </div>
    </div>
  );
};

export default ProductDetails;
