// backend/src/utils/mappingLogic.js

/**
 * Matches controls across frameworks by:
 * - ControlId similarity
 * - Keyword matching
 * - Requirement text similarity (basic)
 */

export const findEquivalentControls = (controlsA, controlsB) => {
  const mapping = [];

  for (const cA of controlsA) {
    let bestMatch = null;
    let bestScore = 0;

    for (const cB of controlsB) {
      let score = 0;

      // Control ID similarity
      if (cA.controlId.split(".")[0] === cB.controlId.split(".")[0]) {
        score += 40;
      }

      // Name similarity
      if (cB.name.toLowerCase().includes(cA.name.toLowerCase())) {
        score += 30;
      }

      // Requirement similarity (very simple heuristic)
      if (
        cB.requirement &&
        cA.requirement &&
        cB.requirement.toLowerCase().includes(cA.requirement.toLowerCase().slice(0, 10))
      ) {
        score += 30;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = cB;
      }
    }

    mapping.push({
      source: cA,
      target: bestMatch,
      score: bestScore, // 0–100
    });
  }

  return mapping;
};
