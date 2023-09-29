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
const Provinsi_Controller = require("../controllers/provinsi_controller.js");
const Info_Controller = require("../controllers/info_controller.js");
const Jadwal_AsesiSkema_Controller = require("../controllers/jadwal_asesiskema_controller.js");
const Jadwal_AsesiSkema_Asesor_Controller = require("../controllers/jadwal_asesiskema_asesor_controller.js");
const APL02_Controller = require("../controllers/APL02_controller.js");
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
// router.put("/edit-formapl01-asesi/:id", Asesi_Controller.editAsesiDiFormApl);

// router.use(authentication);

//controller asesor
router.get("/asesor", Asesor_Controller.showAsesor);
router.get("/all-asesor", Asesor_Controller.showAsesorWithoutPaging);
router.post("/add-asesor", Asesor_Controller.createAsesor);
// router.patch("/add-ttdasesor/:id", Admin_Controller.createTtdAsesor);
router.delete("/delete-asesor/:id", Asesor_Controller.deleteAsesor);
router.patch("/edit-asesor/:id", Asesor_Controller.editAsesor);
router.get("/get-asesorById/:id", Asesor_Controller.showAsesorById);

//controller admin
router.get("/admin", Admin_Controller.showAdmin);
router.post("/add-admin", Admin_Controller.createAdmin);
router.patch("/add-ttdadmin/:id", Admin_Controller.createTtdAdmin);
router.delete("/delete-admin/:id", Admin_Controller.deleteAdmin);
router.patch("/edit-admin/:id", Admin_Controller.editAdmin);
router.get("/get-adminById/:id", Admin_Controller.showAdminById);

//controller skema sertifikasi
router.get("/skemasertifikasi", Skema_Controller.showSkema);
router.get("/skemasertifikasiwithpage", Skema_Controller.showSkemaWithPaging);
router.post("/add-skemasertifikasi", Skema_Controller.createSkema);
router.get("/get-skemaById/:id", Skema_Controller.getSkemaById);
router.put("/edit-skemaById/:id", Skema_Controller.editSkema);
router.delete("/delete-skema/:id", Skema_Controller.deleteSkema);

//controller unit komptensi
router.get("/unitkompetensi", Unit_Kompetensi_Controller.show_Unit_Kompetensi);
router.post(
  "/add-unitkompetensi",
  Unit_Kompetensi_Controller.create_Unit_Kompetensi
);
router.get(
  "/unitkompetensibyid/:id",
  Unit_Kompetensi_Controller.getUnitKompetensiById
);
router.put(
  "/edit-unitkompetensibyid/:id",
  Unit_Kompetensi_Controller.editUnitKompetensi
);
router.delete(
  "/delete-unitkompetensibyid/:id",
  Unit_Kompetensi_Controller.deleteUnitKompetensi
);

//controller kriteria unit kerja
router.get("/kriteria-unitkerja", Kriteria_UnitKerja.show_Kriteria_UnitKerja);
router.post(
  "/add-kriteria-unitkerja",
  Kriteria_UnitKerja.create_Kriteria_UnitKerja
);
router.get("/kriteriakerjabyid/:id", Kriteria_UnitKerja.getKriteriaKerjaById);
router.put("/edit-kriteriakerjabyid/:id", Kriteria_UnitKerja.editKriteriaKerja);
router.delete(
  "/delete-kriteriakerjabyid/:id",
  Kriteria_UnitKerja.deleteKriteriaKerja
);

//controller asesi-skema
router.get("/asesi-skema", Asesi_Skema_Controller.show_Asesi_Skema);
router.get("/asesi-skema/:id", Asesi_Skema_Controller.getAsesiSkemaById);
router.post("/add-asesi-skema", Asesi_Skema_Controller.create_asesi_skema);
router.get("/get-detail/:id", Asesi_Skema_Controller.getAsesiSkemaDetail);
router.delete(
  "/delete-asesiskema/:id",
  Asesi_Skema_Controller.deleteAsesiSkema
);
router.patch(
  "/update-status-cek/:id",
  Asesi_Skema_Controller.updateStatusCekAsesiSkema
);

//controller role sertifikasi
router.get("/role", Role_Controller.showRole);
router.post("/add-role", Role_Controller.createRole);

//controller APL01
router.get("/apl01", APL01_Controller.showAPL01);
router.get("/apl01-withoutpage", APL01_Controller.showAPL01WithoutPage);
router.post("/add-apl01", APL01_Controller.createAPL01);
router.get("/apl01byid/:id", APL01_Controller.showAPL01ById);
router.get("/apl01byuser/:id", APL01_Controller.showAPL01ByUser);
router.get("/apl01byalluser/:id", APL01_Controller.showAPL01ByAllUser);

//controller jadwal
router.get("/jadwal", Jadwal_Controller.showJadwal);
router.post("/add-jadwal", Jadwal_Controller.createJadwal);
router.get("/getById/:id", Jadwal_Controller.getJadwalById);
router.patch("/edit-jadwal/:id", Jadwal_Controller.editJadwal);
router.delete("/delete-jadwal/:id", Jadwal_Controller.deleteJadwal);

//controller jadwal asesiskema
router.get("/jadwal-asesiskema", Jadwal_AsesiSkema_Controller.showJadwal);
router.post(
  "/add-jadwal-asesiskema/:idJadwal",
  Jadwal_AsesiSkema_Controller.createJadwal
);
router.get(
  "/getById-jadwalasesiskema/:id",
  Jadwal_AsesiSkema_Controller.getJadwalById
);
router.patch(
  "/edit-jadwal-asesiskema/:id",
  Jadwal_AsesiSkema_Controller.editJadwal
);
router.delete(
  "/delete-jadwal-asesiskema/:id",
  Jadwal_AsesiSkema_Controller.deleteJadwal
);

//controller jadwal asesiskema asesor
router.get(
  "/jadwal-asesiskema-asesor",
  Jadwal_AsesiSkema_Asesor_Controller.showJadwal
);
router.post(
  "/add-jadwal-asesiskema-asesor/:idJadwal",
  Jadwal_AsesiSkema_Asesor_Controller.createJadwal
);
router.get(
  "/getById-jadwalasesiskema/:id",
  Jadwal_AsesiSkema_Asesor_Controller.getJadwalById
);
router.patch(
  "/edit-jadwal-asesiskema-asesor/:id",
  Jadwal_AsesiSkema_Asesor_Controller.editJadwal
);
router.delete(
  "/delete-jadwal-asesiskema-asesor/:id",
  Jadwal_AsesiSkema_Asesor_Controller.deleteJadwal
);

//controller APL02
router.get("/apl02", APL02_Controller.showAPL02);
router.post("/add-apl02", APL02_Controller.createAPL02);
router.get("/apl02byid/:id", APL02_Controller.showAPL02ById);
router.get("/apl02byuser/:id", APL02_Controller.showAPL02ByUser);
router.get("/apl02byalluser/:id", APL02_Controller.showAPL02ByAllUser);
router.get("/apl02byapl01id/:id", APL02_Controller.showAPL02ByApl01Id);

//controller asesor-asesi
router.get("/asesor", AsesorAsesi_Controller.showAsesorAsesi);
// router.post("/add-asesor-asesi/:tgl", AsesorAsesi_Controller.createAsesorAsesi);

router.get("/user", User_Controller.showUser);
router.post("/add-user", User_Controller.createUser);

router.get("/provinsi", Provinsi_Controller.getProvinsi);
router.get("/kota/:idProv", Provinsi_Controller.getKota);

router.get("/info/:idUser", Info_Controller.getInfoByUser);

//download img
router.get("/download-asesi/:namafileparam", Asesi_Controller.downloadAsesi);
router.get("/download-admin/:namafileparam", Admin_Controller.downloadAdmin);
router.get("/getIdJadwal/:id", Jadwal_AsesiSkema_Asesor_Controller.getIdJadwal);
module.exports = router;
