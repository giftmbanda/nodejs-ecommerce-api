const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
// npm install parckage --save
// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes which should handle requests
app.use("/api/user", userRoute);
// Handle Error Requests

app.get("/", (req, res) => {
  console.log('API IS NOW WORKING');
  res.send('API IS NOW WORKING');
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
