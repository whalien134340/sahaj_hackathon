// app.js
// FINAL INTEGRATED CORE – QUESTIONS, SAFETY SCORE, VOICE, RISK SCENARIOS

// ------------------------------------
// IMPORTS
// ------------------------------------
import { detectDomain } from "./voice-ai/intentRouter.js";
import { getDomainStatus } from "./voice-ai/domainStatusMapper.js";
import { explainSafety } from "./voice-ai/explainSafety.js";
import { createQuestionsEngine } from "./questionsEngine.js";
import { startListening } from "./voice-ai/speechToText.js";

import { RISK_SCENARIOS } from "./risk-scenarios/questions.js";
import { explainScenario } from "./risk-scenarios/scenarioExplainEngine.js";

// ------------------------------------
// SINGLE SOURCE OF TRUTH
// ------------------------------------
const familyAnswers = {
  childrenInSchool: null,
  feeDelays: null,
  dropoutFear: null,
  medicalCovered: null,
  canHandleEmergency: null,
  hasSupportNetwork: null,
  singleIncome: null,
  emergencySavingsActive: null
};

const questionsEngine = createQuestionsEngine(familyAnswers);

// Latest evaluated engine state
let engineOutput = null;
let domainStatus = null;

// ------------------------------------
// UI ELEMENTS (CURRENT TEST UI)
// ------------------------------------
const micBtn = document.getElementById("mic");
const statusEl = document.getElementById("status");
const heardEl = document.getElementById("heard");
const replyEl = document.getElementById("reply");
const safetyEl = document.getElementById("safetyStatus");

// ------------------------------------
// QUESTIONS: SHOW NEXT QUESTION
// (HINGLISH + HINDI TOGETHER)
// ------------------------------------
export function getNextQuestionText() {
  const q = questionsEngine.getNextQuestion();

  if (!q) return null;

  return `Question:
${q.hinglish}
${q.hindi}`;
}

// ------------------------------------
// QUESTIONS: RECORD ANSWER (TRUE / FALSE)
// ------------------------------------
export function recordAnswer(answerBool) {
  const result = questionsEngine.recordAnswer(answerBool);

  engineOutput = result.engineOutput;
  domainStatus = getDomainStatus(engineOutput.risks);

  renderSafetyStatus();
}

// ------------------------------------
// SAFETY STATUS (SCORE DISPLAY)
// ------------------------------------
export function getSafetyStatus() {
  if (!engineOutput) {
    return {
      ready: false,
      message: "Abhi family ki puri jaankari nahi hai."
    };
  }

  return {
    ready: true,
    safetyScore: engineOutput.safetyScore,
    safetyState: engineOutput.safetyState,
    risks: engineOutput.risks
  };
}

function renderSafetyStatus() {
  const status = getSafetyStatus();

  if (!status.ready) {
    safetyEl.innerText = status.message;
    return;
  }

  safetyEl.innerText =
    `Score: ${status.safetyScore}/100 · Status: ${status.safetyState}`;
}

// ------------------------------------
// VOICE → SAFETY EXPLANATION
// (OVERALL + DOMAIN QUESTIONS)
// ------------------------------------
export function explainCurrentStatus(userText) {
  if (!engineOutput) {
    return "Pehle family se judi kuch basic jaankari chahiye.";
  }

  const domain = detectDomain(userText);

  // OVERALL (DIRECTLY SCORE-BASED)
  if (domain === "GENERAL") {
    return explainSafety({
      type: "OVERALL",
      safetyScore: engineOutput.safetyScore,
      safetyState: engineOutput.safetyState
    });
  }

  // DOMAIN (SCORE → RISK → TEMPLATE)
  return explainSafety({
    type: "DOMAIN",
    domain,
    status: domainStatus[domain],
    risks: engineOutput.risks
  });
}

// ------------------------------------
// RISK SCENARIO: GET QUESTION
// ------------------------------------
export function getRiskScenarioQuestion(scenarioId) {
  return RISK_SCENARIOS.find((s) => s.id === scenarioId) || null;
}

// ------------------------------------
// RISK SCENARIO: EXPLAIN IMPACT
// (READ-ONLY, DOES NOT CHANGE SCORE)
// ------------------------------------
export function explainRiskScenario(scenarioId) {
  if (!engineOutput) {
    return "Pehle family ki safety jaankari complete honi chahiye.";
  }

  const scenario = RISK_SCENARIOS.find((s) => s.id === scenarioId);

  if (!scenario) {
    return "Yeh risk scenario uplabdh nahi hai.";
  }

  const result = explainScenario(scenario, engineOutput);

  return result.message;
}

// ------------------------------------
// VOICE BUTTON WIRING
// (CURRENTLY FOR STATUS QUESTIONS)
// ------------------------------------
micBtn.onclick = () => {
  startListening(
    (text) => {
      heardEl.innerText = text;
      replyEl.innerText = explainCurrentStatus(text);
    },
    (state) => {
      if (state === "listening") {
        statusEl.innerText = "🔴 Listening… speak now";
        micBtn.disabled = true;
      } else {
        statusEl.innerText = "🟢 Idle — tap Speak";
        micBtn.disabled = false;
      }
    }
  );
};

// ------------------------------------
// INITIAL RENDER: FIRST QUESTION
// ------------------------------------
const firstQuestion = getNextQuestionText();
if (firstQuestion) {
  replyEl.innerText = firstQuestion;
}
