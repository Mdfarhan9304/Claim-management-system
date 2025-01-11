const mongoose = require("mongoose");

const Claim = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    claimAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    uploadedDocument: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approve", "Reject"],
      default: "Pending",
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    insurerComments: { type: String, default: "" },
    approvedAmount: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", Claim);
