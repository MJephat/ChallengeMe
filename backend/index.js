import express from "express";
import cors from "cors";
import paymentRoutes from "./Routes/Payment.route.js";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
