const express = require("express");

const router = express.Router();
const Asesi_Controller = require("../controllers/asesi_controller");

// router.get("/asesi", Asesi_Controller.getAsesi());
router.post("/add-asesi", Asesi_Controller.createAsesi);

module.exports = router;
