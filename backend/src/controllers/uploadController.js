import EvidenceFile from "../models/EvidenceFile.js";
import fs from "fs";

// POST /api/uploads
export const uploadEvidence = async (req, res) => {
  try {
    const userId = req.userId;
    const projectId = req.body.projectId;

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const saved = [];

    for (const file of files) {
      const record = await EvidenceFile.create({
        filename: file.filename,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
        projectId,
        userId,
      });

      saved.push(record);
    }

    res.status(201).json({
      message: "Files uploaded successfully",
      files: saved,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/uploads/:fileId
export const deleteEvidence = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const record = await EvidenceFile.findById(fileId);

    if (!record) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete file from storage
    fs.unlink(record.path, (err) => {
      if (err) console.error("File delete error:", err);
    });

    await record.deleteOne();

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
