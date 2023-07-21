const express = require("express");
const { transactionResponce  } = require("../controllers/transactions");
const router = express.Router();
// const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../validators/auth");


router.get("/response" ,transactionResponce) ;



module.exports = router;
