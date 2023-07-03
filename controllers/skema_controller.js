const { Skema } = require("../models/index.js");

class Skema_Controller {
  static showSkema(req, res, next) {
    Skema.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static createSkema(req, res, next) {
    let input = {
      no_skema: req.body.no_skema,
      nama_skema: req.body.nama_skema,
    };
    Skema.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static editSkema(req, res, next) {
    let input = {
      no_skema: req.body.no_skema,
      nama_skema: req.body.nama_skema,
    };
    Skema.update(input)
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil diubah", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteSkema(req, res, next) {
    Skema.delete()
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Skema_Controller;
