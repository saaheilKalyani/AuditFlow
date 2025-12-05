// recommendations.js

export const generateRecommendations = (missing, partial) => {
  const recs = [];

  missing.forEach((c) => {
    recs.push({
      type: "MISSING",
      controlId: c.controlId,
      message: `Control "${c.name}" is missing. Implement this control to improve compliance.`,
    });
  });

  partial.forEach((c) => {
    recs.push({
      type: "PARTIAL",
      controlId: c.controlId,
      message: `Control "${c.name}" is partially implemented. Complete documentation or processes.`,
    });
  });

  return recs;
};
