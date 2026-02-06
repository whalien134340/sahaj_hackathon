// voice-ai/domainStatusMapper.js

export function getDomainStatus(risks) {
  return {
    EDUCATION: risks.education === "stable" ? "good" : "bad",
    MEDICAL: risks.medical === "covered" ? "good" : "bad",
    EMERGENCY: risks.emergencyFund === "strong" ? "good" : "bad",
    INCOME: risks.income === "stable" ? "good" : "bad"
  };
}
