import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CountrySchema = new Schema({
  name: {
    type: String,
    required: "Enter country name",
  },
  capital: {
    type: String,
    required: "Enter country's capital",
  },
  remarks: {
    type: String,
    required: "Enter country's remarks",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
