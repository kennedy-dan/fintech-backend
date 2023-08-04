const User = require("../model/user");
const WalletTransaction = require("../model/wallet_transaction");
const Wallet = require("../model/wallet");
const axios = require("axios");
const path = require("path");
const Transaction = require("../model/transaction");

const validateUserWallet = async (userId) => {
  try {
    // check if user have a wallet, else create wallet
    const userWallet = await Wallet.findOne({ userId });

    if (!userWallet) {
      // create wallet
      const wallet = await Wallet.create({
        userId,
      });
      return wallet;
    }
    return userWallet;
  } catch (error) {
    console.log(error);
  }
};

const createWalletTransaction = async (userId, status, currency, amount) => {
  try {
    // create wallet transaction
    const walletTransaction = await WalletTransaction.create({
      amount,
      userId,
      isInflow: true,
      currency,
      status,
    });
    return walletTransaction;
  } catch (error) {
    console.log(error);
  }
};

const createTransaction = async (
  userId,
  id,
  status,
  currency,
  amount,
  customer
) => {
  try {
    // create transaction
    const transaction = await Transaction.create({
      userId,
      transactionId: id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone_number,
      amount,
      currency,
      paymentStatus: status,
      paymentGateway: "flutterwave",
    });
    return transaction;
  } catch (error) {
    // console.log(error);
  }
};

const updateWallet = async (userId, amount) => {
  try {
    // update wallet
    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true }
    );
    return wallet;
  } catch (error) {
    // console.log(error);
  }
};

exports.transactionResponce = async (req, res) => {
  const { transaction_id, tx_ref } = req.query;
  console.log(tx_ref);

  // URL with transaction ID of which will be used to confirm transaction status
  const url = `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`;

  // Network call to confirm transaction status
  const response = await axios({
    url,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY_TWO}`,
    },
  });

  const { status, currency, id, amount, customer } = response.data.data;
  // console.log(response.data.data);

  // check if transaction id already exist

  const transactionExist = await Transaction.findOne({ transactionId: id });

  if (transactionExist) {
    return res.status(409).send("Transaction Already Exist");
  }
  // check if customer exist in our database
  const user = await User.findOne({ email: customer.email });
  console.log(amount); 
  console.log(customer.email);

  // check if user have a wallet, else create wallet
  const wallet = await validateUserWallet(user._id);

  // create wallet transaction
  await createWalletTransaction(user._id, status, currency, amount);

  // create transaction
  await createTransaction(user._id, id, status, currency, amount, customer);

  await updateWallet(user._id, amount);
  if (wallet) {
    res.sendFile(path.join(__dirname + "/index.html"));
  }
  // return res.status(200).json({
  //   response: "wallet funded successfully",
  //   data: wallet,
  // });

  return res.sendFile(path.join(__dirname, "/index.html"));


};

  exports.getTranSAction = async (req,res) => {
    const bills = await Transaction.find({userId:req.user._id});
  
    res.status(200).json({
      success: true,
      bills,
    });
  }
