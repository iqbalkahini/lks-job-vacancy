const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name_company: {
    type: String,
  },
  token: {
    type: String,
    require: false,
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
