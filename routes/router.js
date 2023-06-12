const express = require("express");

const router = express.Router();
const Asesi_Controller = require("../controllers/asesi_controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// router.get("/asesi", Asesi_Controller.getAsesi());
router.post("/add-asesi", upload("APL01"), Asesi_Controller.createAsesi);

module.exports = router;
