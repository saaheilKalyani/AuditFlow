import Project from "../models/Project.js";
import Control from "../models/Control.js";
import GapResponse from "../models/GapResponse.js";
import { findEquivalentControls } from "../utils/mappingLogic.js";

// GET /api/mapping/:projectId
export const getFrameworkMapping = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.userId;

    // Load project with frameworks
    const project = await Project.findById(projectId).populate("frameworks");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.frameworks.length < 2) {
      return res.status(400).json({
        message: "At least 2 frameworks are required for mapping",
      });
    }

    // Load controls for frameworks
    const frameworks = project.frameworks;
    const controlsByFw = {};

    for (const fw of frameworks) {
      controlsByFw[fw._id] = await Control.find({ frameworkId: fw._id });
    }

    // Pairwise framework mapping
    const mappings = [];

    for (let i = 0; i < frameworks.length - 1; i++) {
      for (let j = i + 1; j < frameworks.length; j++) {
        const fwA = frameworks[i];
        const fwB = frameworks[j];

        const result = findEquivalentControls(
          controlsByFw[fwA._id],
          controlsByFw[fwB._id]
        );

        mappings.push({
          frameworkA: fwA,
          frameworkB: fwB,
          pairs: result,
        });
      }
    }

    // Calculate compliance % based on user responses
    const responses = await GapResponse.find({ projectId, userId });

    const compliance = {};

    for (const fw of frameworks) {
      const fwControls = controlsByFw[fw._id];
      const total = fwControls.length;
      const answered = responses.filter((r) =>
        fwControls.map((c) => c._id.toString()).includes(r.controlId.toString())
      );

      const yes = answered.filter((r) => r.response === "YES").length;
      const partial = answered.filter((r) => r.response === "PARTIAL").length;

      const compliancePercent = Math.round(
        ((yes * 1.0 + partial * 0.5) / total) * 100
      );

      compliance[fw._id] = {
        framework: fw,
        compliancePercent,
      };
    }

    res.json({
      projectId,
      frameworks,
      mappings,
      compliance,
    });
  } catch (error) {
    console.error("Mapping Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
