// const { object } = require("joi");
// const Orders = require("../models/orders");
// const Products = require("../models/products");
// const { errorFunction } = require("../utils/errorFunction");

const { Object } = require("joi");
const Carts = require("../models/cart");
const Products = require("../models/product");
const Users = require("../models/users");
const errorFunction = require("../utils/errorFunction");

const addOrderProduct = async (req, res, next) => {
  try {
    console.log(req.body);

    const quantity = req.body.quantity;
    const user = await Users.findById(req.body.userId);
    const product = await Products.findById(req.body.productId);
    const requestProduct = { quantity: product.quantity - quantity };

    if (!user) { 
      return res.json(
        errorFunction(true, 204, "This user Id have not in the database")
      ); 
    }
    if (!product) {
      return res.json(
        errorFunction(true, 204, "This product Id have not in the database")
      );
    } else {
      if (quantity <= product.quantity) {
        // Add order
        const newOrder = await Carts.create(req.body);
        if (newOrder) {
          // Update product
          Products.findByIdAndUpdate(req.body.productId, requestProduct).then(
            (data) => {
              if (data) {
                res.status(201);
                return res.json(
                  errorFunction(false, 201, "Order Created", newOrder)
                );
              } else {
                return res.json(errorFunction(true, 400, "Bad request"));
              }
            }
          );
        } else {
          res.status(403);
          return res.json(errorFunction(true, 403, "Error Creating Order"));
        }
      } else {
        // Show message
        return res.json(
          errorFunction(
            true,
            206,
            "The quantity is greater than quantity in the stock"
          )
        );
      }
    }
  } catch (error) {
    return res.json(errorFunction(true, 400, "Bad request"));
  }
};

// Create Order

// Get all Orders
const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Carts.find();

    if (allOrders.length > 0) {
      res
        .status(201)
        .json(errorFunction(false, 201, "successfuly", allOrders.reverse()));
    } else {
      res.status(201).json(errorFunction(false, 201, "no results", []));
    }
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "no results", []));
  }
};
// get product by id
const getOrderById = async (req, res, next) => {
  const orderById = req.params.orderById;
  try {
    const order = await Carts.findById(orderById);
    if (order) {
      res.status(201).json(errorFunction(false, 201, "successfuly", order));
    } else {
      res
        .status(201)
        .json(
          errorFunction(false, 204, "Order dose not exit in the database", [])
        );
    }
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Bad request"));
  }
};
/// editOrrder

const editOrder = (req, res, next) => {
  try {
    let orderById = req.params.orderById;
    console.log(orderById);
    
    Carts.findByIdAndUpdate(orderById, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res
          .status(404)
          .json(
            errorFunction(
              false,
              404,
              `Cannot update Order with id=${orderById}. Maybe Order was not found!`
            )
          );
      } else {
        getOrderById(req, res, next);
      }
    });
  } catch (error) {
    res.status(400).json(errorFunction(true, 400, "Bad request"));
  }
};

const removeOrder = (req, res) => {
  try {
    let orderId = req.params.orderId;
    console.log(orderId);
    Carts.findByIdAndRemove(orderId).then(() => {
      res
        .status(200)
        .json(errorFunction(false, 200, "Order Deleted Successfully!"));
    });
  } catch (error) {
    res
      .status(400)
      .json(errorFunction(true, 400, "User Deleted Unsuccessfully!"));
  }
};



const getOrderByUserId = async (req, res, next) => {
  const userId = req.params.userId
  try {
    const filter = {
      $and: [
        {
          userId: {
            $regex: userId,
            $options: '$i',
          },
        },
      ],
    }
    const orders = await Carts.find(filter)
    if (orders) {
      res.status(200).json({
        statusCode: 200,
        total: orders.length,
        orders: orders.reverse(),
      })
    } else {
      res.json({
        statusCode: 204,
        message: 'This order Id have not in the database',
        order: {},
      })
    }
  } catch (error) {
    res.status(400)
    return res.json(errorFunction(true, 400, 'Bad request'))
  }
}

module.exports = {
  addOrderProduct,
  getAllOrders,
  getOrderById,
  editOrder,
  removeOrder,
  getOrderByUserId
};
