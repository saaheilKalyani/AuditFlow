import express from "express";
import {
  getFrameworks,
  getFrameworkById,
  getControlsByFramework,
} from "../controllers/frameworksController.js";

const router = express.Router();

router.get("/", getFrameworks);
router.get("/:id", getFrameworkById);
router.get("/:id/controls", getControlsByFramework);

export default router;
