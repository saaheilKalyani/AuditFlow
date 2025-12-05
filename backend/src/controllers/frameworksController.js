import Framework from "../models/Framework.js";
import Control from "../models/Control.js";

// GET /api/frameworks
export const getFrameworks = async (req, res) => {
  try {
    const frameworks = await Framework.find().sort({ name: 1 });
    res.json(frameworks);
  } catch (error) {
    console.error("Error fetching frameworks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/frameworks/:id
export const getFrameworkById = async (req, res) => {
  try {
    const framework = await Framework.findById(req.params.id);
    if (!framework) {
      return res.status(404).json({ message: "Framework not found" });
    }
    res.json(framework);
  } catch (error) {
    console.error("Error fetching framework:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/frameworks/:id/controls
export const getControlsByFramework = async (req, res) => {
  try {
    const controls = await Control.find({ frameworkId: req.params.id })
      .sort({ controlId: 1 });

    res.json(controls);
  } catch (error) {
    console.error("Error fetching controls:", error);
    res.status(500).json({ message: "Server error" });
  }
};
