const { FormatDate } = require("../helpers/formatDate.js");
const { getPagination, getPagingData } = require("../helpers/pagination.js");

const {
  Jadwal,
  jadwal_asesiskema,
  Asesi,
  Skema,
  Info,
} = require("../models/index.js");

class Jadwal_AsesiSkema_Controller {
  // static showJadwal(req, res, next) {
  //   const { page, size, title } = req.query;
  //   const { limit, offset } = getPagination(page, size);

  //   Jadwal.findAll()
  //     .then((data) => {
  //       Jadwal.findAndCountAll({
  //         limit,
  //         offset,
  //       }).then((data) => {
  //         const response = getPagingData(data, page, limit);
  //         res.send(response);
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }

  static showJadwal(req, res, next) {
    jadwal_asesiskema
      .findAll({
        include: [
          {
            model: Asesi,
            as: "asesis",
          },
        ],
      })
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static getJadwalById(req, res, next) {
    let id = req.params.id;
    console.log(req.params.id, "params");
    jadwal_asesiskema
      .findAll({
        where: { id_jadwal: id },
        include: [
          {
            model: Jadwal,
            as: "jadwal",
          },
          {
            model: Skema,
            as: "dataskema",
          },
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
    console.log("masuk create jadwal asesiskema");
    let idJadwal = req.params.idJadwal;
    console.log(req.body);
    // let input = {
    //   id_jadwal: req.body.id_jadwal,
    //   id_skema: req.body.id_skema,
    //   id_asesis: req.body.id_asesis,
    // };
    // jadwal_asesiskema
    //   .create(input)
    //   .then((data) => {
    //     res.status(201).json({ data });
    //   })
    //   .catch((err) => {
    //     console.log(err, "eror");
    //   });
    //ini bulk insert
    Jadwal.findOne({ where: { id: idJadwal } })
      .then((tgl) => {
        console.log(tgl);
        jadwal_asesiskema
          .bulkCreate(req.body.data)
          .then((data) => {
            console.log(data, "databulk");
            data.map((as) => {
              console.log(as.id_asesis);
              as.id_asesis.map((idAs) => {
                Info.create({
                  id_asesi: idAs,
                  deskripsi_info: `Jadwal ${tgl.tipe} akan dilaksanakan pada ${
                    new Date(tgl.tgl).toISOString().split("T")[0]
                  } di ${tgl.tuk}`,
                  info_status: `Info Penjadwalan ${tgl.tipe}`,
                });
              });
            });
            res.status(201).json({ data });
          })
          .catch((err) => {
            console.log(err, "eror");
          });
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
    jadwal_asesiskema
      .update(input, { where: { id } })
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static deleteJadwal(req, res, next) {
    let id = req.params.id;
    jadwal_asesiskema
      .destroy({ where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Jadwal_AsesiSkema_Controller;
