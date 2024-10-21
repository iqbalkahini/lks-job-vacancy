const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/User");
const DataValidation = require("./model/Validation-data");
const DataJobPosition = require("./model/JobPosition");
const Company = require("./model/Company");
const md5 = require("md5");
const cors = require("cors");

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ no_ktp: req.body.no_ktp });
    const token = md5(req.body.no_ktp);
    if (user) {
      return res.status(200).json({
        token,
      });
    }

    await User.create(req.body);
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/request-validation/:token", async (req, res) => {
  try {
    const dataValidation = await DataValidation.findOne({
      token: req.params.token,
    });

    if (dataValidation != null) {
      return res.status(200).json({
        message: dataValidation,
      });
    }
    if (dataValidation == null) {
      res.status(200).json({
        message: "data tidak ada",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/request-validation", async (req, res) => {
  try {
    await DataValidation.create(req.body.data);
    res.status(200).json({
      message: "data telah dikirim",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/job-vacancies", async (req, res) => {
  try {
    const company = await Company.find();
    res.status(200).json({
      message: company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/job-vacancies/:company", async (req, res) => {
  try {
    const company = await Company.updateOne(
      { name_company: req.params.company },
      { status: true }
    );
    res.status(200).json({
      message: company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/select-position/:token/:name_company", async (req, res) => {
  try {
    const { token, name_company } = req.params;

    if (token !== "") {
      const dataJob = await DataJobPosition.findOne({ token });
      return res.status(200).json({
        message: dataJob,
      });
    }
    if (name_company !== "") {
      const dataJob = await DataJobPosition.findOne({ name_company });
      console.log(dataJob);

      return res.status(200).json({
        message: dataJob,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "data tidak ada",
    });
  }
});

app.post("/select-position", async (req, res) => {
  try {
    const dataJob = await DataJobPosition.create({
      name_company: req.body.name_company,
      Address: req.body.Address,
      Position: req.body.Position,
      notes: req.body.notes,
      token: req.body.token,
    });
    console.log(req.body.name_company);

    res.status(200).json({
      message: "data berhasil di kirim",
    });
  } catch (error) {
    res.status(500).json({
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
