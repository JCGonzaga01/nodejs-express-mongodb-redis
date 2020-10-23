"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteContact = exports.updateContact = exports.getContactWithID = exports.getContacts = exports.addNewContact = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crmModel = require("../models/crmModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Contact = _mongoose2.default.model("Contact", _crmModel.ContactSchema);

var addNewContact = exports.addNewContact = function addNewContact(req, res) {
  var newContact = new Contact(req.body);

  // contact param is basically the result, just rename it to param to avoid conflict of same param name
  newContact.save(function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

var getContacts = exports.getContacts = function getContacts(req, res) {
  Contact.find({}, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.header("Access-Control-Allow-Origin", "*");
    // setTimeout(() => {
    res.send(contact);
    // }, 5000);
  });
};

var getContactWithID = exports.getContactWithID = function getContactWithID(redis) {
  return function (req, res) {
    console.log(req.params);
    Contact.findById(req.params.contactID, function (err, contact) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      if (err) {
        res.send(err);
      } else {
        setTimeout(function () {
          redis.hmset(contact._id, "firstName", contact.firstName, "lastName", contact.lastName);
          res.send(contact);
        }, 3000);
      }
    });
  };
};

var updateContact = exports.updateContact = function updateContact(req, res) {
  Contact.findOneAndUpdate({ _id: req.params.contactID }, req.body, { new: true, useFindAndModify: false }, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

var deleteContact = exports.deleteContact = function deleteContact(req, res) {
  Contact.findOneAndDelete({ _id: req.params.contactID }, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Succedfully Deleted Contact" });
  });
};