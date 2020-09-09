const router = require('express').Router();
const cateControler = require('../controllers/cateController')
//const { verifyUser, verifyAdmin } = require("../verifyToken"); //new import

router.post('/', cateControler.createCategory);

router.get('/show', cateControler.getCategories);

module.exports = router;