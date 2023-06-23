const crypto = require("crypto");
const multer = require("multer");

const TYPE_IMAGE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

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

const upload = multer({ storage });
console.log(upload, "aplot");
const uploadstr = upload.fields([
  { name: "img_ktp" },
  { name: "ijazah" },
  { name: "transkrip" },
  { name: "pas_foto" },
  { name: "surat_pernyataan" },
  { name: "bukti_bayar" },
  { name: "ttd_asesi" },
]);

module.exports = uploadstr;
