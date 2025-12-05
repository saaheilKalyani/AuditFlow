import mongoose from "mongoose";

const GapResponseSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    controlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Control",
      required: true,
    },

    response: {
      type: String,
      enum: ["YES", "NO", "PARTIAL"],
      required: true,
    },

    notes: { type: String },

    evidenceFiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EvidenceFile",
      },
    ],
  },
  { timestamps: true }
);

// Prevent duplicate gap responses for same project + control + user
GapResponseSchema.index(
  { projectId: 1, controlId: 1, userId: 1 },
  { unique: true }
);

export default mongoose.model("GapResponse", GapResponseSchema);
