const mongoose = require("mongoose");


if (process.env.NODE_ENV !== "production") {
  DB_URL = process.env.LOCAL_DB_URL;
}else{
  DB_URL = process.env.DB_URL; //if is application is running locally then use local database 
}

const database = mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

module.exports = database;
