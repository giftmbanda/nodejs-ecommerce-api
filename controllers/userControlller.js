const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const User = require("../models/userModel");
//const { registerValidation, loginValidation } = require("../validation");
const JWT_KEY = process.env.JWT_KEY;

// signup
exports.signUp = async (req, res, next) => {
  //const { error } = registerValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (emailExist) return res.status(400).send({ message: "Email already exist!" });

  try {
    const newUser = await createUser(req);
    const savedUser = await newUser.save(); // await createUser(req).save();
    res.status(200).send({ message: "User created successfully!", userId: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

// login
exports.logIn = async (req, res) => {
  //const { error } = loginValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
  if (!foundUser) return res.status(400).send({ message: "Email is not found" });

  try {
    const isMatch = await bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch) return res.status(400).send({ message: "invalid password" });

    // create and assign jwt
    const token = await jwt.sign({ _id: foundUser._id }, JWT_KEY);
    res.header("auth-token", token).send({ message: "logged in", token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }); // the `await` is very important here!
    // findOneAndUpdate returns a document if found or null if not found

    if (!updatedUser) {
      return res.status(400).send({ message: "Could not update user" });
    }
    return res.status(200).send({ message: "User updated successfully" });

  } catch (error) {
    return res.status(400).send({ error: "An error has occured, unable to update user" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.params.userId}); // the `await` is very important here!

    if (!deletedUser) {
      return res.status(400).send({ message: "Could not delete user" });
    }
    return res.status(200).send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    return res.status(400).send({ error: "An error has occured, unable to delete user" });
  }
};

exports.data = async (req, res) => {
  res.json({
    posts: {
      title: "my first post user",
      discription: "random data you not acess",
    },
  });
};

async function createUser(req) {
  const hashPassword = await bcrypt.hashSync(req.body.password, 10);
  return new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    phonenumber: req.body.phonenumber,
  });
}
