const express = require('express')
const route = express.Router()
const app = express()
const { allowCrossDomain } = require('../utils/corsMiddleware')
const orderValidation = require('../helpers/orderValidation')

const ordersController = require('../controllers/cart')


app.use(allowCrossDomain)

// route.post('/api/orders/addOrderProduct', orderValidation, ordersController.createOrder)
route.post('/api/orders/createOrders', orderValidation , ordersController.addOrderProduct)
route.get('/api/orders/getAllOrders', ordersController.getAllOrders)
route.get('/api/orders/getOrderById/:orderById', ordersController.getOrderById)
route.delete('/api/orders/deleteOrderById/:orderId', ordersController.removeOrder)
route.patch('/api/orders/editOrder/:orderById', ordersController.editOrder)

module.exports = route