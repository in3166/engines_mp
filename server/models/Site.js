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
    engines: [
      {
        _id: false,
        id: { type: String },
        engine: { type: mongoose.Schema.Types.ObjectId, ref: "Engine" },
        repairHistory: [
          {
            date: { type: String },
            status: { type: String },
            part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
          },
        ],
      },
    ],
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
