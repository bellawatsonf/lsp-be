const { Kriteria_UnitKerja } = require("../models/index.js");

class Kriteria_UnitKerja_Controller {
  static show_Kriteria_UnitKerja(req, res, next) {
    Kriteria_UnitKerja.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
  static create_Kriteria_UnitKerja(req, res, next) {
    let input = {
      elemen: req.body.elemen,
      id_unit_kompetensi: req.body.id_unit_kompetensi,
      kriteriakerja: req.body.kriteriakerja,
    };
    Kriteria_UnitKerja.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = Kriteria_UnitKerja_Controller;
