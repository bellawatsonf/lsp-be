if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
// const axios = require("axios");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes/router.js");
// const errorHandler = require("./middleware/erorHandler");
const crypto = require("crypto");

const { resolve } = require("path");
const TYPE_IMAGE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/static", express.static(resolve("public")));
app.use("/public/uploads", express.static(resolve("public/uploads"))); //unutk mengekpos path agar bisa di akses diurl ==> diurl nulisnya /localhost:3000/public/upload/namafileimagesnya.png

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
app.use(multer({ storage }).single("img_ktp"));
app.use(router);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
