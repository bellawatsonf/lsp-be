const { getPagination, getPagingData } = require("../helpers/pagination.js");
const { asesi_skema, Skema, Asesi, Info } = require("../models/index.js");
var Sequelize = require("sequelize");
class asesi_skema_Controller {
  static show_Asesi_Skema(req, res, next) {
    let { page, size, statusCek } = req.query;
    const { limit, offset } = getPagination(page, size);
    asesi_skema
      .findAll({
        where: { status_cek: statusCek },

        include: [
          {
            model: Asesi,
            as: "asesi",
          },
          { model: Skema, as: "skema" },
        ],
        limit,
        offset,
        order: [["updatedAt", "DESC"]],
      })
      .then((data) => {
        asesi_skema
          .findAndCountAll({
            where: { status_cek: statusCek },

            include: [
              {
                model: Asesi,
                as: "asesi",
              },
              { model: Skema, as: "skema" },
            ],
            limit,
            offset,
            order: [["updatedAt", "DESC"]],
          })
          .then((data) => {
            const response = getPagingData(data, page, limit);
            res.send(response);
            // res.status(200).json({ data });
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

  static getAsesiSkemaById(req, res, next) {
    let id = req.params.id;
    console.log(id, "idparams");
    // let search = req.params.search;
    // console.log(req.params.id, "params");
    // let opt = {
    //   id_asesi: id,
    // };
    // if (search) {
    //   opt.status_cek = search;
    // }
    asesi_skema
      .findOne({
        where: { id_asesi: id },
        // limit: 1,
        // order: [["updatedAt", "ASC"]],
        include: [
          {
            model: Asesi,
            as: "asesi",
          },
          { model: Skema, as: "skema" },
        ],
      })
      .then((data) => {
        // console.log(data, "dataasesiskema");
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getAsesiSkemaDetail(req, res, next) {
    let id = req.params.id;
    console.log(req.params.id, "params");
    asesi_skema
      .findOne({
        where: { id },
        include: [
          {
            model: Asesi,
            as: "asesi",
          },
          { model: Skema, as: "skema" },
        ],
      })
      .then((data) => {
        // console.log(data);
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static create_asesi_skema(req, res, next) {
    // const t = Sequelize.transaction();
    let input = {
      id_asesi: req.body.id_asesi,
      id_skema: req.body.id_skema,
      jenis_paket: req.body.jenis_paket,
      status_cek: req.body.status_cek,
    };
    Skema.findOne({ where: { id: req.body.id_skema } })
      .then((dataSkema) => {
        if (+dataSkema.kuota > 0) {
          asesi_skema
            .create(input)
            .then((data) => {
              let kuota = +dataSkema.kuota - 1;
              Skema.update(
                { kuota: kuota.toString() },
                { where: { id: req.body.id_skema } }
              )
                .then((hasil) => {
                  res.status(200).json(hasil);
                  // if (req.body.jenis_paket === "ujikom") {
                  Info.create({
                    id_asesi: req.body.id_asesi,
                    info_status:
                      "Anda berhasil melakukan pendaftaran sertifikasi",
                    deskripsi_info: `Skema : ${dataSkema.nama_skema} dengan Jenis Paket : ${req.body.jenis_paket}`,
                  })
                    .then((dataInfo) => {
                      res.status(200).json({ msg: "berhasil membuat info" });
                    })
                    .catch((errorinfo) => console.log(errorinfo));
                  // }
                })
                .catch((eror) => {
                  console.log(eror, "eror");
                });
            })

            .catch((error) => console.log(error));
        } else {
          res.status(403).json({ msg: "Kuota skema sudah penuh" });
        }
      })
      .catch((err) => {
        console.log(err, "eror");
      });

    // asesi_skema
    //   .create(input)
    //   .then((data) => {
    //     // res.status(201).json({ data });
    //     Skema.findOne({ where: { id: req.body.id_skema } })
    //       .then((dataSkema) => {
    //         // res.status(200).json({ dataSkema });
    //         let kuota = +dataSkema.kuota - 1;
    //         console.log(kuota);
    //         console.log(typeof kuota.toString());
    //         if (+dataSkema.kuota > 0) {
    //           Skema.update(
    //             { kuota: kuota.toString() },
    //             { where: { id: req.body.id_skema } }
    //           )
    //             .then((hasil) => {
    //               res.status(200).json(hasil);
    //             })
    //             .catch((err) => {
    //               console.log(err, "eror");
    //             });
    //         } else {
    //           res.status(403).json({ msg: "kuota sudah penuh" });
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err, "eror");
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err, "eror");
    //   });
  }

  static updateStatusCekAsesiSkema(req, res, next) {
    // console.log(req.body.status_pembayaran);
    console.log("masuk update status");
    let id = req.params.id;
    let input = {
      status_cek: req.body.status_cek,
    };

    asesi_skema
      .update(input, { where: { id }, returning: true })
      .then((data) => {
        res.status(200).json({ data });
        console.log(data[1][0].id_asesi);
        if (req.body.status_cek !== "revisi") {
          Asesi.update(
            { where: { id: data[1][0].id_asesi } },
            { alasan_penolakan: null }
          )
            .then(() => {
              res.status(200).json({ msg: "berhasil memperbaiki dat" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // else {
        //   Asesi.update(input, { where: { id: data[1][0].id_asesi } })
        //     .then(() => {
        //       res.status(200).json({ msg: "berhasil memperbaiki data" });
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // }
        // if (req.body.status_cek !== "revisi") {
        //   // Info.create({info_status:'Data Asesi',deskripsi_info:'pesan tolaknya sesuai sama inputan'})
        // } else if (req.body.status_cek === "terima") {
        //   Info.create({
        //     id_asesi: data[1][0].id_asesi,
        //     info_status: "Data Asesi",
        //     deskripsi_info: "Data Asesi Terverifikasi",
        //     id_asesi,
        //   });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteAsesiSkema(req, res, next) {
    console.log("masukdelete");
    let id = req.params.id;
    console.log("masuk delete", id);
    asesi_skema
      .findOne({ where: { id } })
      .then((data) => {
        console.log(data, "asesiskema");
        Skema.findOne({ where: { id: data.id_skema } }).then((dataskema) => {
          // console.log(dataskema, "dataskema");
          asesi_skema
            .destroy({ where: { id }, returning: true })
            .then(() => {
              let kuota = +dataskema.kuota + 1;
              Skema.update(
                { kuota: kuota.toString() },
                { where: { id: dataskema.id } }
              )
                .then(() => {
                  // res.status(200).json({ msg: "Data berhasil dihapus" });
                  Info.destroy({ where: { id_asesi: data.id_asesi } })
                    .then((info) => {
                      Asesi.destroy({ where: { id: data.id_asesi } })
                        .then((deleteasesi) => {
                          res
                            .status(201)
                            .json({ msg: "Berhasil memperbaharui data" });
                        })
                        .catch((err) => {
                          console.log(err);npm
                        });
                      // res
                      //   .status(201)
                      //   .json({ msg: "Berhasil memperbaharui data" });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((errdestroy) =>
                  console.log(errdestroy, "errordestroyasesiskema")
                );
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = asesi_skema_Controller;
