const crypto = require("crypto");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const TYPE_IMAGE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

let projectId = "feisty-parity-391307";
let keyName = "key.json";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename(req, file, cb) {
    const uuid = crypto.randomUUID();
    const ext = TYPE_IMAGE[file.mimetype];
    cb(null, `${uuid}.${ext}`);
  },
});
// const storageGoogle = new Storage({
//   projectId,
//   keyName,
// });

const upload = multer({ storage });
// const bucket = storageGoogle.bucket("");
console.log(upload, "aplot");
const uploadstr = upload.fields([
  { name: "img_ktp" },
  { name: "ijazah" },
  { name: "transkrip" },
  { name: "pas_foto" },
  { name: "surat_pernyataan" },
  { name: "bukti_bayar" },
  { name: "ttd_asesi" },
  { name: "sertifikat_pelatihan_pendukung" },
  // { name: "ttd_admin" },
]);

module.exports = uploadstr;
