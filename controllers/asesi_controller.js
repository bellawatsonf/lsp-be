const { Asesi } = require("../models/index.js");

class Asesi_Controller {
  //   static getAsesi(req, res, next) {}
  static createAsesi(req, res, next) {
    console.log(req.files.img_ktp[0].destination, "nana");

    let input = {
      nama_lengkap: req.body.nama_lengkap,
      img_ktp:
        req.files.img_ktp[0].destination + "/" + req.files.img_ktp[0].filename,
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
      transkrip:
        req.files.transkrip[0].destination +
        "/" +
        req.files.transkrip[0].filename,
      ijazah:
        req.files.ijazah[0].destination + "/" + req.files.transkrip[0].filename,
      img_ktp:
        req.files.img_ktp[0].destination + "/" + req.files.img_ktp[0].filename,
      pas_foto:
        req.files.pas_foto[0].destination +
        "/" +
        req.files.pas_foto[0].filename,
      surat_pernyataan:
        req.files.surat_pernyataan[0].destination +
        "/" +
        req.files.surat_pernyataan[0].filename,
      ttd_asesi:
        req.files.ttd_asesi[0].destination +
        "/" +
        req.files.ttd_asesi[0].filename,
      memiliki_nilai_D: req.body.memiliki_nilai_D,
      id_role: 3,
      status_pembayaran: "pending",
    };
    // console.log(input, "input");
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

  static updateStatusPembayaranAsesi(req, res, next) {
    console.log(req.body.status_pembayaran);
    let id = req.params.id;
    let input = {
      status_pembayaran: req.body.status_pembayaran,
    };

    Asesi.update(input, { where: { id }, returning: true })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Asesi_Controller;
