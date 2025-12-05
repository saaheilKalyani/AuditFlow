import express from "express";
import { uploadEvidence, deleteEvidence } from "../controllers/uploadController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/", authMiddleware, upload.array("files", 10), uploadEvidence);
router.delete("/:fileId", authMiddleware, deleteEvidence);

export default router;
