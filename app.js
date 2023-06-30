if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
// const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const router = require("./routes/router.js");
// const errorHandler = require("./middleware/erorHandler");

const { resolve } = require("path");
const uploadstr = require("./helpers/multer.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/static", express.static(resolve("public")));
app.use("/public/uploads", express.static(resolve("public/uploads"))); //unutk mengekpos path agar bisa di akses diurl ==> diurl nulisnya /localhost:3000/public/upload/namafileimagesnya.png

app.use(uploadstr);
app.use(router);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
