const router = require("express").Router();
const cartControler = require("../controllers/cartController");
const { verifyUser, verifyAdmin } = require("../verifyToken");

router.post("/", cartControler.savecart);

router.get("/show", cartControler.getcart);

// router.get("/cart", verifyUser, cartControler.cart);

module.exports = router;
