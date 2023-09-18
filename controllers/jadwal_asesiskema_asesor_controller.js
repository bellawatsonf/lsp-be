const { FormatDate } = require("../helpers/formatDate.js");
const { getPagination, getPagingData } = require("../helpers/pagination.js");

const {
  Jadwal,
  jadwal_asesiskema,
  jadwal_asesiskema_asesor,
  Asesi,
  Skema,
  Asesor,
  InfoAsesor,
  Info,
} = require("../models/index.js");

class Jadwal_AsesiSkema_Asesor_Controller {
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

  static getalljadwal(data, res) {
    let nilai = [];
    nilai.push(data);
    // res.send(data);
    console.log(nilai);
  }
  static showJadwal(req, res, next) {
    jadwal_asesiskema_asesor
      .findAll({
        include: [
          {
            model: Asesor,
            as: "asesor",
          },
          {
            model: jadwal_asesiskema,
            as: "jadwal_asesiskema",
          },
        ],
      })

      .then((data) => {
        res.status(201).json({ data });
        console.log(data);
        // data.map((el) => {
        //   el.jadwal_asesiskema.id_asesis.map((as) => {
        //     Info.create({
        //       id_asesi: as,
        //       info_status: "Informasi Jadwal",
        //       deskripsi_info: "jadwal terbuat",
        //     });
        //   });
        // });
      })

      .catch((err) => console.log(err));
  }

  static getJadwalById(req, res, next) {
    let id = req.params.id;
    console.log(req.params.id, "params");
    jadwal_asesiskema_asesor
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
    let idJadwal = req.params.idJadwal;
    console.log(req.body.data);
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
        jadwal_asesiskema_asesor.bulkCreate(req.body.data).then((data) => {
          console.log(data, "datajadwalasesiasesor");
          data.map((asesor) => {
            jadwal_asesiskema
              .findAll({ where: { id: asesor.id_jadwal_asesiskema } })
              .then((j) => {
                console.log(j, "jads");
                j.map((jd) => {
                  jd.id_asesis.map((ids) => {
                    asesor
                      .findOne({ where: { id_skema: jd.id_skema } })
                      .then((dataAs) => {
                        InfoAsesor.create({
                          id_asesor: asesor.id_asesor,
                          info_status: `Info Penjadwalan Sertifikasi ${tgl.tipe}`,
                          deskripsi_info: `Jadwal ${
                            tgl.tipe
                          } akan dilaksanakan pada ${
                            new Date(tgl.tgl).toISOString().split("T")[0]
                          } di ${tgl.tuk}`,
                        })
                          .then((data) => {
                            // res.status(201).json({ data });
                            Info.create({
                              id_asesi: ids,
                              info_status: `Info Penjadwalan Sertifikasi ${tgl.tipe}`,
                              deskripsi_info: `Jadwal ${
                                tgl.tipe
                              } akan dilaksanakan pada ${
                                new Date(tgl.tgl).toISOString().split("T")[0]
                              } dengan asesesor ${dataAs.nama} di ${tgl.tuk}`,
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      });
                  });
                });
              });
          });
          // data.map((el) => {
          //   console.log(el);
          // jadwal_asesiskema
          //   .findAll({ where: { id: el.id_jadwal_asesiskema } })
          //   .then((h) => {
          //     // console.log(h);
          //     h.map((as) => {
          //       console.log(as);
          //       as.id_asesis.map((dt) => {
          //         Info.create({
          //           id_asesi: dt,
          //           info_status: "Informasi Jadwal",
          //           deskripsi_info: "jadwal terbuat",
          //         });
          //       });
          //     });
          //   });
          // });
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
    jadwal_asesiskema_asesor
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
    jadwal_asesiskema_asesor
      .destroy({ where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getIdJadwal(req, res, next) {
    let idUser = +req.params.id;
    console.log(typeof idUser, "nilaiii");
    jadwal_asesiskema.findAll().then((data) => {
      // console.log(data.id_asesis, "id_asesis");

      data.map((dt) => {
        console.log(dt.id_asesis, "nilaii");

        let nilai = dt.id_asesis.includes(idUser);
        console.log(nilai, "nilai");
        if (nilai) {
          console.log(dt.id, "dataaa");
          jadwal_asesiskema_asesor
            .findAll({ where: { id_jadwal_asesiskema: dt.id } })
            .then((jadwal) => {
              res.status(200).json({ jadwal });
              console.log(jadwal, "jadwal");
            });
        }

        //   dt.id_asesis.map((el) => {
        //     console.log(el, idUser, "dd");
        //     if (idUser === el) {
        //       //   // let idJadwal = el.id

        //       jadwal_asesiskema_asesor
        //         .findOne({ where: { id_jadwal: data.id } })
        //         .then((jadwal) => {
        //           // res.status(200).json({ jadwal });
        //           console.log(jadwal, "jadwal");
        //         });
        //     }
        //   });
      });
    });
  }
}

module.exports = Jadwal_AsesiSkema_Asesor_Controller;
