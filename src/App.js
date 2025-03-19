import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductDetails from "./pages/ProductDetails";
import ComparePage from "./pages/ComparePage";
import "./styles/App.css";

const App = () => {
  const [compareList, setCompareList] = useState([]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={
                <ProductDetails
                  compareList={compareList}
                  setCompareList={setCompareList}
                />
              }
            />
            <Route
              path="/compare"
              element={
                <ComparePage
                  compareList={compareList}
                  setCompareList={setCompareList}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;