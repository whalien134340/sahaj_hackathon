import { templates } from "./promptTemplates.js";

export function explainSafety(payload) {
  // OVERALL / GENERAL QUESTIONS
  if (payload.type === "OVERALL") {
    const score = payload.safetyScore;

    if (score >= 75) {
      return "Ghar ki sthiti kaafi had tak surakshit hai.";
    }

    if (score >= 45) {
      return "Ghar ki sthiti theek hai, lekin kuch jagah dabav dikh raha hai.";
    }

    return "Ghar ki financial sthiti kamzor hai aur risk zyada hai.";
  }

  // DOMAIN‑SPECIFIC (education / medical / etc.)
  return templates[payload.domain][payload.status];
}
