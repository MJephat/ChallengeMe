import StkPayment from "../Model/StkPayment.js";

export const stkCallback = async (req, res) => {
  try {
    const callback = req.body.Body.stkCallback;

    const update = {
      resultCode: callback.ResultCode,
      resultDesc: callback.ResultDesc,
      rawCallback: req.body
    };

    if (callback.ResultCode === 0) {
      const meta = callback.CallbackMetadata.Item;

      update.status = "SUCCESS";
      update.amount = meta.find(i => i.Name === "Amount")?.Value;
      update.mpesaReceiptNumber =
        meta.find(i => i.Name === "MpesaReceiptNumber")?.Value;
      update.phoneNumber =
        meta.find(i => i.Name === "PhoneNumber")?.Value;

    } else {
      update.status = "FAILED";
    }

    await StkPayment.updateOne(
      { checkoutRequestId: callback.CheckoutRequestID },
      update
    );

    res.json({ ok: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Callback failed" });
  }
};
