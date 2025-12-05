import express from "express";
import {
  getGapResponses,
  saveGapResponses,
  updateGapResponse,
  getGapSummary,
} from "../controllers/gapController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/:id/gap-responses", authMiddleware, getGapResponses);
router.post("/:id/gap-responses", authMiddleware, saveGapResponses);
router.patch("/:id/gap-responses/:responseId", authMiddleware, updateGapResponse);
router.get("/:id/gap-summary", authMiddleware, getGapSummary);

export default router;
