import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Orders.css";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3002/orders");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Loading state
  if (loading) {
    return <p className="loading">Loading your orders...</p>;
  }

  // ✅ No orders placed
  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven’t placed any orders yet</p>
          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Show orders
  return (
    <div className="orders">
      <h2>Your Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Mode</th>
         
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i}>
              <td>{order.name}</td>
              <td>{order.qty}</td>
              <td>₹{order.price}</td>
              <td
                className={
                  order.mode === "BUY"
                    ? "text-green"
                    : "text-red"
                }
              >
                {order.mode}
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
