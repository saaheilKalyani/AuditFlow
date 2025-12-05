import Framework from "../models/Framework.js";
import { calculateKyoScore } from "../utils/kyoScoring.js";

// POST /api/kyo/analyze
export const analyzeKYO = async (req, res) => {
  try {
    const input = req.body;

    if (!input.industry || !input.region || !input.dataSensitivity) {
      return res.status(400).json({
        message: "industry, region, and dataSensitivity are required fields",
      });
    }

    const frameworks = await Framework.find();

    const scored = frameworks.map((fw) => ({
      framework: fw,
      score: calculateKyoScore(input, fw),
    }));

    // Sort frameworks by score (descending)
    scored.sort((a, b) => b.score - a.score);

    res.json({
      input,
      results: scored.map((fw) => ({
        id: fw.framework._id,
        key: fw.framework.key,
        name: fw.framework.name,
        year: fw.framework.year,
        score: fw.score,
        sector: fw.framework.sector,
        description: fw.framework.description,
      })),
    });
  } catch (error) {
    console.error("KYO Analyze Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
