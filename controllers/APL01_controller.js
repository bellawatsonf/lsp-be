const {
  APL01,
  Asesi,
  Kriteria_UnitKerja,
  Admin,
  asesi_skema,
  Skema,
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
    console.log("masuk apl01");
    let input = {
      // id_asesi: req.body.id_asesi,
      id_admin: req.body.id_admin,
      id_asesi_skema: req.body.id_asesi_skema,
      rekomendasi_sebagai_asesi: req.body.rekomendasi_sebagai_asesi,
    };
    APL01.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = APL01_Controller;
