const { encrypt } = require("../middleware/bcrypt.js");
const { Admin } = require("../models/index.js");

class Admin_Controller {
  static showAdmin(req, res, next) {
    Admin.findAll()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static createAdmin(req, res, next) {
    let input = {
      nama: req.body.nama,
      email: req.body.email,
      password: req.body.password,
      role: "admin",
      ttd_admin:
        req.files.ttd_admin[0].destination +
        "/" +
        req.files.ttd_admin[0].filename,
    };
    console.log(input, "inputadmin");
    Admin.create(input)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static editAdmin(req, res, next) {
    let input = {
      nama: req.body.nama,
      email: req.body.email,
      password: encrypt(req.body.password),
      role: "admin",
      ttd_Admin:
        req.files.ttd_Admin[0].destination +
        "/" +
        req.files.ttd_Admin[0].filename,
    };
    Admin.update(input)
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil diubah", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteAdmin(req, res, next) {
    Admin.delete()
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Admin_Controller;
