const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const AirtimeCatsSchema = Schema(
  {
    type: {
        type : Object,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

const AirtimeCats = model("AirtimeCats", AirtimeCatsSchema);
module.exports = AirtimeCats;
