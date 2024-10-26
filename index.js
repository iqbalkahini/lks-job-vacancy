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

app.get("/job-vacancies/:token", async (req, res) => {
  try {
    const token = req.params.token;
    // mengambil dataJob menggunakan token
    const dataJob = await DataJobPosition.find({ token });
    const dataCompany = await Company.find();

    // untuk validasi data company dan data job
    dataCompany.map((v, i) => {
      v.status.map((d, i) => {
        if (d.token == token) {
          dataJob.map(async (job, i) => {
            if (v.name_company !== job.name_company) {
              const result = await Company.findOneAndUpdate(
                { name_company: v.name_company }, // filter boz
                { $pull: { status: { token: d.token } } }, // Menghapus elemen dari array
                { new: true }
              );
            }
          });
        }
      });
    });

    // jika data job tidak ada maka langsung me-return company
    if (dataJob.length == 0) {
      const company = await Company.find();
      return res.status(200).json({
        message: company,
      });
    }
    // jika datanya ada maka si data job akan diambil nilai name_company menggunakan map lalu data company di update berdasarkan nilai name_company dari dataJob
    if (dataJob.length !== 0) {
      dataJob.map(async (v, i) => {
        const company = await Company.updateMany(
          { name_company: v.name_company },
          {
            status: { token },
          }
        );
      });
    }

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

app.get("/select-position/:token/:name_company", async (req, res) => {
  try {
    const { token, name_company } = req.params;

    if (token !== "") {
      const dataJob = await DataJobPosition.find({ token });
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
      s;
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
