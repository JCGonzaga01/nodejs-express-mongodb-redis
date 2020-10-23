"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountryWithId = exports.getCountries = exports.addNewCountry = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _countryModel = require("../models/countryModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Country = _mongoose2.default.model("Country", _countryModel.CountrySchema);

var addNewCountry = exports.addNewCountry = function addNewCountry(req, res) {
  var newCountry = new Country(req.body);

  newCountry.save(function (err, countryRes) {
    res.header("Access-Control-Allow-Origin", "*");
    if (err) res.send(err);else res.send(countryRes);
  });
};

var getCountries = exports.getCountries = function getCountries(req, res) {
  Country.find({}, function (err, countryRes) {
    res.header("Access-Control-Allow-Origin", "*");
    if (err) res.send(err);else res.send(countryRes);
  });
};

var getCountryWithId = exports.getCountryWithId = function getCountryWithId(redis) {
  return function (req, res) {
    Country.findById(req.params.countryId, function (err, countryRes) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      if (err) res.send(err);else {
        setTimeout(function () {
          redis.hmset(countryRes._id, "name", countryRes.name, "capital", countryRes.capital, "remarks", countryRes.remarks);
          res.send(countryRes);
        }, 3000);
      }
    });
  };
};