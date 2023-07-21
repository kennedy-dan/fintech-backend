require("dotenv").config();
require("./src/config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");
const app = express();

// importing user context


const path = require("path");
const userRoute = require('./src/routes/user')
const walletRoute = require('./src/routes/wallet')
const tranacRoute = require('./src/routes/transactions')
const tryyy = require('./src/routes/newtry')
const airtimeTransac = require('./src/routes/airtimeTrans')
app.use(cors());;


app.use('/api', userRoute)
app.use('/api', walletRoute)
app.use('/api', tranacRoute)
app.use('/api', tryyy)
app.use('/api', airtimeTransac)





app.get("/pay", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html")); //__dirname : It will resolve to your project folder.
});


module.exports = app;
