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
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //still working on it
app.use("/api/products", productRoute);
app.use("/api/cate", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
// Handle Error Requests

// app.get("/", (req, res) => {
//   res.send('API IS NOW WORKING, append "/docs" to the current url to access API documentation');
// });

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
