// src/components/orders/OrderList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const myOrders = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(order => order.wholesalerid === auth.currentUser.uid);
      setOrders(myOrders);
    };
    fetchOrders();
  }, []);

  const markDelivered = async (orderId) => {
    await updateDoc(doc(db, 'orders', orderId), {
      status: 'delivered'
    });
    alert('Marked as delivered');
  };

  return (
    <div>
      <h4>Orders Received</h4>
      {orders.map(order => (
        <div key={order.id} className="card mb-2 p-2">
          <p><strong>Product ID:</strong> {order.productid}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <button
            className="btn btn-sm btn-success"
            onClick={() => markDelivered(order.id)}
            disabled={order.status === 'delivered'}
          >
            Mark Delivered
          </button>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
