import GapResponse from "../models/GapResponse.js";
import Project from "../models/Project.js";
import Control from "../models/Control.js";
import EvidenceFile from "../models/EvidenceFile.js";

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
