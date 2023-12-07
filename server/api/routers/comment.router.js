var express = require("express");
var router = express.Router();
const Comment = require("../controllers/comment.controller");

router.get("/:id", Comment.index);
router.post("/:id", Comment.post_comment);

module.exports = router;
