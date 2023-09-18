const { getPagination, getPagingData } = require("../helpers/pagination.js");
const { Skema } = require("../models/index.js");
const { Unit_Kompetensi, Kriteria_UnitKerja } = require("../models/index.js");
class Skema_Controller {
  static showSkema(req, res, next) {
    Skema.findAll({
      include: [
        {
          model: Unit_Kompetensi,
          as: "unitkompetensi",
          include: [{ model: Kriteria_UnitKerja, as: "kriteria_unitkerja" }],
        },
      ],
    })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
  static showSkemaWithPaging(req, res, next) {
    const { page, size, title } = req.query;
    console.log(typeof page, "pg");
    const { limit, offset } = getPagination(page, size);
    Skema.findAll()
      .then((data) => {
        // res.status(200).json({ data });
        Skema.findAndCountAll().then((data) => {
          const response = getPagingData(data, page, limit);
          res.send(response);
        });
      })
      .catch((err) =>
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving asesor",
        })
      );
  }
  static createSkema(req, res, next) {
    let input = {
      no_skema: req.body.no_skema,
      nama_skema: req.body.nama_skema,
      kuota: req.body.kuota,
    };
    Skema.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static getSkemaById(req, res, next) {
    let id = req.params.id;
    console.log(id, "idservice");
    Skema.findOne({
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

  static editSkema(req, res, next) {
    let id = req.params.id;
    console.log(id);
    let input = {
      no_skema: req.body.no_skema,
      nama_skema: req.body.nama_skema,
      kuota: req.body.kuota,
    };
    console.log(input, "inputskema");
    Skema.update(input, { where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil diubah", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteSkema(req, res, next) {
    let id = req.params.id;
    console.log(id, "idprm");
    Skema.destroy({ where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Skema_Controller;
