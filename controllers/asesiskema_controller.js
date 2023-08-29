const { asesi_skema, Skema, Asesi, Info } = require("../models/index.js");
var Sequelize = require("sequelize");
class asesi_skema_Controller {
  static show_Asesi_Skema(req, res, next) {
    asesi_skema
      .findAll({
        include: [
          {
            model: Asesi,
            as: "asesi",
          },
          { model: Skema, as: "skema" },
        ],
      })
      .then((data) => {
        res.status(200).json({ data });
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
                  if (req.body.jenis_paket === "ujikom") {
                    Info.create({
                      id_asesi: req.body.id_asesi,
                      info_status: "Pendaftaran",
                      deskripsi_info:
                        "Anda berhasil melakukan pendaftaran sertifikasi",
                    })
                      .then((dataInfo) => {
                        res.status(200).json({ msg: "berhasil membuat info" });
                      })
                      .catch((errorinfo) => console.log(errorinfo));
                  }
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
          // Info.create({info_status:'Data Asesi',deskripsi_info:'pesan tolaknya sesuai sama inputan'})
        } else if (req.body.status_cek === "terima") {
          Info.create({
            id_asesi: data[1][0].id_asesi,
            info_status: "Data Asesi",
            deskripsi_info: "Data Asesi Terverifikasi",
            id_asesi,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteAsesiSkema(req, res, next) {
    let id = req.params.id;
    console.log(id);
    asesi_skema
      .findOne({ where: { id } })
      .then((data) => {
        // console.log(data);
        Skema.findOne({ where: { id: data.id_skema } }).then((dataskema) => {
          console.log(dataskema, "dataskema");
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
                      res
                        .status(201)
                        .json({ msg: "Berhasil memperbaharui data" });
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