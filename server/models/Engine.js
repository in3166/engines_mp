const mongoose = require("mongoose");

const engineSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: 1,
    },
    name: {
      type: String,
      maxlength: 50,
    },
    requiredParts: [
      {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
        requiredNumber: { type: Number },
      },
    ],
    defaultLifespan: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Engine = mongoose.model("Engine", engineSchema);

module.exports = { Engine };
