
const Wallet = require("../model/wallet");

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