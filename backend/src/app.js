import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import frameworkRoutes from "./routes/frameworks.js";
import projectRoutes from "./routes/projects.js";
import gapRoutes from "./routes/gap.js";
import uploadRoutes from "./routes/uploads.js";
import kyoRoutes from "./routes/kyo.js";
import mappingRoutes from "./routes/mapping.js";
import reportRoutes from "./routes/reports.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/frameworks", frameworkRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", gapRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/kyo", kyoRoutes);
app.use("/api/mapping", mappingRoutes);
app.use("/api/reports", reportRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "AuditFlow backend is running",
  });
});

export default app;
