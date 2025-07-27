// src/components/products/ProductCard.js
import React from 'react';

function ProductCard({ product, isWholesaler, onSelect }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p>₹{product.price}</p>
        <p>Quantity: {product.quantity}</p>
        {onSelect && !isWholesaler && (
          <button className="btn btn-sm btn-success" onClick={onSelect}>
            Order
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
