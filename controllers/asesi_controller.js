const { Asesi } = require("../models/asesi.js");

class Asesi_Controller {
  //   static getAsesi(req, res, next) {}
  static createAsesi(req, res, next) {
    console.log(req, "nana");

    let input = {
      nama_lengkap: req.body.nama_lengkap,
      img_ktp: req.file.destination + "/" + req.file.filename,
      // tempat_lahir: req.body.tempat_lahir,
      // tgl_lahir: req.body.tgl_lahir,
      // jenis_kelamin: req.body.jenis_kelamin,
      // kebangsaan: req.body.kebangsaan,
      // alamat_rumah: req.body.alamat_rumah,
      // phone_number: req.body.phone_number,
      // email: req.body.email,
      // kodepos: req.body.kodepos,
      // email_kantor: req.body.email_kantor,
      // alamat_kantor: req.body.alamat_kantor,
      // telp: req.body.telp,
      // kualifikasi_pendidikan: req.body.kualifikasi_pendidikan,
      // nama_instansi: req.body.nama_instansi,
      // tlp_kantor: req.body.tlp_kantor,
      // fax: req.body.fax,
      // kodepos_kantor: req.body.kodepos_kantor,
      // transkrip: req.file.transkrip,
      // ijazah: req.file.ijazah,
      // img_ktp: req.file.img_ktp,
      // pas_foto: req.file.pas_foto,
      // surat_pernyataan: req.file.surat_pernyataan,
      // ttd_asesi: req.file.ttd_asesi,
      // memiliki_nilai_D: req.body.memiliki_nilai_D,
    };
    console.log(input, "input");
    Asesi.create(input)
      .then((data) => {
        console.log(data, "data");
        res.status(201).json({
          data,
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
}

module.exports = Asesi_Controller;
