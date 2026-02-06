// testEngine.js
// PURE LOGIC TEST (Node-safe)

import { runSafetyEngine } from "./src/logic/index.js";
import { explainScenario } from "./risk-scenarios/scenarioExplainEngine.js";
import { RISK_SCENARIOS } from "./risk-scenarios/questions.js";

// ----------------------------
// TEST CASES
// ----------------------------
const strongFamily = {
  childrenInSchool: true,
  feeDelays: false,
  dropoutFear: false,
  medicalCovered: true,
  canHandleEmergency: true,
  hasSupportNetwork: true,
  singleIncome: false,
  emergencySavingsActive: true
};

const weakFamily = {
  childrenInSchool: true,
  feeDelays: true,
  dropoutFear: true,
  medicalCovered: false,
  canHandleEmergency: false,
  hasSupportNetwork: false,
  singleIncome: true,
  emergencySavingsActive: false
};

// ----------------------------
// RUN TEST
// ----------------------------
function runTest(label, family) {
  console.log("\n==============================");
  console.log("TEST:", label);

  const engineOutput = runSafetyEngine(family);

  console.log("SAFETY SCORE:", engineOutput.safetyScore);
  console.log("SAFETY STATE:", engineOutput.safetyState);
  console.log("RISKS:", engineOutput.risks);

  console.log("\n--- RISK SCENARIOS ---");
  for (const scenario of RISK_SCENARIOS) {
    const result = explainScenario(scenario, engineOutput);
    console.log(
      scenario.id,
      "→",
      result.level,
      "|",
      result.message
    );
  }
}

// ----------------------------
// EXECUTE
// ----------------------------
runTest("STRONG FAMILY", strongFamily);
runTest("WEAK FAMILY", weakFamily);
