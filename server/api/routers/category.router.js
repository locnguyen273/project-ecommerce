var express = require("express");
var router = express.Router();
const Category = require("../controllers/category.controller");

router.get("/", Category.index);

module.exports = router;
