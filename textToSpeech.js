export function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";   // Hindi voice
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}
