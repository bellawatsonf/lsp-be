const {
  Kriteria_UnitKerja,
  Unit_Kompetensi,
  Skema,
} = require("../models/index.js");

class Kriteria_UnitKerja_Controller {
  static show_Kriteria_UnitKerja(req, res, next) {
    Kriteria_UnitKerja.findAll({
      include: [
        {
          model: Unit_Kompetensi,
          as: "Unit_Kompetensi",
          include: [{ model: Skema }],
        },
      ],
    })
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
    console.log(input, "kriteria");
    Kriteria_UnitKerja.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static getKriteriaKerjaById(req, res, next) {
    let id = req.params.id;
    console.log(id, "idservice");
    Kriteria_UnitKerja.findOne({
      where: { id },
      // include: [
      //   {
      //     model: Unit_Kompetensi,
      //     as: "unitkompetensi",
      //     include: [{ model: Kriteria_UnitKerja, as: "kriteria_unitkerja" }],
      //   },
      // ],
    })
      .then((data) => {
        console.log(data, "dataservice");
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static editKriteriaKerja(req, res, next) {
    let id = req.params.id;
    console.log(id);
    let input = {
      elemen: req.body.elemen,
      id_unit_kompetensi: req.body.id_unit_kompetensi,
      kriteriakerja: req.body.kriteriakerja,
    };
    console.log(input, "inputeditkriteria");
    Kriteria_UnitKerja.update(input, { where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil diubah", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteKriteriaKerja(req, res, next) {
    let id = req.params.id;
    console.log(id, "idprm");
    Kriteria_UnitKerja.destroy({ where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Kriteria_UnitKerja_Controller;
