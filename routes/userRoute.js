const router = require("express").Router();
const userControler = require("../controllers/userControlller");
const { verifyUser, verifyAdmin } = require("../verifyToken");

router.post("/", userControler.signUp);

router.post("/login", userControler.logIn);

router.patch('/:userId', verifyUser, userControler.updateUser);

router.delete('/:userId', userControler.deleteUser);

router.get("/data", userControler.data);

module.exports = router;
