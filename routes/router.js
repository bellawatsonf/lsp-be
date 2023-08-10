const express = require("express");

const router = express.Router();
const Asesi_Controller = require("../controllers/asesi_controller.js");
const Skema_Controller = require("../controllers/skema_controller.js");
const Role_Controller = require("../controllers/role_controller.js");
const User_Controller = require("../controllers/user_controller.js");
const { authentication } = require("../middleware/auth.js");
const Unit_Kompetensi_Controller = require("../controllers/unitkompetensi_controller.js");
const Kriteria_UnitKerja = require("../controllers/kriteriaunjukkkerja_controller.js");
const Asesor_Controller = require("../controllers/asesor_controller.js");
const Admin_Controller = require("../controllers/admin_controller.js");
const APL01_Controller = require("../controllers/APL01_controller.js");
const User_Login_Controller = require("../controllers/user_login_controller.js");
const Asesi_Skema_Controller = require("../controllers/asesiskema_controller.js");
const Jadwal_Controller = require("../controllers/jadwal_controller.js");
const AsesorAsesi_Controller = require("../controllers/asesor_asesi_controller.js");

//controller login
router.post("/loginGoogle", User_Login_Controller.loginGoogle);
router.post("/login", User_Login_Controller.loginAdmin);

//controller asesi
router.get("/asesi", Asesi_Controller.getAsesi);
router.get("/asesi/:id", Asesi_Controller.getAsesiById);
router.post("/add-asesi", Asesi_Controller.createAsesi);
router.patch(
  "/edit-status-pembayaran/:id",
  Asesi_Controller.updateStatusPembayaranAsesi
);
router.put("/edit-asesi/:id", Asesi_Controller.editAsesi);

// router.use(authentication);

//controller asesor
router.get("/asesor", Asesor_Controller.showAsesor);
router.post("/add-asesor", Asesor_Controller.createAsesor);

//controller admin
router.get("/admin", Admin_Controller.showAdmin);
router.post("/add-admin", Admin_Controller.createAdmin);
router.patch("/add-ttdadmin/:id", Admin_Controller.createTtdAdmin);

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

//controller asesi-skema
router.get("/asesi-skema", Asesi_Skema_Controller.show_Asesi_Skema);
router.get("/asesi-skema/:id", Asesi_Skema_Controller.getAsesiSkemaById);
router.post("/add-asesi-skema", Asesi_Skema_Controller.create_asesi_skema);

//controller role sertifikasi
router.get("/role", Role_Controller.showRole);
router.post("/add-role", Role_Controller.createRole);

//controller APL01
router.get("/apl01", APL01_Controller.showAPL01);
router.post("/add-apl01", APL01_Controller.createAPL01);

//controller jadwal
router.get("/jadwal", Jadwal_Controller.showJadwal);
router.post("/add-jadwal", Jadwal_Controller.createJadwal);

//controller asesor-asesi
router.get("/asesor", AsesorAsesi_Controller.showAsesorAsesi);
router.post("/add-asesor-asesi/:tgl", AsesorAsesi_Controller.createAsesorAsesi);

router.get("/user", User_Controller.showUser);
router.post("/add-user", User_Controller.createUser);

module.exports = router;
