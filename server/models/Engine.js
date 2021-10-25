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
      // 교체시기
      type: Number,
    },
    //   recentRepairDate: { // 최근 수리 날짜
    //     type: Date,
    //   },
    //   futureCheck: { // 예상
    //     type: Date,
    //   },
    //   maintenanceHistory:[
    //     {
    //       parts: [{
    //         part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
    //         repairNumber: { type: Number },
    //       }],
    //       date:{
    //         type: Date,
    //       },
    //       site:{
    //         type: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
    //       }
    //     }
    //   ]
  },
  { timestamps: true }
);

const Engine = mongoose.model("Engine", engineSchema);

module.exports = { Engine };
