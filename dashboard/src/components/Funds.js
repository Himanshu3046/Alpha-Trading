import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Funds.css";


const Funds = () => {
  const [balance, setBalance] = useState(0);
  const [usedMargin, setUsedMargin] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");

  const user = JSON.parse(localStorage.getItem("dashboardUser")); // make sure this exists

  // ✅ Fetch current balance
  const fetchBalance = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/balance/${user.email}`);
      setBalance(res.data.balance || 0);
    } catch (err) {
      console.error("❌ Error fetching balance:", err);
      setBalance(0);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  // ✅ Handle Add Funds
  const handleAddFunds = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }
    try {
      await axios.post("http://localhost:3002/balance/add", {
        userId: user.email,
        amount: Number(amount),
      });
      await fetchBalance();
      setAmount("");
      setShowAddModal(false);
      alert("✅ Funds added successfully!");
    } catch (err) {
      console.error("❌ Add Funds Error:", err);
      alert("Failed to add funds");
    }
  };

  // ✅ Handle Withdraw Funds
  const handleWithdrawFunds = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }
    try {
      await axios.post("http://localhost:3002/balance/add", {
        userId: user.email,
        amount: -Number(amount), // negative to withdraw
      });
      await fetchBalance();
      setAmount("");
      setShowWithdrawModal(false);
      alert("✅ Funds withdrawn successfully!");
    } catch (err) {
      console.error("❌ Withdraw Funds Error:", err);
      alert("Failed to withdraw funds");
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>

        {/* ✅ Show current balance above buttons */}
        <h2 style={{ marginBottom: "10px" }}>💰 Current Balance: ₹ {balance.toFixed(2)}</h2>

        <button className="btn btn-green" onClick={() => {
  console.log("Add Funds clicked");
  setShowAddModal(true);
}}>
  Add funds
</button>

<button className="btn btn-blue" onClick={() => {
  console.log("Withdraw clicked");
  setShowWithdrawModal(true);
}}>
  Withdraw
</button>

      </div>

      {/* Equity section */}
      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹ {balance.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹ {usedMargin.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹ {balance.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹ {balance.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>₹ 0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>

      {/* ✅ Add Funds Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Add Funds</h4>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn btn-green" onClick={handleAddFunds}>
                Add
              </button>
              <button className="btn btn-grey" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Withdraw Funds Modal */}
      {showWithdrawModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Withdraw Funds</h4>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn btn-blue" onClick={handleWithdrawFunds}>
                Withdraw
              </button>
              <button
                className="btn btn-grey"
                onClick={() => setShowWithdrawModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;
