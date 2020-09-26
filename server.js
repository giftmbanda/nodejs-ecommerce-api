const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require("./database/db"); //import the database

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const http = require("http");
// const app = require("./app");
// const path = require("path");
// const express = require("express");
// const app = express();
// const server = http.createServer(app);

// const publicPath = path.join(__dirname, "uploads");
// const port = process.env.PORT || 3000;
// require("./database/db"); //import the database

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// app.use(express.static(publicPath));

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
