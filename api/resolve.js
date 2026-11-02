// =============================================================================
// lib/resolve.js
// -----------------------------------------------------------------------------
// This is the "brain" of the bot, and it is plain JavaScript, not the LLM.
// Given a message (+ recent history), it decides what the user is asking
// about, using only local data (conditions.js, faq.js), and returns:
//
//   - factsBlock: the exact facts the LLM is allowed to phrase (or null if
//                 no LLM call should happen at all)
//   - template:   a fully-formed, correct plain-text reply usable with zero
//                 LLM involvement (used on Groq failure, or directly for
//                 intents that don't need natural-language phrasing)
//   - link:       the slug-derived route, attached locally, never by the LLM
//
// The LLM is never asked "what condition is this" or "what slug should I
// link to" \u2014 by the time we build a prompt for it, those questions are
// already answered.
// =============================================================================

import { CONDITIONS, GAP_TYPE_LABELS, findConditions } from './conditions.js';
import { findFaqTopic, isGreeting } from './faq.js';

const REFERENTIAL_WORDS = /\b(it|its|it's|that|this|the score|the gap)\b/i;
const FOLLOWUP_TOPIC_WORDS = /\b(score|gap|finding|representation|rating)\b/i;
const DISCOVERY_REGEX =
  /\b(anything|whatever|surprise me|tell me something|interesting|random|teach me something)\b/i;

const CONDITION_LIST_TEXT = CONDITIONS.map((c) => c.name).join(', ');
const SMALL_TALK = {
  howareyou: /\b(how are you|how're you|hows it going|how's it going)\b/i,
  thanks: /\b(thanks|thank you|ty|thx)\b/i,
  bye: /\b(bye|goodbye|see ya|see you|cya)\b/i,
  yes: /\b(yes|yeah|yep|sure|okay|ok)\b/i,
  no: /^\s*(no|nah|nope)\s*$/i
};

export function normalize(rawText) {
  return String(rawText || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * @param {string} rawMessage - the current user message, unnormalized
 * @param {Array<{role: string, content: string}>} history - prior turns
 * @returns {{ kind: string, factsBlock: string|null, template: string, link: string|null }}
 */
export function resolveIntent(rawMessage, history = []) {
  const text = normalize(rawMessage);

  const directMatches = findConditions(text);

  if (directMatches.length > 1) {
    const names = directMatches.map((c) => c.name);
    const nameList = names.length === 2
      ? `${names[0]} and ${names[1]}`
      : `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
    return {
      kind: 'ambiguous',
      factsBlock: null, // no LLM call \u2014 this is a fixed clarifying question
      template: `I found matches for ${nameList} \u2014 which one did you mean?`,
      link: null,
    };
  }

  if (directMatches.length === 1) {
    return buildConditionResolution(directMatches[0]);
  }

  const faqTopic = findFaqTopic(text);
  if (faqTopic) {
    return {
      kind: 'faq',
      factsBlock: `Topic: ${faqTopic.id}\nFact to convey: ${faqTopic.fact}`,
      template: faqTopic.fact,
      link: null,
    };
  }

  // Follow-up like "what about its score?" with no condition named directly
  // \u2014 resolve against the most recently discussed condition in history.
  if (REFERENTIAL_WORDS.test(text) && FOLLOWUP_TOPIC_WORDS.test(text)) {
    const lastCondition = findLastConditionInHistory(history);
    if (lastCondition) {
      return buildConditionResolution(lastCondition);
    }
  }

  if (isGreeting(text)) {
    return {
      kind: 'greeting',
      factsBlock: `The user greeted you. Invite them, in one short sentence, to ask about a specific condition's representation score, or how Verity's scoring works. Available conditions: ${CONDITION_LIST_TEXT}.`,
      template: `Hi! I can help you find a condition's representation score, explain how Verity's scoring works, or point you to how to get in touch. What would you like to know?`,
      link: null,
    };
  }
if (DISCOVERY_REGEX.test(text)) {
    const random =
        CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)];

    return {
        kind: "discovery",

        factsBlock:
`Condition: ${random.name}
Representation Score: ${random.score}/100
Gap Type: ${GAP_TYPE_LABELS[random.gapType]}
Finding: ${random.summary}

Invite the user to ask more about this condition.`,

        template:
`Here's an interesting one: ${random.name} has a Representation Score of ${random.score}/100. ${random.summary}`,

        link: `#/conditions/${random.slug}`
    };
}
if (SMALL_TALK.howareyou.test(text)) {
    return {
        kind: "smalltalk",
        factsBlock: null,
        template:
        "I'm doing well, thanks! I'm here to help you explore research on women's representation in medical studies. Ask me about a condition, or say 'surprise me' if you'd like an interesting finding.",
        link: null
    };
}
if (SMALL_TALK.thanks.test(text)) {
    return {
        kind: "thanks",
        factsBlock: null,
        template: "You're welcome! If you'd like to explore another condition or learn more about Verity, just ask.",
        link: null
    };
}
if (SMALL_TALK.bye.test(text)) {
    return {
        kind: "bye",
        factsBlock: null,
        template: "Take care! If you ever want to explore another research topic, I'll be here.",
        link: null
    };
}
if (SMALL_TALK.no.test(text)) {
    return {
        kind: "clarify",
        factsBlock: null,
        template:
        "No worries. What would you like to know instead? You can ask about a condition, compare two conditions, or just say 'surprise me.'",
        link: null
    };
}

  return {
    kind: 'fallback',
    factsBlock: `The user's message did not match a known condition or topic on Verity. Politely explain, in one short sentence, that you can help with: looking up a condition's representation score and findings, explaining how scores are calculated, explaining what Verity is, or how to contact Verity. Do not guess what they meant. Use template like I'm not sure what you meant.

Here are a few things you can ask:

• Surprise me
• Compare ADHD and Autism
• Which condition has the biggest gap?
• Explain Gap Type 2.`,
    template: `I'm not sure I can help with that here. I can look up a condition's representation score and findings, explain how Verity's scoring works, or point you to how to contact us \u2014 what would you like to know?`,
    link: null,
  };
}

function buildConditionResolution(condition) {
  const link = `#/conditions/${condition.slug}`;
  const gapLabel = GAP_TYPE_LABELS[condition.gapType];

  return {
    kind: 'condition',
    factsBlock:
      `Condition: ${condition.name}\n` +
      `Representation Score: ${condition.score}/100\n` +
      `Gap Type: ${gapLabel}\n` +
      `Finding: ${condition.summary}`,
    template: `${condition.name} has a Representation Score of ${condition.score}/100 (${gapLabel}). ${condition.summary}`,
    link,
  };
}

function findLastConditionInHistory(history) {
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const turn = history[i];
    if (!turn || turn.role !== 'user' || !turn.content) continue;
    const matches = findConditions(normalize(turn.content));
    if (matches.length === 1) return matches[0];
  }
  return null;
}
