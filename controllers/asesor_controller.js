const { encrypt } = require("../middleware/bcrypt.js");
const { Asesor } = require("../models/index.js");

class Asesor_Controller {
  static showAsesor(req, res, next) {
    Asesor.findAll()
      .then((data) => {
        res.status(200).json({ data });
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
