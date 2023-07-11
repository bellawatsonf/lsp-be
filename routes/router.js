const express = require("express");

const router = express.Router();
const Asesi_Controller = require("../controllers/asesi_controller.js");
const Skema_Controller = require("../controllers/skema_controller.js");
const Role_Controller = require("../controllers/role_controller.js");
const User_Controller = require("../controllers/user_controller.js");
const { authentication } = require("../middleware/auth.js");
const Unit_Kompetensi_Controller = require("../controllers/unitkompetensi_controller.js");
const Kriteria_UnitKerja = require("../controllers/kriteriaunjukkkerja_controller.js");

//controller asesi
// router.get("/asesi", Asesi_Controller.getAsesi());
router.post("/add-asesi", Asesi_Controller.createAsesi);
router.patch(
  "/edit-status-pembayaran/:id",
  Asesi_Controller.updateStatusPembayaranAsesi
);

// router.use(authentication);

//controller skema sertifikasi
router.get("/skemasertifikasi", Skema_Controller.showSkema);
router.post("/add-skemasertifikasi", Skema_Controller.createSkema);

//controller unit komptensi
router.get("/unitkompetensi", Unit_Kompetensi_Controller.show_Unit_Kompetensi);
router.post(
  "/add-unitkompetensi",
  Unit_Kompetensi_Controller.create_Unit_Kompetensi
);

//controller kriteria unit kerja
router.get("/kriteria-unitkerja", Kriteria_UnitKerja.show_Kriteria_UnitKerja);
router.post(
  "/add-kriteria-unitkerja",
  Kriteria_UnitKerja.create_Kriteria_UnitKerja
);

//controller role sertifikasi
router.get("/role", Role_Controller.showRole);
router.post("/add-role", Role_Controller.createRole);

router.get("/user", User_Controller.showUser);
router.post("/add-user", User_Controller.createUser);

module.exports = router;
