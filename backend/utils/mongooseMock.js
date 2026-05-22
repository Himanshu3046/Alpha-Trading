const db = {
  holding: [],
  position: [],
  order: [],
  user: [],
  balance: [],
};

// Pre-seed default data so user gets a working app instantly without seeding
db.holding = [
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%",
  },
  {
    name: "HINDUNILVR",
    qty: 1,
    avg: 2335.85,
    price: 2417.4,
    net: "+3.49%",
    day: "+0.21%",
  },
  {
    name: "INFY",
    qty: 1,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
    isLoss: true,
  },
  {
    name: "ITC",
    qty: 5,
    avg: 202.0,
    price: 207.9,
    net: "+2.92%",
    day: "+0.80%",
  },
];

db.position = [
  {
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avg: 3124.75,
    price: 3082.65,
    net: "+10.04%",
    day: "-1.35%",
    isLoss: true,
  },
];

db.balance = [
  { userId: "default", balance: 100000.0 }
];

class Schema {
  constructor(definition) {
    this.definition = definition;
  }
}

function model(modelName, schema) {
  const collectionName = modelName.toLowerCase();
  if (!db[collectionName]) {
    db[collectionName] = [];
  }

  class MockModel {
    constructor(data) {
      Object.assign(this, data);
      if (!this._id) {
        this._id = Math.random().toString(36).substring(2, 9);
      }
    }

    async save() {
      const idx = db[collectionName].findIndex(
        (item) =>
          item._id === this._id ||
          (this.userId && item.userId === this.userId) ||
          (this.email && item.email === this.email)
      );
      if (idx !== -1) {
        db[collectionName][idx] = { ...this };
      } else {
        db[collectionName].push({ ...this });
      }
      return this;
    }

    static async find(query = {}) {
      let results = db[collectionName].filter((item) => {
        for (let key in query) {
          if (item[key] !== query[key]) return false;
        }
        return true;
      });

      // Chainable query methods (like .sort())
      const chain = {
        sort: (sortQuery) => {
          return chain;
        },
        then: (resolve) => resolve(results),
        catch: (reject) => {},
      };

      // Support direct thenable call
      Object.assign(chain, {
        allOrders: results,
      });

      return chain;
    }

    static async findOne(query = {}) {
      let result = db[collectionName].find((item) => {
        for (let key in query) {
          if (item[key] !== query[key]) return false;
        }
        return true;
      });
      return result ? new MockModel(result) : null;
    }

    static async create(data) {
      const doc = new MockModel(data);
      await doc.save();
      return doc;
    }

    static async deleteOne(query = {}) {
      const idx = db[collectionName].findIndex((item) => {
        for (let key in query) {
          if (item[key] !== query[key]) return false;
        }
        return true;
      });
      if (idx !== -1) {
        db[collectionName].splice(idx, 1);
      }
      return { deletedCount: idx !== -1 ? 1 : 0 };
    }
  }

  return MockModel;
}

const mockMongoose = {
  Schema,
  model,
  connect: async (uri) => {
    console.log("🟢 Connected to local in-memory Mock Database successfully!");
    return true;
  },
};

// Intercept all require('mongoose') calls in Node.js
const Module = require("module");
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id) {
  if (id === "mongoose") {
    return mockMongoose;
  }
  return originalRequire.apply(this, arguments);
};

module.exports = mockMongoose;
