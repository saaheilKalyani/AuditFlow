// backend/src/routes/reports.js
import express from "express";
import { getReportJson, getReportCsv, getReportPdf } from "../controllers/reportController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All endpoints are protected
router.get("/:projectId/json", authMiddleware, getReportJson);
router.get("/:projectId/csv", authMiddleware, getReportCsv);
router.get("/:projectId/pdf", authMiddleware, getReportPdf);

export default router;
