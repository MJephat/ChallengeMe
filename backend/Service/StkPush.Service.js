import axios from "axios";
import { getAccessToken } from "./mpesa.Auth.service.js";
import StkPayment from "../Model/StkPayment.js";

export const initiateStkPush = async ({ phone, amount, reference,name }) => {

  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    process.env.SHORTCODE +
    process.env.PASSKEY +
    timestamp
  ).toString("base64");

  const token = await getAccessToken();

  const payload = {
    BusinessShortCode: process.env.SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: reference,
    TransactionDesc: "STK Payment"
  };

  const response = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // Save pending transaction
  await StkPayment.create({
    merchantRequestId: response.data.MerchantRequestID,
    checkoutRequestId: response.data.CheckoutRequestID,
    phoneNumber: phone,
    amount,
    accountReference: reference,
    customerName:name,
    rawRequest: response.data
  });

  return response.data;
};
