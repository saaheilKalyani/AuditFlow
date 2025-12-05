import Project from "../models/Project.js";
import Framework from "../models/Framework.js";

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { title, frameworks } = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    // Validate frameworks (optional or empty allowed)
    let validFrameworks = [];
    if (frameworks && frameworks.length > 0) {
      validFrameworks = await Framework.find({ _id: { $in: frameworks } });

      if (validFrameworks.length !== frameworks.length) {
        return res.status(400).json({ message: "Invalid framework IDs" });
      }
    }

    const project = await Project.create({
      userId,
      title,
      frameworks,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("frameworks", "key name year description")
      .populate("userId", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
