import express from "express";
import cors from "cors";

const srvr = express();
const port = process.env.PORT || 5000;

srvr.use(cors());
srvr.use(express.json());

srvr.use("/api/auth");
srvr.use("api/contents");

srvr.get("/", (req, res) => {
  res.send("Backend is running");
});

srvr.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
