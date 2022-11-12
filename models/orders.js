const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema(
  {
    userId: {
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
      type: String,
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
      type: String,
      require: true,
    },
    Total: {
      type: String,
      require: true,
    },
    
  },
  { timestamps: true },
)

const Orders = mongoose.model('Orders', ordersSchema)
module.exports = Orders
