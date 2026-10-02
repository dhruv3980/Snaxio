import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import dns from "dns";
import authRouter from "./routers/auth.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
  ConnectDB();

});