const Products = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const PAGE_SIZE = 12;
    var page = req.query.page;
    if (page) {
      page = parseInt(page);
      var skip = (page - 1) * PAGE_SIZE;
      const Product = await Products.find({}).skip(skip).limit(PAGE_SIZE);
      const totalProduct = await Products.find({});
      const total = Math.ceil(totalProduct.length / PAGE_SIZE);
      res.status(200).json({ Product, total, totalProduct });
    } else {
      const Product = await Products.find({});
      const total = Math.ceil(Product.length / PAGE_SIZE);
      res.status(200).json({ Product, total });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getProductById = (req, res) => {
  try {
    const id = req.params.id;
    Products.findById(id).then((response) => {
      res.json({
        response,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productBrand,
      type,
      chip,
      ram,
      memory,
      price,
      discount,
      quantity,
      images,
    } = req.body;
    if (
      !productName ||
      !productBrand ||
      !type ||
      !chip ||
      !ram ||
      !memory ||
      !price ||
      !discount ||
      !quantity ||
      !images
    ) {
      res.status(400).json({ message: "Some field not null" });
    }
    let product = await Products(req.body);
    product.save().then(
      res.status(200).json({
        message: "Added product successfully!",
      })
    );
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const searchQuery = new RegExp(`${req.query.q}`, "i");
    const Phones = await Products.find({
      productName: { $regex: searchQuery },
    });
    res.status(201).json(Phones);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const editProduct = (req, res) => {
  try {
    let id = req.params.id;
    Products.findByIdAndUpdate(id, req.body).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const removeProduct = (req, res) => {
  try {
    let id = req.params.id;
    Products.findByIdAndRemove(id).then(() => {
      res.json({
        message: "Product Deleted Successfully!",
      });
    });
  } catch (error) {
    res.json({
      message: "Product Deleted Unsuccessfully!",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  removeProduct,
  searchProduct
};
