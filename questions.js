// risk-scenarios/questions.js
// Risk Scenario Planning – Hinglish + Hindi

export const RISK_SCENARIOS = [
  {
    id: "MEDICAL_EMERGENCY",
    hinglish:
      "Agar ghar mein kisi ko achanak hospital jana pade, toh kya bina qarz ke sambhal paoge?",
    hindi:
      "यदि घर में किसी को अचानक अस्पताल जाना पड़े, तो क्या आप बिना कर्ज़ लिए स्थिति संभाल पाएंगे?",
    checks: ["medical", "emergency"]
  },

  {
    id: "EDUCATION_SHOCK",
    hinglish:
      "Agar agle 2–3 mahine mein school ki badi fees deni ho, toh ghar par kitna dabav padega?",
    hindi:
      "यदि अगले 2–3 महीनों में स्कूल की बड़ी फीस देनी पड़े, तो घर की स्थिति पर कितना असर पड़ेगा?",
    checks: ["education", "emergency"]
  },

  {
    id: "INCOME_LOSS",
    hinglish:
      "Agar kuch mahine ke liye kamai ruk jaaye, toh kya ghar ke kharche chal paayenge?",
    hindi:
      "यदि कुछ महीनों के लिए आय रुक जाए, तो क्या घर के खर्च चल पाएंगे?",
    checks: ["income", "emergency"]
  },

  {
    id: "FESTIVAL_SPEND",
    hinglish:
      "Agar tyohar ya shaadi ka kharcha aa jaaye, toh kya emergency fund par asar padega?",
    hindi:
      "यदि त्योहार या शादी का खर्च आ जाए, तो क्या आपातकालीन बचत पर असर पड़ेगा?",
    checks: ["emergency"]
  }
];
