// backend/src/utils/kyoScoring.js

/**
 * weights: 
 * industry = 40%
 * region = 40%
 * dataSensitivity = 20%
 */

export const calculateKyoScore = (input, framework) => {
  let score = 0;

  // INDUSTRY MATCH
  if (framework.sector && input.industry) {
    if (framework.sector.toLowerCase() === input.industry.toLowerCase()) {
      score += 40;
    }
  }

  // REGION MATCH
  if (framework.region && input.region) {
    if (framework.region.toLowerCase() === input.region.toLowerCase()) {
      score += 40;
    }
  }

  // DATA SENSITIVITY MATCH
  if (framework.dataSensitivity && input.dataSensitivity) {
    if (
      framework.dataSensitivity
        .toLowerCase()
        .includes(input.dataSensitivity.toLowerCase())
    ) {
      score += 20;
    }
  }

  return score;
};
