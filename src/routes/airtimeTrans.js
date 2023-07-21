const express = require("express");
const {
  createAirtime,
  getDataCats,
  getAirtimeCats,
  getCableCats,
  getPowerCats,
  getInternetrCats
} = require("../controllers/airtimeTransaction");
const { requireSignin } = require("../middleware/index");
const router = express.Router();
// const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../validators/auth");

router.post("/airtime", createAirtime);
router.get("/getdata", getDataCats);
router.get("/getcable", getCableCats);
router.get("/getpower", getPowerCats);
router.get("/getairtime", getAirtimeCats);
router.get("/getinternet", getInternetrCats);

module.exports = router;
