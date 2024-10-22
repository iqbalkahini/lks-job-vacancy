const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name_company: {
    type: String,
  },
  address: {
    type: String,
  },
  status: { type: Array },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
