const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const DataCatsSchema = Schema(
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

const DataCats = model("DataCats", DataCatsSchema);
module.exports = DataCats;
