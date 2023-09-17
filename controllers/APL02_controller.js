const {
  Apl02,
  Asesi,
  Kriteria_UnitKerja,
  Admin,
  asesi_skema,
  Skema,
  Unit_Kompetensi,
  Info,
  APL01,
  jadwal_asesiskema_asesor,
  jadwal_asesiskema,
  Jadwal,
} = require("../models/index.js");

class APL02_Controller {
  static showAPL02(req, res, next) {
    Apl02.findAll({
      include: [
        {
          model: APL01,
          as: "APL01",
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
        },
        {
          model: jadwal_asesiskema_asesor,
          as: "jadwal_asesiskema_asesor",
          include: [
            {
              model: jadwal_asesiskema,
              as: "jadwal_asesiskema",
              include: [
                {
                  model: Jadwal,
                  as: "jadwal",
                },
              ],
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
  static createAPL02(req, res, next) {
    console.log("masuk APL02", req.body.id_asesi);
    let input = {
      id_jadwal_asesiskema_asesor: req.body.id_jadwal_asesiskema_asesor,
      id_apl01: req.body.id_apl01,
    };
    console.log(input);
    Apl02.create(input)
      .then((data) => {
        res.status(200).json({ data });
      })
      // .then((data) => {
      //   // res.status(201).json({ data });
      //   Info.create({
      //     info_status: "Data Asesi",
      //     id_asesi: req.body.id_asesi,
      //     deskripsi_info: "Permohonan Sertifikasi Anda Terverifikasi",
      //   })
      //     .then((info) => {
      //       res.status(200).json({ info });
      //       Asesi.findOne({ where: { id: req.body.id_asesi } })
      //         .then(() => {
      //           Asesi.update(
      //             { status_pembayaran: "paid" },
      //             { where: { id: req.body.id_asesi } }
      //           )
      //             .then((result) => {
      //               // res.status(200).json({ msg: "Berhasil memperbaiki data" });
      //               Info.crate({
      //                 deskripsi_info:
      //                   "Pembayaran sertifikasi anda terverifikasi",
      //                 status: "Data Asesi",
      //                 id_asesi: req.body.id_asesi,
      //               });
      //             })
      //             .catch((error) => {
      //               console.log(error);
      //             });
      //         })
      //         .catch((eror) => console.log(eror));
      //     })
      //     .catch((error) => console.log(error));
      // })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
  static showAPL02ById(req, res, next) {
    let id = req.params.id;
    Apl02.findOne({
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

  static showAPL02ByUser(req, res, next) {
    let id = req.params.id;
    console.log(id, "id-asesi");
    Apl02.findOne({
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
  static showAPL02ByAllUser(req, res, next) {
    let id = req.params.id;
    console.log(id, "id-asesi");
    Apl02.findAll({
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

  static showAPL02ByApl01Id(req, res, next) {
    let id = req.params.id;
    console.log(id, "id-asesi");
    Apl02.findAll({
      where: { id_apl01: id },
      include: [
        {
          model: APL01,
          as: "APL01",
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
        },
        {
          model: jadwal_asesiskema_asesor,
          as: "jadwal_asesiskema_asesor",
          include: [
            {
              model: jadwal_asesiskema,
              as: "jadwal_asesiskema",
              include: [
                {
                  model: Jadwal,
                  as: "jadwal",
                },
              ],
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

module.exports = APL02_Controller;
