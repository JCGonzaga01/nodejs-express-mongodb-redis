"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ContactSchema = exports.ContactSchema = new Schema({
  firstName: {
    type: String,
    required: "Enter a first name"
  },
  lastName: {
    type: String,
    required: "Enter a last name"
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: Number
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});