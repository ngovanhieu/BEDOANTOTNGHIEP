const express = require('express')
const router = express.Router()
const cors = require('cors')
const app = express()

const Product = require('../controllers/product')


router.post('/api/addProduct', Product.addProduct)
router.get('/api/Products', Product.getProducts)
router.get('/api/getProductById/:id', Product.getProductById)
router.patch('/api/editProduct/:id', Product.editProduct)
router.delete('/api/removeProduct/:id', Product.removeProduct)
router.get('/api/searchProduct', Product.searchProduct)

module.exports = router
