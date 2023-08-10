const { asesi_skema, Skema, Asesi } = require("../models/index.js");

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
        console.log(data);
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static create_asesi_skema(req, res, next) {
    let input = {
      id_asesi: req.body.id_asesi,
      id_skema: req.body.id_skema,
    };
    asesi_skema
      .create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = asesi_skema_Controller;
