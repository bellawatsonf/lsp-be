const {
  APL01,
  Asesi,
  Kriteria_UnitKerja,
  Admin,
  asesi_skema,
  Skema,
  Unit_Kompetensi,
  Info,
} = require("../models/index.js");

class APL01_Controller {
  static showAPL01(req, res, next) {
    APL01.findAll({
      include: [
        // { model: Asesi, as: "Asesis" },
        { model: Admin, as: "admins" },
        {
          model: asesi_skema,
          as: "asesi_skema",
          include: [
            {
              model: Skema,
              as: "skema",
            },
            {
              model: Asesi,
              as: "asesi",
            },
          ],
        },
      ],
    })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
  static createAPL01(req, res, next) {
    console.log("masuk apl01", req.body.id_asesi);
    let input = {
      id_asesi: req.body.id_asesi,
      id_admin: req.body.id_admin,
      id_asesi_skema: req.body.id_asesi_skema,
      rekomendasi_sebagai_asesi: req.body.rekomendasi_sebagai_asesi,
      status_ujikom: req.body.status_ujikom,
    };
    console.log(input);
    APL01.create(input)
      .then((data) => {
        // res.status(201).json({ data });
        Info.create({
          info_status: "Data Asesi",
          id_asesi: req.body.id_asesi,
          deskripsi_info: "Permohonan Sertifikasi Anda Terverifikasi",
        })
          .then((info) => {
            res.status(200).json({ info });
            Asesi.findOne({ where: { id: req.body.id_asesi } })
              .then(() => {
                Asesi.update(
                  { status_pembayaran: "paid" },
                  { where: { id: req.body.id_asesi } }
                )
                  .then((result) => {
                    // res.status(200).json({ msg: "Berhasil memperbaiki data" });
                    Info.crate({
                      deskripsi_info:
                        "Pembayaran sertifikasi anda terverifikasi",
                      status: "Data Asesi",
                      id_asesi: req.body.id_asesi,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((eror) => console.log(eror));
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
  static showAPL01ById(req, res, next) {
    let id = req.params.id;
    APL01.findOne({
      where: { id },
      include: [
        // { model: Asesi, as: "Asesis" },
        { model: Admin, as: "admins" },
        {
          model: asesi_skema,
          as: "asesi_skema",
          include: [
            {
              model: Skema,
              as: "skema",
              include: [{ model: Unit_Kompetensi, as: "unitkompetensi" }],
            },
            {
              model: Asesi,
              as: "asesi",
            },
          ],
        },
      ],
    })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static showAPL01ByUser(req, res, next) {
    let id = req.params.id;
    console.log(id, "id-asesi");
    APL01.findOne({
      where: { id_asesi: id },
      include: [
        // { model: Asesi, as: "Asesis" },
        { model: Admin, as: "admins" },
        {
          model: asesi_skema,

          as: "asesi_skema",
          // where: { id_asesi: id },
          include: [
            {
              model: Skema,
              as: "skema",
              include: [
                {
                  model: Unit_Kompetensi,
                  as: "unitkompetensi",
                  include: [
                    {
                      model: Kriteria_UnitKerja,
                      as: "kriteria_unitkerja",
                    },
                  ],
                },
              ],
            },
            {
              model: Asesi,
              as: "asesi",
            },
          ],
        },
      ],
    })
      .then((data) => {
        console.log(data, "dataaplbyuser");
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
  static showAPL01ByAllUser(req, res, next) {
    let id = req.params.id;
    console.log(id, "id-asesi");
    APL01.findAll({
      where: { id_asesi: id },
      include: [
        // { model: Asesi, as: "Asesis" },
        { model: Admin, as: "admins" },
        {
          model: asesi_skema,

          as: "asesi_skema",
          // where: { id_asesi: id },
          include: [
            {
              model: Skema,
              as: "skema",
              include: [{ model: Unit_Kompetensi, as: "unitkompetensi" }],
            },
            {
              model: Asesi,
              as: "asesi",
            },
          ],
        },
      ],
    })
      .then((data) => {
        console.log(data, "dataaplbyuser");
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = APL01_Controller;
