export function classifyRisks(family) {
  const risks = {};
  const reasons = [];

  // Income stability
  if (family.earners === 1) {
    risks.income = "fragile";
    reasons.push({ code: "SINGLE_INCOME", severity: "high" });
  } else {
    risks.income = "stable";
  }

  // Medical protection
  if (!family.medicalCovered) {
    risks.medical = "not_covered";
    reasons.push({ code: "NO_MEDICAL_COVER", severity: "high" });
  } else {
    risks.medical = "covered";
  }

  // Education continuity
  if (!family.childrenInSchool) {
    risks.education = "broken";
    reasons.push({ code: "EDUCATION_STOPPED", severity: "high" });
  } else if (family.feeDelays || !family.educationSavings) {
    risks.education = "at_risk";
    reasons.push({ code: "EDUCATION_AT_RISK", severity: "medium" });
  } else {
    risks.education = "stable";
  }

  // Emergency + Woman Safety Shield
  if (family.emergencyShieldActive) {
    risks.emergencyFund = "strong";
  } else if (!family.hasEmergencySavings && !family.hasSupportNetwork) {
    risks.emergencyFund = "missing";
    reasons.push({
      code: "NO_EMERGENCY_SUPPORT",
      severity: "high"
    });
  } else if (!family.hasEmergencySavings) {
    risks.emergencyFund = "weak";
    reasons.push({
      code: "WEAK_EMERGENCY_SUPPORT",
      severity: "medium"
    });
  } else {
    risks.emergencyFund = "strong";
  }

  return { risks, reasons };
}
