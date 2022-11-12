const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PitchesSchema = new Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    productBrand: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    chip: {
      type: String,
      require: true,
    },
    ram: {
      type: String,
      require: true,
    },
    memory: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: false,
    },
    quantity: {
      type: Number,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true },
)

const Products = mongoose.model('Products', PitchesSchema)
module.exports = Products
