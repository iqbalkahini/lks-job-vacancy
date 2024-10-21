const mongoose = require("mongoose");

const jobPositionSchema = mongoose.Schema({
  name_company: { type: String, required: true },
  Address: {
    type: String,
  },
  Position: { type: Array, required: true },
  Apply_date: { type: Date, require: true, default: Date },
  notes: { type: String },
  token: { type: String, require: true },
});

const DataJobPosition = mongoose.model("Data Job Position", jobPositionSchema);
module.exports = DataJobPosition;
