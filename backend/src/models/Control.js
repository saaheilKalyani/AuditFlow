// backend/src/models/Control.js
import mongoose from "mongoose";

const ControlSchema = new mongoose.Schema(
  {
    frameworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Framework",
      required: true,
    },
    controlId: { type: String, required: true }, // unique id inside framework, e.g. "ISO_A.5.1"
    name: { type: String, required: true },      // short title of control
    requirement: { type: String },               // full control text / requirement
  },
  { timestamps: true }
);

// Optional: create a compound index to prevent duplicate controlId per framework
ControlSchema.index({ frameworkId: 1, controlId: 1 }, { unique: true });

export default mongoose.model("Control", ControlSchema);
