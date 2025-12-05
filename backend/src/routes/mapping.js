import express from "express";
import { getFrameworkMapping } from "../controllers/mappingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:projectId", authMiddleware, getFrameworkMapping);

export default router;
