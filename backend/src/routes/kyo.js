import express from "express";
import { analyzeKYO } from "../controllers/kyoController.js";

const router = express.Router();

router.post("/analyze", analyzeKYO);

export default router;
