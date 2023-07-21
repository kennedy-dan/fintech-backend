const express = require("express");
const { newtrry  } = require("../controllers/newtry");
const router = express.Router();
// const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../validators/auth");


router.post("/newtry" ,newtrry) ;



module.exports = router;
