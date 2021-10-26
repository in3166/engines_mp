const mongoose = require("mongoose");

const criterionSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: 1,
    },
    part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
    kw: {
      high: { type: Number },
      low: { type: Number },
    },
    temper: {
      high: { type: Number },
      low: { type: Number },
    },
    inspection: {
      high: { type: Number },
      low: { type: Number },
    },
    mtbf: {
      type: String,
    },
    realFailure: {
      type: String,
    },
    predictedFailure: {
      high: { type: Number },
      low: { type: Number },
    },
  },
  { timestamps: true }
);

const Criterion = mongoose.model("Criterion", criterionSchema);

module.exports = { Criterion };
