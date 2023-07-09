const { Unit_Kompetensi } = require("../models/index.js");

class Unit_Kompetensi_Controller {
  static show_Unit_Kompetensi(req, res, next) {
    Unit_Kompetensi.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
  static create_Unit_Kompetensi(req, res, next) {
    let input = {
      no_Unit_Kompetensi: req.body.no_Unit_Kompetensi,
      nama_Unit_Kompetensi: req.body.nama_Unit_Kompetensi,
    };
    Unit_Kompetensi.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = Unit_Kompetensi_Controller;
