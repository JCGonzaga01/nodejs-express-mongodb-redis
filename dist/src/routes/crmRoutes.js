"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ioredis = require("ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

var _crmController = require("../controllers/crmController.js");

var _countryController = require("../controllers/countryController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redis = new _ioredis2.default({
  // password: "p@ssw0rd",
  // Add host: "redis" if run via docker
  // host: "redis",
});

var routes = function routes(app) {
  app.route("/testrediscon").get(function (req, res) {
    redis.set("puff", "the mighty dragon");
    console.log("puff");
    var resultRedis = "None";
    redis.get("puff", function (err, result) {
      console.log(result);
      resultRedis = "The result is: Puff, " + result;
      res.send(resultRedis);
    });
  });

  app.route("/contact").get(function (req, res, next) {
    // Middleware
    console.log("Request from: " + req.originalUrl);
    console.log("Request type: " + req.method);
    // console.log(`Resolve: ${res}`);
    next();
  }, _crmController.getContacts)
  // (req, res, next) => {
  //   return res.send("GET request successful!");
  // }
  .post(_crmController.addNewContact);

  app.route("/contact/:contactID").put(_crmController.updateContact).delete(_crmController.deleteContact).get(function (req, res, next) {
    // Middleware
    console.log("Request from: " + req.originalUrl);
    console.log("Request type: " + req.method);
    // console.log(`Resolve: ${res}`);
    redis.hgetall(req.params["contactID"], function (err, result) {
      if (!!Object.keys(result).length) {
        console.log("Result:");
        console.log(result);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(result);
      } else {
        next();
      }
    });
  }, (0, _crmController.getContactWithID)(redis));

  app.route("/country").get(function (req, res, next) {
    // Middleware
    console.log("Request from: " + req.originalUrl);
    console.log("Request type: " + req.method);
    // console.log(`Resolve: ${res}`);
    next();
  }, _countryController.getCountries).post(_countryController.addNewCountry);

  app.route("/country/:countryId").get(function (req, res, next) {
    // Middleware
    console.log("Request from: " + req.originalUrl);
    console.log("Request type: " + req.method);
    // console.log(`Resolve: ${res}`);
    redis.hgetall(req.params["contactID"], function (err, result) {
      if (!!Object.keys(result).length) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(result);
      } else {
        next();
      }
    });
  }, (0, _countryController.getCountryWithId)(redis));
};

exports.default = routes;