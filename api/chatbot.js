// =============================================================================
// api/chat.js
// -----------------------------------------------------------------------------
// PIPELINE:
//   1. Rate-limit check (best-effort, in-memory)
//   2. Normalize input
//   3. Local safety gate \u2014 personal medical questions refused deterministically
//   4. Local intent resolution (lib/resolve.js):
//        - Direct condition / FAQ / discovery / greeting / small-talk match
//          -> phrase with Groq (or use the deterministic template if Groq
//             fails), exactly like before.
//        - Nothing matched (kind: 'none') -> NEW: handed to the
//          conversational router (lib/groq.js: routeConversation), which has
//          the real conversation history and can:
//            a) answer directly (identity questions, "sure"/"yes"/"no" in
//               context, typos, acknowledgments like "oh damn"), or
//            b) ask for a specific local fact via a JSON action, which is
//               resolved via resolve.js's resolveAction() and then phrased
//               with real numbers, same as any other fact-based reply.
//   5. A static "something went wrong" message is now ONLY used if Groq
//      itself is unreachable for a 'none'-kind turn \u2014 the true last resort,
//      not the default behavior for anything unrecognized.
//   6. Link/slug is always attached in JS, never by the model.
// =============================================================================

import { normalize, resolveIntent, resolveAction, GROUND_TRUTH, CONDITION_LIST_TEXT } from '../lib/resolve.js';
import { isPersonalMedicalRequest, MEDICAL_ADVICE_REFUSAL } from '../lib/safety.js';
import { phraseFacts, routeConversation, repairRouterFormat } from '../lib/groq.js';

const SITE_BASE_URL = 'https://verityproject.xyz/';

function appendLinkToReply(reply, link) {
  if (!link) return reply;
  return `${reply} ${SITE_BASE_URL}${link}`;
}

// -----------------------------------------------------------------------
// RATE LIMITING (best-effort, unchanged)
// -----------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

// -----------------------------------------------------------------------
// Extract a JSON action from the router's reply, even if the model slipped
// and wrapped it in stray text (e.g. "Let's look at PCOS. {"type":...}").
// Finds the first '{' through the last '}' rather than requiring the whole
// string to be pure JSON \u2014 this is what makes leakage structurally
// impossible instead of just "unlikely if the model behaves."
// Returns null only if no valid JSON object is present at all.
// -----------------------------------------------------------------------
function tryParseAction(routerText) {
  const unfenced = routerText.replace(/```json|```/gi, '');
  const start = unfenced.indexOf('{');
  const end = unfenced.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) return null;
  try {
    return JSON.parse(unfenced.slice(start, end + 1));
  } catch {
    return null;
  }
}

// -----------------------------------------------------------------------
// HANDLER
// -----------------------------------------------------------------------
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ reply: 'Method not allowed.', link: null });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      reply: "You're sending messages a bit quickly \u2014 please wait a moment and try again.",
      link: null,
    });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ reply: 'Please enter a message.', link: null });
  }

  const safeHistory = Array.isArray(history)
    ? history
        .filter((t) => t && typeof t.content === 'string' && t.content.trim())
        .slice(-8)
        .map((t) => ({
          role: t.role === 'assistant' ? 'assistant' : 'user',
          content: String(t.content).slice(0, 1000),
        }))
    : [];

  const trimmedMessage = message.slice(0, 1000);

  try {
    // ---- Step 1: local safety gate, no LLM involved ------------------
    const normalized = normalize(trimmedMessage);
    if (isPersonalMedicalRequest(normalized)) {
      return res.status(200).json({ reply: MEDICAL_ADVICE_REFUSAL, link: null });
    }

    // ---- Step 2: deterministic intent resolution ----------------------
    const resolution = resolveIntent(trimmedMessage, safeHistory);

    // Ambiguous clarifying question: exact, no benefit from paraphrasing.
    if (resolution.kind === 'ambiguous') {
      return res.status(200).json({ reply: resolution.template, link: null });
    }

    // Direct fact match (condition / faq / greeting / discovery): phrase it.
    if (resolution.factsBlock !== null) {
      const phrased = await phraseFacts(resolution.factsBlock);
      const reply = phrased || resolution.template;
      return res.status(200).json({
        reply: appendLinkToReply(reply, resolution.link),
        link: resolution.link,
      });
    }

    // Small talk with a fixed, safe template (how are you / thanks / bye):
    // still fine to return directly, no numbers involved.
    if (resolution.template) {
      return res.status(200).json({ reply: resolution.template, link: null });
    }

    // ---- Step 3: nothing matched locally \u2014 hand off to the router ------
    const routerReply = await routeConversation({
      history: safeHistory,
      userMessage: trimmedMessage,
      groundTruth: GROUND_TRUTH,
      conditionList: CONDITION_LIST_TEXT,
    });

    if (!routerReply) {
      // True last resort: Groq itself is unreachable.
      return res.status(200).json({
        reply:
          "Hmm, having a little trouble thinking right now \u2014 mind trying that again in a moment?",
        link: null,
      });
    }

    let action = tryParseAction(routerReply);

    // First reply broke the JSON contract (happens on complex/reflective
    // questions) \u2014 try once more with a blunt correction before giving up.
    if (!action || typeof action.type !== 'string') {
      const repaired = await repairRouterFormat({
        history: safeHistory,
        userMessage: trimmedMessage,
        groundTruth: GROUND_TRUTH,
        conditionList: CONDITION_LIST_TEXT,
        badReply: routerReply,
      });
      if (repaired) action = tryParseAction(repaired);
    }

    // The router always replies in {"type": "say"|"lookup_condition"|"discovery"}.
    // If we still can't parse valid JSON after the retry, that's the true edge
    // case \u2014 never show raw text, since it may contain a malformed/partial blob.
    if (!action || typeof action.type !== 'string') {
      return res.status(200).json({
        reply: "Sorry, could you say that a bit differently? I can look up a condition's score, or surprise you with one.",
        link: null,
      });
    }

    if (action.type === 'say' && typeof action.text === 'string' && action.text.trim()) {
      return res.status(200).json({ reply: action.text.trim(), link: null });
    }

    const resolved = resolveAction(action);
    if (resolved) {
      const phrased = await phraseFacts(resolved.factsBlock);
      const reply = phrased || resolved.template;
      return res.status(200).json({
        reply: appendLinkToReply(reply, resolved.link),
        link: resolved.link,
      });
    }

    // Router asked for something we couldn't resolve (bad/garbled slug, or
    // "say" with no usable text) \u2014 ask a friendly clarifying question rather
    // than exposing anything malformed.
    return res.status(200).json({
      reply: "Which condition would you like to know about \u2014 or should I surprise you with one?",
      link: null,
    });
  } catch (err) {
    console.error('Unhandled error in /api/chat:', err);
    return res.status(200).json({
      reply:
        "Something went wrong on my end. You can try again, or reach us directly at verityproject.info@gmail.com.",
      link: null,
    });
  }
}