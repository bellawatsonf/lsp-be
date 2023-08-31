const { decrypt } = require("dotenv");
const { encrypt } = require("../middleware/bcrypt.js");
const { Admin } = require("../models/index.js");
const fs = require("fs");
const Fs = require("fs-extra");

const { getPagination, getPagingData } = require("../helpers/pagination.js");
const { Storage } = require("@google-cloud/storage");
let projectId = "lsp-stiami";
let keyName = "key.json";
const storageGoogle = new Storage({
  projectId,
  keyName,
});
const bucket = storageGoogle.bucket("lspstiami");
const crypto = require("crypto");
const os = require("os");
const path = require("path");
class Admin_Controller {
  static showAdmin(req, res, next) {
    const { page, size, title } = req.query;
    console.log(typeof page, "pg");
    const { limit, offset } = getPagination(page, size);
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
    };
    console.log(input, "inputadmin");
    if (req.files !== undefined) {
      input.ttd_admin =
        req.files.ttd_admin[0].destination +
        "/" +
        req.files.ttd_admin[0].filename;
    }
    Admin.create(input)
      .then((data) => {
        // res.status(201).json({ data });
        Admin.findAndCountAll()
          .then((data) => {
            const response = getPagingData(data, page, limit);
            res.send(response);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving asesor",
            });
          });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }

  static showAdminById(req, res, next) {
    let id = req.params.id;
    Admin.findOne({ where: { id: id } })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => console.log(err));
  }

  static editAdmin(req, res, next) {
    let input = {
      nama: req.body.nama,
      email: req.body.email,
      password: encrypt(req.body.password),
      role: "admin",
    };
    if (req.files !== undefined) {
      input.ttd_admin =
        req.files.ttd_admin[0].destination +
        "/" +
        req.files.ttd_admin[0].filename;
    }
    Admin.update(input)
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil diubah", data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteAdmin(req, res, next) {
    let id = req.params.id;
    Admin.destroy({ where: { id } })
      .then((data) => {
        res.status(200).json({ msg: "Data berhasil dihapus" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async downloadFile(fileName, destFileName) {
    console.log(destFileName, "det");
    const options = {
      destination: destFileName,
    };

    // Downloads the file
    await bucket.file(fileName).download(options);

    console.log(
      `gs://${bucket.name}/${fileName} downloaded to ${destFileName}`
    );
  }
  static async downloadAdmin(req, res, next) {
    // get temp directory
    const tempDir = os.tmpdir();
    let namafileparam = req.params.namafileparam;
    console.log(namafileparam, "fileparam");
    let namafile = namafileparam;
    let destFileName = path.join(tempDir, namafile);
    console.log(destFileName, "deset");
    try {
      await Admin_Controller.downloadFile(namafile, destFileName);
    } catch (error) {
      console.error(error);
    }

    const readStream = fs.createReadStream(destFileName);
    let type = namafileparam.split(".").pop();
    console.log(type);
    res.writeHead(200, { "Content-type": `image/${type}` });
    readStream.pipe(res);
  }
  static createTtdAdmin(req, res, next) {
    console.log("mausk ");
    let id = req.params.id;
    let imageAdmin = null;
    var imageString = req.body.ttd_admin;
    var base64Data = imageString.replace("data:image/png;base64,", "");
    const storageGoogle = new Storage({
      projectId,
      keyName,
    });
    const bucket = storageGoogle.bucket("lspstiami");
    // Store Image into Server
    let pathname = null;
    // fs.writeFile(pathname, base64Data, "base64", function (err) {
    //   console.log(err);
    // });
    let ttd_file = "";
    const uuid = crypto.randomUUID();
    if (req.body.ttd_admin !== undefined) {
      imageAdmin = req.body.ttd_admin;
      var base64Data = imageAdmin?.replace("data:image/png;base64,", "");
      pathname = `public/uploads/ttd_admin_${id}_${uuid}.png`;
      fs.writeFile(pathname, base64Data, "base64", function (err) {
        console.log(err);
      });
    }

    // const readData = fs.readFileSync("public/uploads/ttd_admin.png", "utf8");
    // console.log(readData.toString());
    if (pathname) {
      ttd_file = pathname.split(".").pop();
      bucket.upload(pathname, {
        destination: `ttd_admin_${id}_${uuid}.${ttd_file}`,
      });
      // Fs.remove(`${pathname}`);
    }
    let input = {
      ttd_admin: `https://storage.googleapis.com/${bucket.name}/ttd_admin_${id}_${uuid}.${ttd_file}`,
    };
    console.log(input, "inputadmin");
    Admin.update(input, { where: { id }, returning: true })
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
}

module.exports = Admin_Controller;
