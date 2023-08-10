const { FormatDate } = require("../helpers/formatDate.js");
const { AsesorAsesi, Jadwal, Asesor } = require("../models/index.js");

class AsesorAsesi_Controller {
  static showAsesorAsesi(req, res, next) {
    AsesorAsesi.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static getAsesorAsesiById(req, res, next) {
    let id = req.params.id;
    console.log(req.params.id, "params");
    AsesorAsesi.findOne({
      where: { id },
      include: [
        {
          model: AsesorAsesi,
          as: "AsesorAsesi",
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
  static createAsesorAsesi(req, res, next) {
    let tgl = req.params.tgl;
    let dataAses = [];
    // console.log(req.body);
    let input = {
      id_asesor: req.body.id_asesor,
      id_asesi: req.body.id_asesi,
    };
    Jadwal.findAll()
      .then((data) => {
        // console.log(data.length);
        data.map((el) => {
          let dt = el.dataValues.tgl_ujian.toISOString().split("T")[0];
          // console.log(dt);
          if (tgl === dt) {
            console.log("yes");
            Asesor.findAll().then((asesor) => {
              // let dtAsesi = [];
              asesor.map((el) => {
                req.body.map((bd) => {
                  if (el.dataValues.id === bd.id_asesor) {
                    dtAsesi.push(bd.id_asesi);
                    console.log(dtAsesi);
                    if (dtAsesi.length > 1) {
                      res.status(404).json({ msg: "Maksimal 10 Asesi" });
                    } else {
                      console.log("else");
                      // AsesorAsesi.bulkCreate(req.body)
                      //   .then((data) => {
                      //     console.log(data);
                      //   })
                      //   .catch((e) => {
                      //     console.log(e);
                      //   });
                    }
                  }
                });
              });
            });
          }
        });
      })
      .catch((e) => console.log(e));
    // AsesorAsesi.create(input)
    //   .then((data) => {
    //     res.status(201).json({ data });
    //   })
    //   .catch((err) => {
    //     console.log(err, "eror");
    //   });
  }
}

module.exports = AsesorAsesi_Controller;
