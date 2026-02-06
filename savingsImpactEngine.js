// src/logic/savingsImpactEngine.js

export function evaluateSavingsImpact(action, engineOutput) {
  const impacts = [];

  const { risks } = engineOutput;

  // Emergency buffer logic
  if (action === "SAVE_SMALL") {
    if (risks.emergencyFund !== "strong") {
      impacts.push({
        type: "positive",
        message: "Saving thoda‑thoda emergency shield ko majboot banata hai."
      });
    }

    if (risks.education === "at_risk") {
      impacts.push({
        type: "positive",
        message: "Aaj ki chhoti bachat aage padhai ka risk kam kar sakti hai."
      });
    }
  }

  if (action === "SPEND_NON_ESSENTIAL") {
    if (risks.emergencyFund !== "strong") {
      impacts.push({
        type: "negative",
        message: "Yeh kharcha emergency safety ko kamzor karta hai."
      });
    }
  }

  if (action === "SKIP_SAVING") {
    impacts.push({
      type: "warning",
      message: "Aaj bachat nahi hui, emergency taiyari ruk gayi hai."
    });
  }

  return impacts;
}
