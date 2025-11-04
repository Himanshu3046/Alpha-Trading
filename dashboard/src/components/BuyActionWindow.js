import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, type }) => {
  const { closeTradeWindow } = useContext(GeneralContext); // ✅ proper use of context
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleTradeClick = async () => {
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: type.toUpperCase(), // ✅ dynamic Buy/Sell
      });

      console.log(`${type.toUpperCase()} order placed for ${uid}`);
      closeTradeWindow(); // ✅ close modal
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice * 0.1).toFixed(2)}</span>
        <div>
          <Link
            className={`btn ${type === "buy" ? "btn-blue" : "btn-red"}`}
            onClick={handleTradeClick}
          >
            {type === "buy" ? "Buy" : "Sell"}
          </Link>
          <Link to="#" className="btn btn-grey" onClick={closeTradeWindow}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
