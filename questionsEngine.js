// questionsEngine.js

import { QUESTION_FLOW } from "./voice-ai/questions.js";
import { runSafetyEngine } from "./src/logic/index.js";

/**
 * Creates a question engine instance
 * @param {object} familyAnswers - shared answers object
 */
export function createQuestionsEngine(familyAnswers) {
  let currentIndex = 0;

  function getNextQuestion() {
    // Skip already-answered questions
    while (
      currentIndex < QUESTION_FLOW.length &&
      familyAnswers[QUESTION_FLOW[currentIndex].key] !== null
    ) {
      currentIndex++;
    }

    if (currentIndex >= QUESTION_FLOW.length) {
      return null; // all questions done
    }

    return QUESTION_FLOW[currentIndex];
  }

  function recordAnswer(answerBool) {
    const question = QUESTION_FLOW[currentIndex];
    if (!question) return null;

    familyAnswers[question.key] = answerBool;
    currentIndex++;

    // Re-run engine after every answer
    const engineOutput = runSafetyEngine(familyAnswers);

    return {
      answered: question.key,
      value: answerBool,
      engineOutput
    };
  }

  function isComplete() {
    return QUESTION_FLOW.every(q => familyAnswers[q.key] !== null);
  }

  return {
    getNextQuestion,
    recordAnswer,
    isComplete
  };
}
