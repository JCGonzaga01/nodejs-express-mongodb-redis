"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _crmRoutes = require("./src/routes/crmRoutes.js");

var _crmRoutes2 = _interopRequireDefault(_crmRoutes);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 4000;

// Mongoose Connection
_mongoose2.default.Promise = global.Promise;
/**
 * use "mongodb://{MongoDB name at Docker-compose}/{DB Name}" if run via Docker
 * use "mongodb://localhost/{DB Name}" if run locally
 */
_mongoose2.default.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Body-Parser Set-up
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

(0, _crmRoutes2.default)(app);

// Serving static files
app.use(_express2.default.static("static"));

app.use((0, _cors2.default)());

app.get("/", function (req, res) {
  res.send("Node and express server running on port " + PORT);
});

app.listen(PORT, function () {
  return console.log("Your server is running on port " + PORT + "!");
});