const express = require("express");
const router = express.Router();
const BalanceModel = require("../schemas/BalanceSchema"); // ✅ path fixed

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("🔍 GET /balance/:userId called with", userId);

  try {
    let balance = await BalanceModel.findOne({ userId });

    if (!balance) {
      balance = new BalanceModel({ userId, balance: 0 });
      await balance.save();
      console.log("✅ Created new balance entry for:", userId);
    }

    res.status(200).json(balance);
  } catch (err) {
    console.error("❌ Error fetching balance:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// module.exports = router;

// Add balance
router.post("/add", async (req, res) => {
  const { userId, amount } = req.body;
  try {
    let balance = await BalanceModel.findOne({ userId });

    if (!balance) {
      balance = new BalanceModel({ userId, balance: 0 });
    }

    balance.balance += Number(amount);
    await balance.save();

    res.status(200).json(balance);
  } catch (err) {
    console.error("Error adding balance:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Withdraw funds
router.post("/withdraw", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const balanceDoc = await Balance.findOne({ userId });

    if (!balanceDoc) {
      return res.status(400).json({ error: "Balance record not found" });
    }

    if (balanceDoc.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    balanceDoc.balance -= amount;
    await balanceDoc.save();

    res.status(200).json({ success: true, balance: balanceDoc.balance });
  } catch (err) {
    console.error("Withdraw error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
