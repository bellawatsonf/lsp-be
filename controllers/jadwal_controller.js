const { FormatDate } = require("../helpers/formatDate.js");
const { getPagination, getPagingData } = require("../helpers/pagination.js");
const { Jadwal } = require("../models/index.js");

class Jadwal_Controller {
  static showJadwal(req, res, next) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);

    Jadwal.findAll()
      .then((data) => {
        Jadwal.findAndCountAll({
          limit,
          offset,
        }).then((data) => {
          const response = getPagingData(data, page, limit);
          res.send(response);
        });
      })
      .catch((err) => console.log(err));
  }

  static getJadwalById(req, res, next) {
    let id = req.params.id;
    console.log(req.params.id, "params");
    Jadwal.findOne({
      where: { id },
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
    console.log(req.body.tgl, req.body.tipe);
    let judul = req.body.tipe + "_" + req.body.tgl;
    let input = {
      nama_jadwal: judul,
      tgl: req.body.tgl,
      tuk: req.body.tuk,
      tipe: req.body.tipe,
    };
    console.log(input);
    Jadwal.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static editJadwal(req, res, next) {
    let id = req.params.id;
    console.log(req.body.tgl, req.body.tipe);
    let judul = req.body.tipe + "_" + req.body.tgl;
    let input = {
      nama_jadwal: judul,
      tgl: req.body.tgl,
      tuk: req.body.tuk,
      tipe: req.body.tipe,
    };
    console.log(input);
    Jadwal.update(input, { where: { id } })
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static deleteJadwal(req, res, next) {
    let id = req.params.id;
    Jadwal.destroy({ where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Jadwal_Controller;
