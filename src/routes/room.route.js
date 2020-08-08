var express = require("express");
var router = express.Router();
const roomController = require("../controllers/room.controller");

/* GET create room page */
router.get("/", roomController.createRoom);

/* GET room page */
router.get("/:roomId", roomController.enterRoom);

module.exports = router;
