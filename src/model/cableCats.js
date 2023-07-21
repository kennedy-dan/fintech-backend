const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CableCatsSchema = Schema(
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

const CableCats = model("CableCats", CableCatsSchema);
module.exports = CableCats;
