const mongoose = require("mongoose");

const user = mongoose.Schema({
  no_ktp: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^\d{16}$/.test(v);
      },
      message: "Atribut harus memiliki 16 digit",
    },
  },
  password: { type: String, required: true },
});

const User = mongoose.model("User", user);
module.exports = User;
