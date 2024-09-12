const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/User");
const md5 = require("md5");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/v1/auth/login", async (req, res) => {
  try {
    await User.create(req.body);
    const token = md5(req.body.id_card, req.body.password);
    console.log(req.body);

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("express berhasil terhubung");
});

mongoose
  .connect(
    "mongodb+srv://iqballazuardi07:1u5jXE4VjeUOPBsz@lks.pnx3w.mongodb.net/?retryWrites=true&w=majority&appName=lks"
  )
  .then(() => console.log("database connected"));
