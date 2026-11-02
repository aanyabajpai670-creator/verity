// =============================================================================
// lib/safety.js
// -----------------------------------------------------------------------------
// Hard, local gate against personal medical-advice requests. This runs BEFORE
// intent detection and BEFORE any LLM call, and short-circuits the whole
// pipeline with a fixed, deterministic response. The LLM never sees these
// messages and is never the thing deciding whether to refuse.
//
// This is deliberately conservative: false positives (blocking something
// that was actually benign) are an acceptable cost here. False negatives
// (letting a personal medical question through) are not.
// =============================================================================

const PATTERNS = [
  // Direct requests for personal diagnosis/advice
  /\bdo i have\b/i,
  /\bam i (going to|gonna)?\s*(have|dying|okay|ok)\b/i,
  /\bshould i (take|stop|start|see a doctor|go to|worry)\b/i,
  /\bis it normal (that|for|to)\b/i,
  /\bwhat('?s| is) wrong with me\b/i,
  /\bdiagnos(e|is|ed)\s+me\b/i,
  /\bmy (doctor|symptoms?|diagnosis)\b/i,
  /\b(i('?m| am)|i've been) (experiencing|feeling|having)\b/i,
  /\bcan you (diagnose|treat|prescribe)\b/i,
  /\bwhat (dose|dosage)\b/i,
  /\bhow much .* (should i take|to take)\b/i,
  /\bis this (a symptom|dangerous|serious)\b/i,
  /\btreat(ment)? for my\b/i,
  /\bcure (my|for my)\b/i,
];

export function isPersonalMedicalRequest(normalizedText) {
  return PATTERNS.some((pattern) => pattern.test(normalizedText));
}

export const MEDICAL_ADVICE_REFUSAL =
  "I'm not able to help with personal medical questions \u2014 Verity is a research transparency tool, not a medical advice platform. For anything about your own health, please speak with a qualified healthcare provider. I'm happy to share what Verity's data shows about a condition's research gap, if that's useful instead.";
