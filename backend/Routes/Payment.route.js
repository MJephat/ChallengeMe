import express from "express";
import { getAllPayments, getSuccessfulPayments, pay1100 } from "../Controller/payment.controller.js";
import { stkCallback } from "../Controller/callback.controller.js";
import { successPage } from "../Controller/page.controller.js";

const router = express.Router();

router.post("/pay/1100", pay1100);
router.get("/success", successPage);
router.post("/mpesa/callback", stkCallback);
router.get("/payments", getAllPayments)
router.get("/payments/success", getSuccessfulPayments);


export default router;
