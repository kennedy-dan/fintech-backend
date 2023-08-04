const express = require("express");
const {
  transactionResponce,
  getTranSAction,
} = require("../controllers/transactions");
const { requireSignin } = require("../middleware");
const router = express.Router();
// const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../validators/auth");

router.get("/response", transactionResponce);
router.get("/gettransaction", requireSignin, getTranSAction);

module.exports = router;
