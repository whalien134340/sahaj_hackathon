// src/logic/index.js
import { classifyRisks } from "./riskClassifier.js";
import { calculateSafetyScore } from "./safetyEngine.js";

export function runSafetyEngine(familyInput) {
  // --------------------
  // STEP 1: CLASSIFY RISKS
  // --------------------
  const { risks } = classifyRisks(familyInput);

  /*
    Expected risks shape:
    {
      income: "stable" | "fragile",
      medical: "covered" | "not_covered",
      education: "ok" | "at_risk" | "broken",
      emergencyFund: "stable" | "weak" | "missing"
    }
  */

  // --------------------
  // STEP 2: CALCULATE SCORE
  // --------------------
  const { safetyScore, safetyState } = calculateSafetyScore(risks);

  // --------------------
  // STEP 3: RETURN SINGLE TRUTH OBJECT
  // --------------------
  return {
    safetyScore,
    safetyState,
    risks
  };
}
