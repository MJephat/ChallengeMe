import StkPayment from "../Model/StkPayment.js";
import { initiateStkPush } from "../Service/StkPush.Service.js";
import { normalizePhone } from "../Util/phone.util.js";

export const pay1100 = async (req, res) => {
  try {
    const { phone, name } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone required" });
    }

    const normalized = normalizePhone(phone);

    // ✅ CAPTURE RESPONSE FROM SERVICE
    const stkResponse = await initiateStkPush({
      phone: normalized,
      amount: 1,
      reference: "Kitty Classic",
      name
    });

    //res.redirect("/success");
      // ✅ SEND RESPONSE BACK TO CLIENT
    res.json({
      success: true,
      stk: stkResponse
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
};

// getting all fetched recorrds
export const getAllPayments = async (req, res) => {
  try {
    const payments = await StkPayment.find()
      .sort({ createdAt: -1 }); // newest first

    res.json({
      success: true,
      count: payments.length,
      data: payments
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to fetch payments"
    });
  }
};

// get all successiful payments
export const getSuccessfulPayments = async (req, res) => {
  try {
    const payments = await StkPayment.find({ status: "SUCCESS" })
      .select("customerName phoneNumber amount mpesaReceiptNumber createdAt")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: payments.length,
      data: payments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch successful payments"
    });
  }
};
