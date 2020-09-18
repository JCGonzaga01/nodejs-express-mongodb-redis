import mongoose from "mongoose";
import { CountrySchema } from "../models/countryModel.js";

const Country = mongoose.model("Country", CountrySchema);

export const addNewCountry = (req, res) => {
  let newCountry = new Country(req.body);

  newCountry.save((err, countryRes) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (err) res.send(err);
    else res.send(countryRes);
  });
};

export const getCountries = (req, res) => {
  Country.find({}, (err, countryRes) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (err) res.send(err);
    else res.send(countryRes);
  });
};

export const getCountryWithId = (redis) => (req, res) => {
  Country.findById(req.params.countryId, (err, countryRes) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (err) res.send(err);
    else {
      setTimeout(() => {
        redis.hmset(
          countryRes._id,
          "name",
          countryRes.name,
          "capital",
          countryRes.capital,
          "remarks",
          countryRes.remarks
        );
        res.send(countryRes);
      }, 3000);
    }
  });
};
