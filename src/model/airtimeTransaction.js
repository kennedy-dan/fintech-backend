const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const AirtimeSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    network: {
      type: String,
      required: [true, "network is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    transactionId: {
      type: String,
      required: [true, "amount is required"],
    },
    // paymentGateway: {
    //   type: String,
    //   required: [true, "payment gateway is required"],
    //   enum: ["flutterwave"], // Payment gateway might differs as the application grows
    // },
  },
  {
    timestamps: true,
  }
);

const Airtime = model("Airtime", AirtimeSchema);
module.exports = Airtime;
