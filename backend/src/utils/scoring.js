// scoring.js

export const calculateScore = (responses, totalControls) => {
  if (totalControls === 0) return 0;

  let score = 0;

  responses.forEach((r) => {
    if (r.response === "YES") score += 100;
    else if (r.response === "PARTIAL") score += 50;
    else score += 0;
  });

  return Math.round(score / totalControls);
};
