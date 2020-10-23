"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountrySchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CountrySchema = exports.CountrySchema = new Schema({
  name: {
    type: String,
    required: "Enter country name"
  },
  capital: {
    type: String,
    required: "Enter country's capital"
  },
  remarks: {
    type: String,
    required: "Enter country's remarks"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});