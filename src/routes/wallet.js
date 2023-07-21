const express = require("express");
const { getWallet  } = require("../controllers/wallet");
const router = express.Router();
const { requireSignin } = require("../middleware/index");

// const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../validators/auth");


router.get("/wallet/balance" ,requireSignin, getWallet) ;



module.exports = router;
