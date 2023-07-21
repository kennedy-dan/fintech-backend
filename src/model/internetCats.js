const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const InternetCatsSchema = Schema(
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

const InternetCats = model("InternetCats", InternetCatsSchema);
module.exports = InternetCats;
