import express from "express";
import { createProject, getProjectById } from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createProject);
router.get("/:id", authMiddleware, getProjectById);

export default router;
