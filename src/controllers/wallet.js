const Wallet = require("../model/wallet");
const Airtime = require("../model/airtimeTransaction");
const User = require("../model/user");
const axios = require("axios");

exports.getWallet = async (req, res) => {
  try {
    // const { userId } = req.params;
    const wallet = await Wallet.findOne({ userId: req.user._id });
    // user
    res.status(200).json(wallet.balance);
  } catch (err) {
    console.log(err);
  }
};

exports.updateWallet = async (req, res) => {
  console.log(req.params);
  const url = `https://api.flutterwave.com/v3/bills/${req.params.transId}`;
  const response = await axios({
    url,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
    },
  });

  const { status, currency, id, amount, customer } = response.data.data;



  try {
    const account = await User.findOne({ email: req.params.user });
    const user = account._id
console.log(user)
    // update wallet
    // if (user) {
      const wallet = await Wallet.findOneAndUpdate(
        { userId: user },
        { $inc: { balance: -amount } },
        { new: true }
      );
      console.log(wallet);

      res.status(200).json(wallet);
    // }

   
  } catch (error) {
    console.log(error);
  }
};
