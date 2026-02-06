// voice-ai/intentRouter.js

export function detectDomain(text) {
  if (!text) return "GENERAL";

  const t = text.toLowerCase();

  // EDUCATION
  if (
    /पढ़ाई|पढाई|स्कूल|शिक्षा/.test(t) ||
    /padhai|school|study|padhna/.test(t)
  ) {
    return "EDUCATION";
  }

  // MEDICAL
  if (
    /बीमारी|इलाज|दवा|अस्पताल/.test(t) ||
    /bimari|hospital|dawai|ill/.test(t)
  ) {
    return "MEDICAL";
  }

  // EMERGENCY / SAVINGS
  if (
    /आपात|emergency|अचानक|मुसीबत|बचत/.test(t)
  ) {
    return "EMERGENCY";
  }

  // INCOME
  if (
    /कमाई|नौकरी|आमदनी/.test(t) ||
    /income|job|naukri/.test(t)
  ) {
    return "INCOME";
  }

  return "GENERAL";
}
