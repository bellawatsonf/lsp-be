const express = require("express");

const router = express.Router();
const Asesi_Controller = require("../controllers/asesi_controller");
const Skema_Controller = require("../controllers/skema_controller");
//controller asesi
// router.get("/asesi", Asesi_Controller.getAsesi());
router.post("/add-asesi", Asesi_Controller.createAsesi);

//controller skema sertifikasi
router.get("/skemasertifikasi", Skema_Controller.showSkema);
router.post("/add-skemasertifikasi", Skema_Controller.createSkema);
module.exports = router;
