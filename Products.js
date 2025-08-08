import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Home.css';

function Products() {
  const location = useLocation();
  const preselected = location.state?.selectedProduct || "All";

  const [filter, setFilter] = useState(preselected);

  const productsData = [/* ...same as before... */];

  const filteredProducts =
    filter === "All"
      ? productsData
      : productsData.filter((product) => product.category === filter);

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.category}</p>
      <p>₹{product.price}</p>
    </div>
  );

  return (
    <div>
      <h1>Products</h1>
      <div>
        {["All", "Mobile", "Laptop", "Tab"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`category-filter ${filter === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="products-list">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
