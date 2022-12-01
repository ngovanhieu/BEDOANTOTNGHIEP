const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    image: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    productId:{
      type: String,
      require: true,
    },
    customerName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    Brand: {
      type: String,
      require: true,
    },
    Color: {
      type: String,
      require: true,
    },
    Amount: {
      type: Number,
      require: true,
    },
    Total: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
