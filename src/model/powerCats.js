const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const PowerCatsSchema = Schema(
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

const PowerCats = model("PowerCats", PowerCatsSchema);
module.exports = PowerCats;
