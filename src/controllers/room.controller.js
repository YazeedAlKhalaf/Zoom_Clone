exports.index = function (req, res, next) {
  var roomId = req.params.roomId;
  res.render("room", { roomId: roomId });
};
