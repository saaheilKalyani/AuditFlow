// backend/src/models/Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    frameworks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Framework" } // selected framework ids
    ],
    // optional metadata fields (expandable later)
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
