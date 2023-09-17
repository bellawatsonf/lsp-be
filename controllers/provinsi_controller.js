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
    console.log(idProv);
    let id = 11;
    if (idProv !== undefined) {
      id = idProv;
    }
    console.log(id, "id");
    axios({
      url: ` https://emsifa.github.io/api-wilayah-indonesia/api/regencies/11.json
      `,
      method: "get",
    })
      .then((data) => {
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
