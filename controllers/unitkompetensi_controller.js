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
      kode_unit: req.body.kode_unit,
      judul_unit: req.body.judul_unit,
      id_skema: req.body.id_skema,
    };
    console.log(input, "input");
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
