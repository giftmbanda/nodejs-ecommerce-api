const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProdController = require("../controllers/prodController");
//const { verifyUser, verifyAdmin } = require("../verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post("/", upload.single("productImage"), ProdController.createProduct);

router.get("/show", ProdController.getProducts);

module.exports = router;
