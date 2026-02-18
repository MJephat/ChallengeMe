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
