const { model } = require("mongoose");
const { BalanceSchema } = require("../schemas/BalanceSchema");

const BalanceModel = new model("Balance", BalanceSchema);

module.exports = { BalanceModel };
