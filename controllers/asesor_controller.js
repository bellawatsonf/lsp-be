const { getPagingData, getPagination } = require("../helpers/pagination.js");
const { encrypt } = require("../middleware/bcrypt.js");
const { Asesor, Skema } = require("../models/index.js");

class Asesor_Controller {
  static showAsesor(req, res, next) {
    const { page, size, title } = req.query;
    console.log(typeof page, "pg");
    const { limit, offset } = getPagination(page, size);
    Asesor.findAll({
      include: [
        {
          model: Skema,
          as: "Skema",
        },
      ],
    })
      .then((data) => {
        // res.status(200).json({ data });
        Asesor.findAndCountAll({
          include: [
            {
              model: Skema,
              as: "Skema",
            },
          ],
          limit,
          offset,
        })
          .then((data) => {
            const response = getPagingData(data, page, limit);
            res.send(response);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving asesor",
            });
          });
      })
      .catch((err) => console.log(err));
  }

  static createAsesor(req, res, next) {
    let input = {
      no_Asesor: req.body.no_Asesor,
      nama_Asesor: req.body.nama_Asesor,
      email: req.body.email,
      password: encrypt(req.body.password),
      role: "asesor",
      ttd_asesor:
        req.files.ttd_asesor[0].destination +
        "/" +
        req.files.ttd_asesor[0].filename,
    };
    Asesor.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static editAsesor(req, res, next) {
    let input = {
      no_Asesor: req.body.no_Asesor,
      nama_Asesor: req.body.nama_Asesor,
    };
    Asesor.update(input)
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil diubah", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteAsesor(req, res, next) {
    Asesor.delete()
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Asesor_Controller;
