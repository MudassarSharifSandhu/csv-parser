const mongoose = require("mongoose");

const parseSchema = mongoose.Schema(
  {
    ModelNumber: {
      type: String,
      required: true,
      trim: true,
    },
    Vendor: {
      type: String,
      required: true,
      trim: true,
    },
    UnitPrice: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Date: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bulkinserts", parseSchema);