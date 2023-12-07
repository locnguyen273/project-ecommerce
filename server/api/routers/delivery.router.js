var express = require("express");
var router = express.Router();
const Delivery = require("../controllers/delivery.controller");

router.post("/", Delivery.post_delivery);
router.get("/:id", Delivery.get_delivery);

module.exports = router;
