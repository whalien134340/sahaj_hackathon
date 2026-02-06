// risk-scenarios/scenarioExplainEngine.js
// Explains impact of a scenario using existing risks

export function explainScenario(scenario, engineOutput) {
  const { risks, safetyScore } = engineOutput;

  const failedChecks = scenario.checks.filter(
    (key) => risks[key] === "bad"
  );

  // HIGH RISK
  if (failedChecks.length === scenario.checks.length) {
    return {
      level: "HIGH",
      message:
        "Is situation mein kai jagah se risk dikh raha hai. Achanak kharcha ghar par zyada dabav daal sakta hai."
    };
  }

  // MEDIUM RISK
  if (failedChecks.length > 0) {
    return {
      level: "MEDIUM",
      message:
        "Is situation ko kuch had tak sambhala ja sakta hai, lekin dabav mehsoos hoga."
    };
  }

  // LOW RISK
  return {
    level: "LOW",
    message:
      "Is situation ke liye tayari theek lag rahi hai. Turant bada khatra nahi dikh raha."
  };
}
