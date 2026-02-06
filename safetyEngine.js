// src/logic/safetyEngine.js
import rules from "./rules.js";

export function calculateSafetyScore(risks) {
  let score = rules.baseScore;

  // --------------------
  // INCOME
  // --------------------
  if (risks.income === "fragile") {
    score -= rules.incomePenalty;
  }

  // --------------------
  // MEDICAL
  // --------------------
  if (risks.medical === "not_covered") {
    score -= rules.medicalPenalty;
  }

  // --------------------
  // EDUCATION
  // --------------------
  if (risks.education === "at_risk") {
    score -= rules.educationRiskPenalty;
  }

  if (risks.education === "broken") {
    score -= rules.educationBrokenPenalty;
  }

  // --------------------
  // EMERGENCY PROTECTION FUND
  // --------------------
  if (risks.emergencyFund === "weak") {
    score -= rules.emergencyWeakPenalty;
  }

  if (risks.emergencyFund === "missing") {
    score -= rules.emergencyMissingPenalty;
  }

  // --------------------
  // CLAMP SCORE
  // --------------------
  score = Math.max(0, Math.min(100, score));

  // --------------------
  // SAFETY STATE
  // --------------------
  let safetyState = "safe";

  if (score < 70) safetyState = "stressed";
  if (score < 40) safetyState = "vulnerable";

  return {
    safetyScore: score,
    safetyState
  };
}
