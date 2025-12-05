import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "AuditFlow backend is running",
  });
});

export default app;
