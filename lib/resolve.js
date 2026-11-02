// =============================================================================
// lib/resolve.js
// -----------------------------------------------------------------------------
// Fast, deterministic paths first. Anything unambiguous (a named condition, a
// known FAQ phrase, "surprise me", a plain greeting, "thanks"/"bye") is
// resolved locally, with zero risk of the model inventing a number.
//
// Everything else \u2014 identity questions, short contextual replies like
// "sure"/"yes"/"no", typos, "oh damn" after a fact was shown \u2014 used to fall
// into one static "I'm not sure what you meant" template. That's gone. It now
// returns { kind: 'none' }, which tells api/chat.js to hand the turn to
// lib/groq.js's routeConversation(), which has the actual conversation
// history and can either answer directly or ask the local resolver (via
// resolveAction() below) for real facts.
// =============================================================================

import { CONDITIONS, GAP_TYPE_LABELS, findConditions } from './conditions.js';
import { findFaqTopic, isGreeting } from './faq.js';

const REFERENTIAL_WORDS = /\b(it|its|it's|that|this|the score|the gap)\b/i;
const FOLLOWUP_TOPIC_WORDS = /\b(score|gap|finding|representation|rating)\b/i;
const DISCOVERY_REGEX =
  /\b(anything|whatever|surprise me|tell me something|interesting|random|teach me something)\b/i;

const SMALL_TALK = {
  howareyou: /\b(how are you|how're you|hows it going|how's it going)\b/i,
  thanks: /\b(thanks|thank you|ty|thx)\b/i,
  bye: /\b(bye|goodbye|see ya|see you|cya)\b/i,
};

export const CONDITION_LIST_TEXT = CONDITIONS.map((c) => `${c.name} (${c.slug})`).join(', ');

// Fixed, always-true facts about Verity itself. Fed to the router so it can
// answer identity questions directly instead of falling back.
export const GROUND_TRUTH = `Verity is an independent initiative conceived, designed and built entirely by one student founde, working alone \u2014 not a company, hospital,research institution or team project. It is a live research-transparency platform that measures female representation in clinical studies across a set of manually curated medical conditions. Each condition gets a Representation Score out of 100, based on how well women were represented in the underlying research, plus a "gap type" describing the kind of gap found. Verity is a science-communication and data-transparency tool \u2014 it is NOT a source of medical advice, and does not diagnose or treat anything. Users can look up a condition's score, ask how scoring works, or ask to be shown a random ("surprise me") condition.

About this chat assistant, if asked ("are you an AI", "how were you made", "what basis do you use"): yes, this is an AI assistant, powered by a large language model. It never invents the numbers it states \u2014 every representation score and finding comes from Verity's manually curated local dataset, and the AI's role is only to hold natural conversation and phrase those pre-verified facts. It does not independently research, analyze, or fact-check conditions itself.`;

export function normalize(rawText) {
  return String(rawText || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * @param {string} rawMessage - the current user message, unnormalized
 * @param {Array<{role: string, content: string}>} history - prior turns
 * @returns {{ kind: string, factsBlock: string|null, template: string|null, link: string|null }}
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
      factsBlock: null,
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
    return buildDiscoveryResolution();
  }

  if (SMALL_TALK.howareyou.test(text)) {
    return {
      kind: 'smalltalk',
      factsBlock: null,
      template:
        "I'm doing well, thanks! I'm here to help you explore research on women's representation in medical studies. Ask me about a condition, or say 'surprise me' if you'd like an interesting finding.",
      link: null,
    };
  }
  if (SMALL_TALK.thanks.test(text)) {
    return {
      kind: 'thanks',
      factsBlock: null,
      template: "You're welcome! If you'd like to explore another condition or learn more about Verity, just ask.",
      link: null,
    };
  }
  if (SMALL_TALK.bye.test(text)) {
    return {
      kind: 'bye',
      factsBlock: null,
      template: "Take care! If you ever want to explore another research topic, I'll be here.",
      link: null,
    };
  }

  // Nothing matched deterministically. Do NOT return a canned fallback here
  // \u2014 the caller (api/chat.js) will hand this to the conversational router,
  // which has real history and can actually engage with it.
  return { kind: 'none', factsBlock: null, template: null, link: null };
}

/**
 * Resolves a JSON action returned by the conversational router
 * (e.g. {"action":"lookup_condition","slug":"autism"} or {"action":"discovery"})
 * into the same shape resolveIntent() would have produced directly.
 * Returns null if the action can't be resolved (unknown/garbled slug etc.),
 * in which case the caller should fall back to the router's own plain text.
 */
export function resolveAction(action) {
  if (!action || typeof action !== 'object') return null;

  if (action.type === 'discovery') {
    return buildDiscoveryResolution();
  }

  if (action.type === 'lookup_condition' && action.slug) {
    const match = CONDITIONS.find((c) => c.slug === action.slug);
    if (match) return buildConditionResolution(match);
  }

  return null;
}

function buildDiscoveryResolution() {
  const random = CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)];
  return {
    kind: 'discovery',
    factsBlock:
      `Condition: ${random.name}\n` +
      `Representation Score: ${random.score}/100\n` +
      `Gap Type: ${GAP_TYPE_LABELS[random.gapType]}\n` +
      `Finding: ${random.summary}\n\n` +
      `Invite the user to ask more about this condition.`,
    template: `Here's an interesting one: ${random.name} has a Representation Score of ${random.score}/100. ${random.summary}`,
    link: `#/conditions/${random.slug}`,
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