var express = require("express");
var router = express.Router();
const roomController = require("../controllers/room.controller");

/* GET home page */
router.get("/:roomId", roomController.index);

module.exports = router;
