const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: { type: String },
  day: { type: String },
  isLoss: { type: Boolean, default: false },
});

module.exports = { HoldingsSchema };
