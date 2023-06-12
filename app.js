if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
// const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes/router.js");
// const errorHandler = require("./middleware/erorHandler");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(upload);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
