require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const UsersRouter = require("./routes/users");
const OrdersRouter = require("./routes/orders");
const ProductRouter = require("./routes/product");
mongoose.connect("mongodb+srv://admin:1111@cluster0.ebc8r8o.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());

const PORT =  5000;

app.listen(PORT || 5050, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({ origin: "*", credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("", UsersRouter);
app.use("", OrdersRouter);
app.use("", ProductRouter);
