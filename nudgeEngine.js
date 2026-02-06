// src/logic/nudgeEngine.js

export function generateNudges(actionKey, engineOutput) {
  const nudges = [];
  const { risks } = engineOutput;

  // Positive reinforcement
  if (actionKey === "SAVE_SMALL") {
    if (risks.emergencyFund !== "strong") {
      nudges.push(
        "Chhoti bachat emergency shield ko majboot banati hai."
      );
    }

    if (risks.education === "at_risk") {
      nudges.push(
        "Aaj ki bachat aage padhai ke risk ko kam kar sakti hai."
      );
    }
  }

  // Negative pressure explanation
  if (actionKey === "SPEND_NON_ESSENTIAL") {
    nudges.push(
      "Yeh kharcha family safety par dabav daal sakta hai."
    );
  }

  if (actionKey === "SKIP_SAVING") {
    nudges.push(
      "Aaj bachat nahi hui, emergency taiyari aage nahi badhi."
    );
  }

  return nudges;
}
