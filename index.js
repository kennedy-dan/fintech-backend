const env = require("dotenv");

require("./src/config/database").connect();
const express = require("express");
const cors = require("cors");
const app = express()

const Transaction = require("./src/model/transaction");

const userRoute = require('./src/routes/user')
const walletRoute = require('./src/routes/wallet')
const tranacRoute = require('./src/routes/transactions')
const tryyy = require('./src/routes/newtry')
const airtimeTransac = require('./src/routes/airtimeTrans');
app.use(cors());
app.use(express.json());

env.config()

app.use('/api', userRoute)
app.use('/api', walletRoute)
app.use('/api', tranacRoute)
app.use('/api', tryyy)
app.use('/api', airtimeTransac)

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
