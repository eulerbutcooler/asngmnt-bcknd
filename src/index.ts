import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database.js";
import authRouter from "./routes/authRoutes.js";
import contentRouter from "./routes/contentRoutes.js";

dotenv.config();
connectDB();

const srvr = express();
const port = process.env.PORT || 5000;

srvr.use(cors());
srvr.use(express.json());

srvr.use("/api/auth", authRouter);
srvr.use("/api/content", contentRouter);

srvr.get("/", (req, res) => {
  res.send("Backend is running");
});

srvr.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
