const { Asesi, Info } = require("../models/index.js");
const { FormatDate } = require("../helpers/formatDate.js");
const { OAuth2Client } = require("google-auth-library");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");
let projectId = "lsp-stiami";
let keyName = "key.json";
const Fs = require("fs-extra");
var stream = require("stream");
const crypto = require("crypto");
const storageGoogle = new Storage({
  projectId,
  keyName,
});
const bucket = storageGoogle.bucket("lspstiami");
const os = require("os");
const path = require("path");
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

  static getAsesiById(req, res, next) {
    let id = req.params.id;
    console.log(req.params.id, "params");
    Asesi.findOne({ where: { id } })
      .then((data) => {
        // console.log(data);
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static createAsesi(req, res, next) {
    // console.log("masul");
    // console.log(req.files, "nana");

    const storageGoogle = new Storage({
      projectId,
      keyName,
    });
    const bucket = storageGoogle.bucket("lspstiami");
    // console.log(bucket.file(req.files.transkrip[0]).storage.apiEndpoint);
    let data = [];
    const ts = bucket.file(req.files.transkrip[0]).name;
    const ij = bucket.file(req.files.ijazah[0]).name;
    data.push(ts);
    data.push(ij);

    let transkrip = `${
      bucket.file(req.files.transkrip[0]).storage.apiEndpoint
    }/${bucket.name}/${ts.filename}`;
    let ijazah = `${bucket.file(req.files.ijazah[0]).storage.apiEndpoint}/${
      bucket.name
    }/${ij.filename}`;
    console.log(data);
    // const ext = req.files.transkrip[0].originalname.split(".").pop();
    // console.log(ext, "ext");
    for (let i = 0; i < data.length; i++) {
      console.log("masuk", data[i].path);
      bucket.upload(data[i].path, {
        destination: `${data[i].filename}`,
      });
      Fs.remove(`${data[i].path}`); //untuk remove di foldernya
    }

    // let input = {
    //   nama_lengkap: req.body.nama_lengkap,
    //   tempat_lahir: req.body.tempat_lahir,
    //   // tgl_lahir: FormatDate(req.body.tgl_lahir),
    //   jenis_kelamin: req.body.jenis_kelamin,
    //   kebangsaan: req.body.kebangsaan,
    //   jabatan: req.body.jabatan,
    //   alamat_rumah: req.body.alamat_rumah,
    //   phone_number: req.body.phone_number,
    //   email: req.body.email,
    //   kodepos: req.body.kodepos,
    //   email_kantor: req.body.email_kantor,
    //   alamat_kantor: req.body.alamat_kantor,
    //   telp: req.body.telp,
    //   kualifikasi_pendidikan: req.body.kualifikasi_pendidikan,
    //   nama_instansi: req.body.nama_instansi,
    //   tlp_kantor: req.body.tlp_kantor,
    //   hp_kantor: req.body.hp_kane1tor,
    //   fax: req.body.fax,
    //   kodepos_kantor: req.body.kodepos_kantor,
    //   transkrip:
    //     req.files.transkrip[0].destination +
    //     "/" +
    //     req.files.transkrip[0].filename,
    //   ijazah:
    //     req.files.ijazah[0].destination + "/" + req.files.ijazah[0].filename,
    //   bukti_bayar:
    //     req.files.bukti_bayar[0].destination +
    //     "/" +
    //     req.files.bukti_bayar[0].filename,
    //   sertifikat_pelatihan_pendukung:
    //     req.files.sertifikat_pelatihan_pendukung[0].destination +
    //     "/" +
    //     req.files.sertifikat_pelatihan_pendukung[0].filename,
    //   img_ktp:
    //     req.files.img_ktp[0].destination + "/" + req.files.img_ktp[0].filename,
    //   pas_foto:
    //     req.files.pas_foto[0].destination +
    //     "/" +
    //     req.files.pas_foto[0].filename,
    //   surat_pernyataan:
    //     req.files.surat_pernyataan[0].destination +
    //     "/" +
    //     req.files.surat_pernyataan[0].filename,
    //   ttd_asesi:
    //     req.files.ttd_asesi[0].destination +
    //     "/" +
    //     req.files.ttd_asesi[0].filename,
    //   memiliki_nilai_D: req.body.memiliki_nilai_D,
    //   role: "asesi",
    //   alasan_penolakan: null,
    //   tujuan_asesmen: req.body.tujuan_asesmen,
    //   status_pembayaran: "pending",
    // };

    let input = {
      nama_lengkap: req.body.nama_lengkap,
      transkrip: transkrip,
      ijazah: ijazah,
    };
    // // console.log(input, "input");
    Asesi.create(input)
      .then((data) => {
        // console.log(data, "data");
        res.status(201).json({
          data,
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  static updateStatusPembayaranAsesi(req, res, next) {
    // console.log(req.body.status_pembayaran);
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
  static async downloadFile(fileName, destFileName) {
    const options = {
      destination: destFileName,
    };

    // Downloads the file
    await bucket.file(fileName).download(options);

    console.log(
      `gs://${bucket.name}/${fileName} downloaded to ${destFileName}`
    );
  }
  static async downloadAsesi(req, res, next) {
    // get temp directory
    const tempDir = os.tmpdir();
    let namafileparam = req.params.namafileparam;
    console.log(namafileparam, "fileparam");
    let namafile = namafileparam;
    let destFileName = path.join(tempDir, namafile);
    try {
      await Asesi_Controller.downloadFile(namafile, destFileName);
    } catch (error) {
      console.error(error);
    }

    const readStream = fs.createReadStream(destFileName);
    let type = namafileparam.split(".").pop();
    res.writeHead(200, { "Content-type": `image/${type}` });
    readStream.pipe(res);
  }
  static editAsesi(req, res, next) {
    // console.log(req.files, "edit");
    // console.log("masuk");
    let id = req.params.id;
    console.log(id, "requezid");
    console.log(req.body, "requezbody");

    let imageAsesi = null;
    let pathname = null;
    let birthdate;
    const storageGoogle = new Storage({
      projectId,
      keyName,
    });
    const bucket = storageGoogle.bucket("lspstiami");

    let dataStorage = [];
    let dataAsesi = {};
    const uuid = crypto.randomUUID();

    if (req.body.ttd_asesi !== undefined) {
      imageAsesi = req.body.ttd_asesi;
      var base64Data = imageAsesi?.replace("data:image/png;base64,", "");
      pathname = `public/uploads/${req.body.nama_lengkap}_ttd_asesi.png`;
      fs.writeFile(pathname, base64Data, "base64", function (err) {
        console.log(err);
      });
    }
    console.log(pathname, "pathname");
    console.log(req.body, "reqbody");
    Asesi.findOne({ where: { id } })
      .then((data) => {
        // console.log(data);
        console.log(req.body, "requezbodyyyy");
        dataAsesi = data;
        let ttd_file = "";
        if (pathname) {
          ttd_file = pathname.split(".").pop();
          bucket.upload(pathname, {
            destination: `${data.nama_lengkap}_ttd_asesi.png`,
          });
        }
        let input = {
          nama_lengkap: req.body.nama_lengkap,
          tempat_lahir: req.body.tempat_lahir,
          nik: req.body.nik,

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
          hp_kantor: req.body.hp_kantor,
          fax: req.body.fax,
          kodepos_kantor: req.body.kodepos_kantor,
          provinsi: req.body.provinsi,
          kota: req.body.kota,
          ttd_asesi: `https://storage.googleapis.com/${bucket.name}/${data.nama_lengkap}_ttd_asesi.png`,
          memiliki_nilai_D: req.body.memiliki_nilai_D,
          role: "asesi",
          // alasan_penolakan: null,
          tujuan_asesmen: req.body.tujuan_asesmen,
          nama_pemilik_rekening: req.body.nama_pemilik_rekening,
        };

        if (
          req.body.alasan_penolakan !== null &&
          req.body.alasan_penolakan !== "belum-dicek"
        ) {
          input.alasan_penolakan = req.body.alasan_penolakan;
        } else if (
          req.body.alasan_penolakan === null ||
          req.body.alasan_penolakan === "belum-dicek" ||
          req.body.alasan_penolakan === undefined
        ) {
          input.alasan_penolakan = null;
        }

        if (req.body.tgl_lahir !== undefined) {
          input.tgl_lahir = req.body.tgl_lahir;
        }

        // console.log(input, "inputan");
        if (req.files !== undefined) {
          console.log("masuk kondisi bukan undefined");
          if (req.files.transkrip !== undefined) {
            const ts = bucket.file(req.files.transkrip[0]).name;

            dataStorage.push(ts);

            let transkrip = `${
              bucket.file(req.files.transkrip[0]).storage.apiEndpoint
            }/${bucket.name}/${data.nama_lengkap}_${ts.fieldname}_${
              ts.filename
            }`;
            input.transkrip = transkrip;
          }
          if (req.files.ijazah !== undefined) {
            const ij = bucket.file(req.files.ijazah[0]).name;

            dataStorage.push(ij);

            let ijazah = `${
              bucket.file(req.files.ijazah[0]).storage.apiEndpoint
            }/${bucket.name}/${data.nama_lengkap}_${ij.fieldname}_${
              ij.filename
            }`;
            console.log(ijazah, "ijazah");
            input.ijazah = ijazah;
          }
          if (req.files.bukti_bayar !== undefined) {
            const bb = bucket.file(req.files.bukti_bayar[0]).name;

            dataStorage.push(bb);

            let bukti_bayar = `${
              bucket.file(req.files.bukti_bayar[0]).storage.apiEndpoint
            }/${bucket.name}/${data.nama_lengkap}_${bb.fieldname}_${
              bb.filename
            }`;
            console.log(bukti_bayar, "bukti_bayar");
            input.bukti_bayar = bukti_bayar;
          }
          if (req.files.sertifikat_pelatihan_pendukung !== undefined) {
            const sp = bucket.file(
              req.files.sertifikat_pelatihan_pendukung[0]
            ).name;

            dataStorage.push(sp);

            let sertifikat_pelatihan_pendukung = `${
              bucket.file(req.files.sertifikat_pelatihan_pendukung[0]).storage
                .apiEndpoint
            }/${bucket.name}/${data.nama_lengkap}_${sp.fieldname}_${
              sp.filename
            }`;
            console.log(
              sertifikat_pelatihan_pendukung,
              "sertifikat_pelatihan_pendukung"
            );
            input.sertifikat_pelatihan_pendukung =
              sertifikat_pelatihan_pendukung;
          }

          if (req.files.img_ktp !== undefined) {
            const ktp = bucket.file(req.files.img_ktp[0]).name;

            dataStorage.push(ktp);

            let img_ktp = `${
              bucket.file(req.files.img_ktp[0]).storage.apiEndpoint
            }/${bucket.name}/${data.nama_lengkap}_${ktp.fieldname}_${
              ktp.filename
            }`;
            console.log(img_ktp, "img_ktp");
            input.img_ktp = img_ktp;
          }

          if (req.files.pas_foto !== undefined) {
            const foto = bucket.file(req.files.pas_foto[0]).name;

            dataStorage.push(foto);

            let pas_foto = `${
              bucket.file(req.files.pas_foto[0]).storage.apiEndpoint
            }/${bucket.name}/${data.nama_lengkap}_${foto.fieldname}_${
              foto.filename
            }`;
            console.log(pas_foto, "pas_foto");
            input.pas_foto = pas_foto;
          }

          if (req.files.surat_pernyataan !== undefined) {
            const surat = bucket.file(req.files.surat_pernyataan[0]).name;

            dataStorage.push(surat);

            let surat_pernyataan = `${
              bucket.file(req.files.surat_pernyataan[0]).storage.apiEndpoint
            }/${bucket.name}/${data.nama_lengkap}_${surat.fieldname}_${
              surat.filename
            }`;
            console.log(surat_pernyataan, "surat_pernyataan");
            input.surat_pernyataan = surat_pernyataan;
          }
          for (let i = 0; i < dataStorage.length; i++) {
            console.log("masuk", dataStorage[i].path);
            bucket.upload(dataStorage[i].path, {
              destination: `${data.nama_lengkap}_${dataStorage[i].fieldname}_${dataStorage[i].filename}`,
            });
            Fs.remove(`${dataStorage[i].path}`); //untuk remove di foldernya
          }
        }
        // fs.readFile(pathname, function read(err, data) {
        //   if (err) {
        //     throw err;
        //   }
        //   const content = data;
        //   var bufferStream = new stream.PassThrough();
        //   bufferStream.end(Buffer.from(req.body.ttd_asesi, "base64"));
        //   // Invoke the next step here however you like
        //   console.log(bufferStream, "buffer");
        //   console.log(content, "content"); // Put all of the code here (not the best solution)
        //   // processFile(content);   // Or put the next step in a function and invoke it
        // });
        // }
        console.log("lala", req.body.alasan_penolakan);
        if (
          req.body.alasan_penolakan !== null &&
          req.body.alasan_penolakan !== "belum-dicek" &&
          req.body.alasan_penolakan !== undefined
        ) {
          Asesi.update(input, { where: { id } })
            .then((dataAsesi) => {
              Info.create({
                info_status: "Perbaikan Data Asesi",
                id_asesi: data.id,
                deskripsi_info: req.body.alasan_penolakan,
              })
                .then((data) => {
                  res.status(201).json({ data });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err, "eror");
            });
        } else {
          console.log("masuk else asesiedit");
          Asesi.update(input, { where: { id } })
            .then((dataAsesi) => {
              res.status(201).json({ data });
            })
            .catch((err) => {
              console.log(err, "eror");
            });
        }
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
  // static editAsesiDiFormApl(req, res, next) {
  //   // console.log(req.files, "edit");
  //   // console.log("masuk");
  //   let id = req.params.id;
  //   let imageAsesi = null;
  //   let pathname = null;
  //   let birthdate;
  //   const storageGoogle = new Storage({
  //     projectId,
  //     keyName,
  //   });
  //   const bucket = storageGoogle.bucket("lspstiami");

  //   let dataStorage = [];
  //   let dataAsesi = {};

  //   if (req.body.ttd_asesi !== undefined) {
  //     imageAsesi = req.body.ttd_asesi;
  //     var base64Data = imageAsesi?.replace("data:image/png;base64,", "");
  //     pathname = `public/uploads/ttd_asesi_${req.body.nama_lengkap}.png`;
  //     fs.writeFile(pathname, base64Data, "base64", function (err) {
  //       console.log(err);
  //     });
  //   }
  //   console.log(pathname, "pathname");
  //   // console.log(req.body, "reqbody");
  //   Asesi.findOne({ where: { id } })
  //     .then((data) => {
  //       // console.log(data);
  //       dataAsesi = data;
  //       let ttd_file = pathname.split(".").pop();
  //       const uuid = crypto.randomUUID();

  //       bucket.upload(pathname, {
  //         destination: `${data.nama_lengkap}_ttd_asesi_${uuid}.${ttd_file}`,
  //       });
  //       let input = {
  //         nama_lengkap: req.body.nama_lengkap,
  //         tempat_lahir: req.body.tempat_lahir,
  //         nik: req.body.nik,

  //         jenis_kelamin: req.body.jenis_kelamin,
  //         kebangsaan: req.body.kebangsaan,
  //         jabatan: req.body.jabatan,
  //         alamat_rumah: req.body.alamat_rumah,
  //         phone_number: req.body.phone_number,
  //         email: req.body.email,
  //         kodepos: req.body.kodepos,
  //         email_kantor: req.body.email_kantor,
  //         alamat_kantor: req.body.alamat_kantor,
  //         telp: req.body.telp,
  //         kualifikasi_pendidikan: req.body.kualifikasi_pendidikan,
  //         nama_instansi: req.body.nama_instansi,
  //         tlp_kantor: req.body.tlp_kantor,
  //         hp_kantor: req.body.hp_kantor,
  //         fax: req.body.fax,
  //         kodepos_kantor: req.body.kodepos_kantor,
  //         provinsi: req.body.provinsi,
  //         kota: req.body.kota,
  //         ttd_asesi: `https://storage.googleapis.com/${bucket.name}/${data.nama_lengkap}_ttd_asesi_${uuid}.${ttd_file}`,
  //         memiliki_nilai_D: req.body.memiliki_nilai_D,
  //         role: "asesi",
  //         alasan_penolakan: null,
  //         tujuan_asesmen: req.body.tujuan_asesmen,
  //       };

  //       if (req.body.tgl_lahir !== undefined) {
  //         input.tgl_lahir = req.body.tgl_lahir;
  //       }

  //       console.log(req.files, "transkrip");
  //       if (req.files !== undefined) {
  //         if (req.files.transkrip !== undefined) {
  //           const ts = bucket.file(req.files.transkrip[0]).name;

  //           dataStorage.push(ts);

  //           let transkrip = `${
  //             bucket.file(req.files.transkrip[0]).storage.apiEndpoint
  //           }/${bucket.name}/${data.nama_lengkap}_${ts.fieldname}_${
  //             ts.filename
  //           }`;
  //           console.log(transkrip, "transkrip");
  //           input.transkrip = transkrip;
  //         }
  //         if (req.files.ijazah !== undefined) {
  //           const ij = bucket.file(req.files.ijazah[0]).name;

  //           dataStorage.push(ij);

  //           let ijazah = `${
  //             bucket.file(req.files.ijazah[0]).storage.apiEndpoint
  //           }/${bucket.name}/${data.nama_lengkap}_${ij.fieldname}_${
  //             ij.filename
  //           }`;
  //           console.log(ijazah, "ijazah");
  //           input.ijazah = ijazah;
  //         }
  //         // if (req.files.bukti_bayar !== undefined) {
  //         //   const bb = bucket.file(req.files.bukti_bayar[0]).name;

  //         //   dataStorage.push(bb);

  //         //   let bukti_bayar = `${
  //         //     bucket.file(req.files.bukti_bayar[0]).storage.apiEndpoint
  //         //   }/${bucket.name}/${data.nama_lengkap}_${bb.fieldname}_${
  //         //     bb.filename
  //         //   }`;
  //         //   console.log(bukti_bayar, "bukti_bayar");
  //         //   input.bukti_bayar = bukti_bayar;
  //         // }
  //         if (req.files.sertifikat_pelatihan_pendukung !== undefined) {
  //           const sp = bucket.file(
  //             req.files.sertifikat_pelatihan_pendukung[0]
  //           ).name;

  //           dataStorage.push(sp);

  //           let sertifikat_pelatihan_pendukung = `${
  //             bucket.file(req.files.sertifikat_pelatihan_pendukung[0]).storage
  //               .apiEndpoint
  //           }/${bucket.name}/${data.nama_lengkap}_${sp.fieldname}_${
  //             sp.filename
  //           }`;
  //           console.log(
  //             sertifikat_pelatihan_pendukung,
  //             "sertifikat_pelatihan_pendukung"
  //           );
  //           input.sertifikat_pelatihan_pendukung =
  //             sertifikat_pelatihan_pendukung;
  //         }

  //         if (req.files.img_ktp !== undefined) {
  //           const ktp = bucket.file(req.files.img_ktp[0]).name;

  //           dataStorage.push(ktp);

  //           let img_ktp = `${
  //             bucket.file(req.files.img_ktp[0]).storage.apiEndpoint
  //           }/${bucket.name}/${data.nama_lengkap}_${ktp.fieldname}_${
  //             ktp.filename
  //           }`;
  //           console.log(img_ktp, "img_ktp");
  //           input.img_ktp = img_ktp;
  //         }

  //         if (req.files.pas_foto !== undefined) {
  //           const foto = bucket.file(req.files.pas_foto[0]).name;

  //           dataStorage.push(foto);

  //           let pas_foto = `${
  //             bucket.file(req.files.pas_foto[0]).storage.apiEndpoint
  //           }/${bucket.name}/${data.nama_lengkap}_${foto.fieldname}_${
  //             foto.filename
  //           }`;
  //           console.log(pas_foto, "pas_foto");
  //           input.pas_foto = pas_foto;
  //         }

  //         if (req.files.surat_pernyataan !== undefined) {
  //           const surat = bucket.file(req.files.surat_pernyataan[0]).name;

  //           dataStorage.push(surat);

  //           let surat_pernyataan = `${
  //             bucket.file(req.files.surat_pernyataan[0]).storage.apiEndpoint
  //           }/${bucket.name}/${data.nama_lengkap}_${surat.fieldname}_${
  //             surat.filename
  //           }`;
  //           console.log(surat_pernyataan, "surat_pernyataan");
  //           input.surat_pernyataan = surat_pernyataan;
  //         }
  //         for (let i = 0; i < dataStorage.length; i++) {
  //           console.log("masuk", dataStorage[i].path);
  //           bucket.upload(dataStorage[i].path, {
  //             destination: `${data.nama_lengkap}_${dataStorage[i].fieldname}_${dataStorage[i].filename}`,
  //           });
  //           Fs.remove(`${dataStorage[i].path}`); //untuk remove di foldernya
  //         }
  //       }
  //       // console.log(input, "input");

  //       Asesi.update(input, { where: { id } })
  //         .then((data) => {
  //           res.status(201).json({ data });
  //           if (req.body.jenis_paket === "ujikom") {
  //             Info.create({
  //               id_asesi: data.asesi,
  //               info_status: "Pendaftaran",
  //               deskripsi_info:
  //                 "Anda berhasil melakukan pendaftaran sertifikasi",
  //             })
  //               .then((dataInfo) => {
  //                 res.status(200).json({ msg: "berhasil membuat info" });
  //               })
  //               .catch((errorinfo) => console.log(errorinfo));
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err, "eror");
  //         });
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}

module.exports = Asesi_Controller;
