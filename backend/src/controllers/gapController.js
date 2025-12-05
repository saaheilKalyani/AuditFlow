import GapResponse from "../models/GapResponse.js";
import Project from "../models/Project.js";
import Control from "../models/Control.js";
import EvidenceFile from "../models/EvidenceFile.js";
import { calculateScore } from "../utils/scoring.js";
import { generateRecommendations } from "../utils/recommendations.js";
import Framework from "../models/Framework.js";

// GET /api/projects/:id/gap-responses
export const getGapResponses = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;

    const responses = await GapResponse.find({ projectId, userId })
      .populate("controlId", "controlId name requirement")
      .populate("evidenceFiles");

    res.json(responses);
  } catch (error) {
    console.error("Error fetching gap responses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/projects/:id/gap-responses
// Used for initial save or autosave submission of multiple responses
export const saveGapResponses = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ message: "responses must be an array" });
    }

    const savedResponses = [];

    for (const r of responses) {
      const { controlId, response, notes } = r;

      // Validate required fields
      if (!controlId || !response) continue;

      // Ensure control exists
      const controlExists = await Control.findById(controlId);
      if (!controlExists) continue;

      // Upsert logic: update if exists, else create
      const saved = await GapResponse.findOneAndUpdate(
        { projectId, userId, controlId },
        { response, notes },
        { new: true, upsert: true }
      );

      savedResponses.push(saved);
    }

    res.status(201).json({
      message: "Responses saved",
      responses: savedResponses,
    });
  } catch (error) {
    console.error("Error saving gap responses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/projects/:id/gap-responses/:responseId
// Used for autosave (single-response update)
export const updateGapResponse = async (req, res) => {
  try {
    const { responseId } = req.params;
    const userId = req.userId;

    const { response, notes } = req.body;

    const updated = await GapResponse.findOneAndUpdate(
      { _id: responseId, userId },
      { response, notes },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Gap response not found" });
    }

    res.json({
      message: "Response updated",
      response: updated,
    });
  } catch (error) {
    console.error("Error updating gap response:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/projects/:id/gap-summary
export const getGapSummary = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;

    // Get project frameworks
    const project = await Project.findById(projectId).populate("frameworks");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Fetch all controls across selected frameworks
    const controls = await Control.find({
      frameworkId: { $in: project.frameworks.map((f) => f._id) },
    });

    const totalControls = controls.length;

    // Get all user responses
    const responses = await GapResponse.find({ projectId, userId });

    // Missing = controls with NO GapResponse
    const missing = controls.filter(
      (c) => !responses.some((r) => r.controlId.toString() === c._id.toString())
    );

    // Partial = GapResponse with response === PARTIAL
    const partial = responses
      .filter((r) => r.response === "PARTIAL")
      .map((r) => controls.find((c) => c._id.toString() === r.controlId.toString()));

    // Score
    const score = calculateScore(responses, totalControls);

    // Recommendations
    const recommendations = generateRecommendations(missing, partial);

    res.json({
      projectId,
      frameworks: project.frameworks,
      totalControls,
      answered: responses.length,
      missingControls: missing.length,
      partialControls: partial.length,
      score,
      missing: missing.map((c) => ({
        id: c._id,
        controlId: c.controlId,
        name: c.name,
      })),
      partial: partial.map((c) => ({
        id: c._id,
        controlId: c.controlId,
        name: c.name,
      })),
      recommendations,
    });
  } catch (error) {
    console.error("Gap Summary Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};