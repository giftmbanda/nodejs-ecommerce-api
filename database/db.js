const mongoose = require("mongoose");

let DB_URL="";

if (process.env.NODE_ENV !== "production") {
  DB_URL = process.env.LOCAL_DB_URL; //if application is running locally then use local database 
}else{
  DB_URL = process.env.DB_URL; 
}

const database = mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

module.exports = database;
