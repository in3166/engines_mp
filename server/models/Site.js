const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: 1,
    },
    name: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    engines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Engine" }],
    partStock: [
      {
        _id: false,
        part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
        stock: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);

module.exports = { Site };
