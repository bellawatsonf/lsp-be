const crypto = require("crypto");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const MulterGoogleCloudStorage = require("multer-google-storage");

const TYPE_IMAGE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const gstorage = multer({
  storage: multer.memoryStorage(),
});

let projectId = "lsp-stiami";
let keyName = "key.json";

//ini yg cara multer
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

//ini caramulter storage
const uploadHandler = multer({
  storage: MulterGoogleCloudStorage.storageEngine({
    autoRetry: true,
    bucket: "lspstiami",
    projectId: "lsp-stiami",
    keyFilename: "key.json",
    filename(req, file, cb) {
      // const uuid = crypto.randomUUID();
      // const ext = TYPE_IMAGE[file.mimetype];
      cb(null, `/projectimage/${Date.now()}_${file.originalname}`);
    },
  }),
});

// console.log(uploadHandler, "uploadhandler");

const storageGoogle = new Storage({
  projectId,
  keyName,
});
const bucket = storageGoogle.bucket("lspstiami");
console.log(bucket.files, "bucket");
// const upload = multer({ storage });
// console.log(upload, "aplot");
// const uploadstr = upload.fields([
//   { name: "img_ktp" },
//   { name: "ijazah" },
//   { name: "transkrip" },
//   { name: "pas_foto" },
//   { name: "surat_pernyataan" },
//   { name: "bukti_bayar" },
//   { name: "ttd_asesi" },
//   { name: "sertifikat_pelatihan_pendukung" },
//   // { name: "ttd_admin" },
// ]);

const uploadstr = gstorage.fields([
  { name: "img_ktp" },
  { name: "ijazah" },
  { name: "transkrip" },
  { name: "pas_foto" },
  { name: "surat_pernyataan" },
  { name: "bukti_bayar" },
  // { name: "ttd_asesi" },
  { name: "sertifikat_pelatihan_pendukung" },
]);

module.exports = uploadstr;
