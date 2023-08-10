const { FormatDate } = require("../helpers/formatDate.js");
const { Jadwal } = require("../models/index.js");

class Jadwal_Controller {
  static showJadwal(req, res, next) {
    Jadwal.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static getJadwalById(req, res, next) {
    let id = req.params.id;
    console.log(req.params.id, "params");
    Jadwal.findOne({
      where: { id },
      include: [
        {
          model: Jadwal,
          as: "Jadwal",
        },
        { model: Skema, as: "skema" },
      ],
    })
      .then((data) => {
        console.log(data);
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static createJadwal(req, res, next) {
    let input = {
      nama_jadwal: req.body.nama_jadwal,
      tgl_ujian: req.body.tgl_ujian,
      tuk: req.body.tuk,
    };
    Jadwal.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = Jadwal_Controller;
