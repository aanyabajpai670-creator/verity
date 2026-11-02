// =============================================================================
// lib/faq.js
// -----------------------------------------------------------------------------
// Structured answers for non-condition questions: methodology, scope,
// contributing, and contact. Same principle as conditions.js — these facts
// are fixed here, not left for the model to recall or improvise.
//
// MATCHING STRATEGY:
// Each topic has one or more "token groups" — arrays of word fragments that
// must ALL appear somewhere in the message (in any order, anywhere in the
// text) for that group to match. A topic matches if ANY of its groups
// matches. This is deliberately looser than exact-phrase matching, because
// real user phrasing varies a lot ("how are scores calculated" vs "how do
// you calculate representation scores" vs "how is the score determined"
// should all hit the same topic). Fragments like "calculat" are intentional
// partial stems so "calculate/calculated/calculation" all match.
//
// ORDER MATTERS: more specific topics (e.g. gap-type-2) are listed before
// more general ones (gap-type-general) so specific asks win ties.
// =============================================================================

import { GAP_TYPE_EXPLANATIONS } from './conditions.js';

export const CONTACT_EMAIL = 'verityproject.info@gmail.com';

export const FAQ_TOPICS = [
  {
    id: 'scoring-methodology',
    groups: [
      ['score', 'calculat'],
      ['scores', 'calculat'],
      ['scoring', 'methodolog'],
      ['scoring', 'work'],
      ['composite', 'score'],
      ['score', 'determin'],
    ],
    fact: 'The Representation Score is a composite metric from 0\u2013100, built from four weighted components: proportion of studies including female participants (30%), proportion of female-only studies (20%), proportion of studies with sex-disaggregated analysis (30%), and expert-assessed evidence quality (20%). Higher scores mean stronger female representation in the evidence base.',
  },
  {
    id: 'gap-type-1',
    groups: [['gap', 'type', '1'], ['gap', 'type', 'one']],
    fact: GAP_TYPE_EXPLANATIONS[1],
  },
  {
    id: 'gap-type-2',
    groups: [['gap', 'type', '2'], ['gap', 'type', 'two']],
    fact: GAP_TYPE_EXPLANATIONS[2],
  },
  {
    id: 'gap-type-3',
    groups: [['gap', 'type', '3'], ['gap', 'type', 'three']],
    fact: GAP_TYPE_EXPLANATIONS[3],
  },
  {
    id: 'gap-type-4',
    groups: [['gap', 'type', '4'], ['gap', 'type', 'four']],
    fact: GAP_TYPE_EXPLANATIONS[4],
  },
  {
    id: 'gap-type-general',
    groups: [
      ['gap', 'type'],
      ['gap', 'index'],
    ],
    fact: 'Gap Type is a label Verity assigns to each condition describing the nature of its representation gap: Type 1 is no female representation, Type 2 is women included but not separately studied, Type 3 is no significant sex-based differences found, and Type 4 is insufficient overall evidence.',
  },
  {
    id: 'why-only-women',
    groups: [
      ['why', 'only', 'women'],
      ['why', 'focus', 'women'],
      ['why', 'not', 'men'],
      ['why', 'women', 'only'],
    ],
    fact: 'Verity focuses on female representation because historically, medical research defaulted to male participants and male-typical biology as the standard, and that gap has measurable consequences for diagnosis and treatment. Verity exists to make that specific, well-documented gap visible and trackable.',
  },
  {
    id: 'is-medical-advice',
    groups: [
      ['medical', 'advice'],
      ['you', 'a', 'doctor'],
      ['is', 'this', 'medical'],
      ['is', 'verity', 'medical'],
    ],
    fact: 'Verity is a research transparency tool, not a medical advice platform. It does not diagnose conditions or recommend treatment. For personal health questions, please speak with a qualified healthcare provider.',
  },
  {
    id: 'what-is-verity',
    groups: [
      ['what', 'is', 'verity'],
      ['about', 'verity'],
      ['what', 'this', 'site'],
      ['what', 'this', 'platform'],
      ['what', 'does', 'this', 'site', 'do'],
    ],
    fact: 'Verity is a research transparency platform that measures how well women are represented in scientific and medical research. It publishes a Representation Score (0\u2013100) and citation-backed findings for ten indexed conditions. It indexes and evaluates existing published research \u2014 it does not conduct original research or provide medical advice.',
  },
  {
    id: 'contribute',
    groups: [
      ['contribute'],
      ['submit', 'gap'],
      ['suggest', 'condition'],
      ['add', 'condition'],
      ['how', 'can', 'i', 'help'],
      ['report', 'gap'],
    ],
    fact: `Verity doesn't currently have a public submission form. To suggest a condition, contribute data, or get involved, email ${CONTACT_EMAIL}.`,
  },
  {
    id: 'contact',
    groups: [
      ['contact'],
      ['email', 'you'],
      ['reach', 'out'],
      ['discrepancy'],
      ['error'],
      ['incorrect'],
      ['mistake'],
      ['inaccurate'],
      ['wrong'],
    ],
    fact: `For corrections, discrepancies, or any other questions, email ${CONTACT_EMAIL}.`,
  },
];

/**
 * Returns the first matching FAQ topic for a normalized message, or null.
 */
export function findFaqTopic(normalizedText) {
  for (const topic of FAQ_TOPICS) {
    const matches = topic.groups.some((group) =>
      group.every((fragment) => normalizedText.includes(fragment))
    );
    if (matches) return topic;
  }
  return null;
}

const GREETING_PATTERN = /^(hi|hello|hey|good morning|good afternoon|good evening|yo|sup)\b/i;

export function isGreeting(normalizedText) {
  return GREETING_PATTERN.test(normalizedText.trim());
}
