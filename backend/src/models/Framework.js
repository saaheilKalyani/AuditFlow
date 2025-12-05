// backend/src/models/Framework.js
import mongoose from "mongoose";

const FrameworkSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "ISO27001"
    name: { type: String, required: true },               // e.g. "ISO 27001"
    year: { type: Number },                               // e.g. 2022
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sector: { type: String },                             // e.g. "Finance"
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Framework", FrameworkSchema);
