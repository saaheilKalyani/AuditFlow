import express from "express";
import {
  getGapResponses,
  saveGapResponses,
  updateGapResponse,
} from "../controllers/gapController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/:id/gap-responses", authMiddleware, getGapResponses);
router.post("/:id/gap-responses", authMiddleware, saveGapResponses);
router.patch("/:id/gap-responses/:responseId", authMiddleware, updateGapResponse);

export default router;
