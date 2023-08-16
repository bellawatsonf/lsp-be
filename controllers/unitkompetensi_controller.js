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
  static getUnitKompetensiById(req, res, next) {
    let id = req.params.id;
    console.log(id, "idservice");
    Unit_Kompetensi.findOne({
      where: { id },
      include: [
        {
          model: Unit_Kompetensi,
          as: "unitkompetensi",
          include: [{ model: Kriteria_UnitKerja, as: "kriteria_unitkerja" }],
        },
      ],
    })
      .then((data) => {
        console.log(data, "dataservice");
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static editUnitKompetensi(req, res, next) {
    let id = req.params.id;
    console.log(id);
    let input = {
      kode_unit: req.body.kode_unit,
      judul_unit: req.body.judul_unit,
      id_skema: req.body.id_skema,
    };
    console.log(input, "inputskemaw");
    Unit_Kompetensi.update(input, { where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil diubah", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteUnitKompetensi(req, res, next) {
    let id = req.params.id;
    console.log(id, "idprm");
    Unit_Kompetensi.destroy({ where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Unit_Kompetensi_Controller;
