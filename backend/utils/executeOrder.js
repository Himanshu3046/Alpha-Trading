const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { watchlist } = require("../data/data");
 // your dynamic list (prices updating every second)

const executePendingOrders = async () => {
  try {
    const allOrders = await OrdersModel.find(); // assuming all are pending (you can later add status field)

    for (const order of allOrders) {
      // find matching stock from watchlist
      const stock = watchlist.find((s) => s.name === order.name);
      if (!stock) continue;

      // if prices match (or close enough)
      if (Math.abs(stock.price - order.price) <= 0.5) {
        console.log(`✅ Executing order for ${order.name}`);

        // --- Add to Holdings ---
        const existing = await HoldingsModel.findOne({ name: order.name });

        if (existing) {
          // update avg price and qty
          const newQty = existing.qty + order.qty;
          const newAvg =
            (existing.avg * existing.qty + order.price * order.qty) / newQty;

          existing.qty = newQty;
          existing.avg = newAvg;
          existing.price = stock.price;
          existing.net = `${((stock.price - newAvg) * 100) / newAvg}%`;
          existing.day = `${((stock.price - order.price) * 100) / order.price}%`;

          await existing.save();
        } else {
          // new holding entry
          await HoldingsModel.create({
            name: order.name,
            qty: order.qty,
            avg: order.price,
            price: stock.price,
            net: "0%",
            day: "0%",
          });
        }

        // delete the executed order
        await OrdersModel.deleteOne({ _id: order._id });
      }
    }
  } catch (err) {
    console.error("Error executing orders:", err);
  }
};

module.exports = { executePendingOrders };
