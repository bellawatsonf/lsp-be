const { default: axios } = require("axios");

class Provinsi_Controller {
  static getProvinsi(req, res, next) {
    axios({
      url: "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json",
      method: "get",
    })
      .then((data) => {
        // console.log(data, "data");
        res.status(200).json({
          data: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getKota(req, res, next) {
    let idProv = req.params.idProv;
    axios({
      url: ` https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${idProv}.json
      `,
      method: "get",
    })
      .then((data) => {
        // console.log(data, "data");
        res.status(200).json({
          data: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Provinsi_Controller;
