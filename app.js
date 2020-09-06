const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const categoryRoute = require("./routes/cateRoute");
const productRoute = require("./routes/prodRoute");
const cartRoute = require("./routes/cartRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const swaggerDocument = require("./swagger.json");


// npm install mongoose-paginate --save
// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes which should handle requests
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //still working on it
app.use("/v1/products", productRoute);
app.use("/v1/cate", categoryRoute);
app.use("/v1/cart", cartRoute);
app.use("/v1/admin", adminRoute);
app.use("/v1/user", userRoute);
// Handle Error Requests

app.get("/", (req, res) => {
  res.send('API IS NOW WORKING, append "/v1/docs" to the current url to access API documentation');
});

// Handle Error Requests
app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error });
});

module.exports = app;
