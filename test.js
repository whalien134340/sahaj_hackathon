// test.js

import { classifyRisks } from "./riskClassifier.js";
import { calculateSafetyScore } from "./safetyEngine.js";
import { generateNudges } from "./nudgeEngine.js";

/*
  This object normally comes from UI questions.
  Users answer Yes/No questions — UI converts them to true/false.
*/
const family = {
  earners: 1,

  // Medical
  medicalCovered: false,

  // Education inputs
  childrenInSchool: true,
  feeDelays: true,
  educationSavings: false,

  // Emergency capacity inputs
  hasEmergencySavings: false,
  hasSupportNetwork: true,

  // Woman Safety Fund / Shield toggle
  emergencyShieldActive: false
};

// --- Engine execution ---
const { risks, reasons } = classifyRisks(family);
const { safetyScore, safetyState } =
  calculateSafetyScore(risks);

const nudges = generateNudges(risks);

const output = {
  safetyScore,
  safetyState,
  risks,
  emergencyFund: { status: risks.emergencyFund },
  reasons,
  nudges
};

// --- Human‑readable output ---
presentOutput(output);

// -----------------------------
// Human readable formatter
// -----------------------------
function presentOutput(output) {
  console.log("\n🛡️ FAMILY SAFETY SUMMARY");
  console.log("Safety Score:", output.safetyScore);

  const stateLabel = {
    safe: "SAFE",
    stressed: "STRESSED",
    vulnerable: "VULNERABLE"
  };

  console.log(
    "Family Condition:",
    stateLabel[output.safetyState]
  );

  console.log("\nRisk Status:");

  console.log(
    "Income Stability:",
    output.risks.income === "fragile"
      ? "Single income dependency"
      : "Income stable"
  );

  console.log(
    "Medical Protection:",
    output.risks.medical === "covered"
      ? "Medical protection available"
      : "Medical protection missing"
  );

  console.log(
    "Education Continuity:",
    output.risks.education === "stable"
      ? "Education stable"
      : output.risks.education === "at_risk"
      ? "Education under pressure"
      : "Education stopped"
  );

  console.log(
    "Emergency Protection:",
    output.emergencyFund.status === "strong"
      ? "Emergency protection strong"
      : output.emergencyFund.status === "weak"
      ? "Emergency protection weak"
      : "No emergency protection"
  );

  if (output.nudges.length) {
    console.log("\nSuggested Improvements:");
    output.nudges.forEach(n =>
      console.log("-", n.replaceAll("_", " "))
    );
  }

  console.log("\n---------------------------------\n");
}
