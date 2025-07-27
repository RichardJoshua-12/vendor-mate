// src/components/dashboard/WholesalerDashboard.js
import React from 'react';
import AddProduct from '../products/AddProduct';
import OrderList from '../orders/OrderList';

function WholesalerDashboard() {
  return (
    <div className="container mt-5">
      <h2>Wholesaler Dashboard</h2>
      <AddProduct />
      <hr />
      <OrderList />
    </div>
  );
}

export default WholesalerDashboard;
