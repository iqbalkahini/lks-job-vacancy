const mongoose = require("mongoose");

const requestValidationSchema = mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
  },
  job_category: { type: String, required: true },
  job_position: { type: String },
  work_experience: { type: String, require: true },
  work_experience_notes: { type: String },
  reason_accepted: { type: String, required: true },
  validator: { type: String, default: "Fatkhur Cogan" },
  token: { type: String, require: true },
});

const DataValidation = mongoose.model(
  "Data validation",
  requestValidationSchema
);
module.exports = DataValidation;
