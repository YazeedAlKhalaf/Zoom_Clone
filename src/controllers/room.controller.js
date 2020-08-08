const { v4: uuidv4 } = require("uuid");

exports.createRoom = function (req, res, next) {
  res.redirect(`${req.originalUrl}/${uuidv4()}`);
};

exports.enterRoom = function (req, res, next) {
  var roomId = req.params.roomId;
  const options = {
    roomId: roomId,
  };
  res.render("room", options);
};
