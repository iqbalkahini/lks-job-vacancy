const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name_company: {
    type: String,
  },
  address: {
    type: String,
  },
  status: { type: Boolean, default: false },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
