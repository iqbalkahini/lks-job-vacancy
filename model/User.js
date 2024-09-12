const mongoose = require("mongoose");

const user = mongoose.Schema({
  id_card: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => {
        return /^\d{16}$/.test(v);
      },
      message: "Atribut harus memiliki 16 digit",
    },
  },
  password: { type: Number, required: true },
});

const User = mongoose.model("User", user);
module.exports = User;
