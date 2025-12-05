import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import frameworkRoutes from "./routes/frameworks.js";
import projectRoutes from "./routes/projects.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/frameworks", frameworkRoutes);
app.use("/api/projects", projectRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "AuditFlow backend is running",
  });
});

export default app;
