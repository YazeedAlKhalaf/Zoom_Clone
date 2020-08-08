var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var mainRouter = require("./routes/main.route");
var roomRouter = require("./routes/room.route");

var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", mainRouter);
app.use("/room", roomRouter);

module.exports = app;
