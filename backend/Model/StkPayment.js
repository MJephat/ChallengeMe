import mongoose from "mongoose";

const stkPaymentSchema = new mongoose.Schema({
  merchantRequestId: String,

  checkoutRequestId: {
    type: String,
    unique: true,
    index: true
  },

  phoneNumber: String,
  amount: Number,

  mpesaReceiptNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  customerName:String,
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING"
  },

  resultCode: Number,
  resultDesc: String,

  accountReference: String,

  rawRequest: Object,
  rawCallback: Object

}, { timestamps: true });

export default mongoose.model("StkPayment", stkPaymentSchema);
