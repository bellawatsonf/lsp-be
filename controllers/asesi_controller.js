const { Asesi } = require("../models/index.js");
const { FormatDate } = require("../helpers/formatDate.js");
const { OAuth2Client } = require("google-auth-library");
class Asesi_Controller {
  static getAsesi(req, res, next) {
    Asesi.findAll()
      .then((data) => {
        console.log(data);
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static createAsesi(req, res, next) {
    console.log(
      req.files.sertifikat_pelatihan_pendukung[0].destination,
      "nana"
    );

    let input = {
      nama_lengkap: req.body.nama_lengkap,
      tempat_lahir: req.body.tempat_lahir,
      tgl_lahir: FormatDate(req.body.tgl_lahir),
      jenis_kelamin: req.body.jenis_kelamin,
      kebangsaan: req.body.kebangsaan,
      jabatan: req.body.jabatan,
      alamat_rumah: req.body.alamat_rumah,
      phone_number: req.body.phone_number,
      email: req.body.email,
      kodepos: req.body.kodepos,
      email_kantor: req.body.email_kantor,
      alamat_kantor: req.body.alamat_kantor,
      telp: req.body.telp,
      kualifikasi_pendidikan: req.body.kualifikasi_pendidikan,
      nama_instansi: req.body.nama_instansi,
      tlp_kantor: req.body.tlp_kantor,
      hp_kantor: req.body.hp_kane1tor,
      fax: req.body.fax,
      kodepos_kantor: req.body.kodepos_kantor,
      transkrip:
        req.files.transkrip[0].destination +
        "/" +
        req.files.transkrip[0].filename,
      ijazah:
        req.files.ijazah[0].destination + "/" + req.files.ijazah[0].filename,
      bukti_bayar:
        req.files.bukti_bayar[0].destination +
        "/" +
        req.files.bukti_bayar[0].filename,
      sertifikat_pelatihan_pendukung:
        req.files.sertifikat_pelatihan_pendukung[0].destination +
        "/" +
        req.files.sertifikat_pelatihan_pendukung[0].filename,
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
      role: "asesi",
      alasan_penolakan: null,
      tujuan_asesmen: req.body.tujuan_asesmen,
      status_pembayaran: "pending",
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

  static loginGoogle(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
    const { id_token_google } = req.body;
    let emailUser = "";
    client
      .verifyIdToken({
        idToken: id_token_google,
        audience: process.env.CLIENT_ID_GOOGLE, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      })
      .then((ticket) => {
        const payload = ticket.getPayload();
        const email = payload.email;
        emailUser = email;
        return User.findOne({ where: { email: email } });
      })
      .then((user) => {
        if (!user) {
          return Asesi.create({
            email: emailUser,
            role: "asesi",
            password: String(Math.random()) + String(Math.random()),
          });
        } else {
          return user;
        }
      })
      .then((user) => {
        if (user) {
          const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.SECRET_KEY
          );
          res.status(201).json({
            id: user.id,
            role: user.role,
            succes: true,
            message: "berhasil signup or signin",
            token,
          });
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = Asesi_Controller;
