# Parallel review — ADHD page, scorer, report generation, inputs

**Type:** read-only review (no app source modified)
**Scope:** ADHD condition page (`#/conditions/adhd`), ADHD pilot page (`#/conditions/adhd/pilot`), scorer + report generation (`scripts/adhd_pilot.py` and companions), and their inputs.
**Companion check:** other sessions are auditing the underlying data; this review does not duplicate that work and does not touch data files.

## 0. Method and non-mutating checks run

- Static syntax checks (all passing): `node --input-type=module --check` on 18 JS modules under `js/` (app, pilot, adhd-pilot-page, data, pages, components) — OK; extracted inline script from `index.html` (306,012 chars, between first `<script>` and matching `</script>`) — OK.
- Python compile checks: `python3 -m py_compile` on all files in `scripts/` plus root `build_table.py` — OK.
- Static JSON cross-checks: `research/adhd-pilot-v2/report.json` vs `assets/adhd-pilot.js` (via `json` parse of `window.verityAdhdPilot = {...};`).
- Local preview server (`node dev-preview.mjs`) + `curl` probes: `/`, `/index.html`, `/assets/adhd-pilot.js`, `/assets/adhd-pilot-records.csv`, `/css/pilot.css`, `/css/redesign.css`, `/js/pilot.js`, `/js/adhd-pilot-page.js`, `/js/app.js` → all **200**; `/api/chatbot` → **405** on GET (expected: POST-only).

## 1. Which files actually drive the displayed ADHD figures

### 1.1 Condition page (`#/conditions/adhd`) — served entry is the monolithic `index.html`

The served production entry is `index.html`; it embeds the condition dataset and all page renderers as inline scripts (plus external scripts for the pilot). The modular files under `js/` are the alternate entry (`index_multi.html` → `js/app.js`).

Driving files:

- `index.html` inline conditions array: starts line 2822, ADHD block lines 2825–2908; ADHD metrics lines 2833–2838 (`totalStudies: 872`, `studiesIncludingWomen: {percent: 58, absolute: 506}`, `femaleOnlyStudies: {percent: 5, absolute: 44}`, `sexDisaggregated: {percent: 12, absolute: 105}`, `evidenceQuality: 2`, `representationScore: 42`); findings lines 2840–2894; sources 2898–2907; methodology 2897; related conditions 2908.
- `index.html` inline renderer `renderConditionPage` (~lines 4750–5560): representation panel title + ADHD pilot link (~5253–5292), metric tiles with `~` prefixes (~5273–5300), score tile (~5312), gap classification, what-this-means, disclaimer, accordion, sources, related conditions (~5560).
- `index.html` inline gap-type/evidence maps: lines ~2795–2807, ~3726+.
- `index.html` inline routes: pilot route added at ~6216, condition route ~6236, init ~6360–6382.
- External scripts loaded at lines 2742–2744: `assets/adhd-pilot.js`, `js/pilot.js`, `js/adhd-pilot-page.js`; styles at lines 2728–2729: `css/redesign.css`, `css/pilot.css`; Google Fonts links (Space Grotesk / Albert Sans).
- Modular mirrors (used by `index_multi.html`): `js/data/conditions.js:52+`, `js/pages/condition.js:15+`, `js/components/{metricTile,evidenceQuality,gapTypeBadge,conditionCard}.js`, `js/app.js:14+`.

### 1.2 Pilot page (`#/conditions/adhd/pilot`)

- Route: `index.html:~6216` and `js/app.js:14–19` (`/^#?\/conditions\/adhd\/pilot\/?$/`).
- Renderer: `js/adhd-pilot-page.js:1–38` (`window.renderVerityAdhdPilotPage`).
- Section builder: `js/pilot.js:78–146` (`pilotSection`), `js/pilot.js:48–69` (`methodology`), `js/pilot.js:2` (`scoreMeaning`).
- Data: `window.verityAdhdPilot` ← `assets/adhd-pilot.js:1–201` (generated file); underlying generated from `research/adhd-pilot-v2/report.json`, `study-evidence.json`, `assistant-source-review.json`, `assistant-field-review.json` via `scripts/adhd_pilot.py:publish`.

### 1.3 Assistant (secondary display of the same figures)

- `lib/conditions.js:32–123` (CONDITIONS incl. ADHD score 42 / gapType 2 at lines 34–41), `lib/resolve.js` (resolution text), `api/resolve.js`, `api/chatbot.js`, `lib/faq.js`, `api/faq.js`. Scores here match the condition-data layer (42 for ADHD).

## 2. Whether the page reflects report data consistently

- **Pilot numbers vs report file:** values in `research/adhd-pilot-v2/report.json` and `assets/adhd-pilot.js` agree on all shared keys. Differences found: `report.json` carries `pipeline_version: "62eeae4ebf7c"` but lacks `examples`; the browser asset carries `examples` but lacks `pipeline_version`. Cause: `scripts/adhd_pilot.py:publish` writes `report.json` (with `pipeline_version`, before `summary['examples'] = examples` at ~line 736) before writing the asset at ~line 737. Net effect: the browser payload ≠ report file on metadata keys.
- **Displayed pilot figures** (from `js/pilot.js` + asset): "PubMed records found" 12,351; "Studies including women" ~3,237 (projected); "Median female participation" 35.9%; "Studies reporting results by sex" ~2,471 (projected). Tables and strata follow from `projection` (sampleCounts/projectedCounts/strata).
- **Pending score:** `score: null`, all four `components` entries have `subscore: null` / `contribution: null`, `evidenceRating: null`, `screenedCorpus: null` — in both report and asset. The pilot page does not render the composite score; the condition page renders the March 2025 score (42) instead. Scoring is intentionally withheld until `--screened-corpus-size` and `--consistent-findings` are supplied (see §5).
- **Condition-page score consistency:** ADHD `representationScore: 42` present and identical in the inline copy (index.html:2838) and modular copy (js/data/conditions.js:68); assistant copy agrees (42). Metrics (scores/percentages) are in sync between the two condition-data copies; findings/sources are not (see §6).

## 3. Handling of unknown values, pending scores and numeric zero

- Scorer (`scripts/adhd_pilot.py`):
  - `normalize` (lines ~219–264): retains unknowns; drops `eligibility` when total unresolved/`n < 30`; conflict handling for `n_total`/`n_female`/`female_percent`; `proportion_basis` = reported vs calculated.
  - `describe` (lines ~322–405): `screen_complete = all(eligibility in (include, exclude))` → when false (20 unresolved in current data), all component scores → `None` → `score: null`.
  - `quality_rating` (lines ~322–346): mixes scales — compares enrollment score < 20 and split score < 5 (scores out of 100) as if they were counts.
  - `proportion_score = min(2 * median(props), 100)`.
- Page pending rendering (`js/pilot.js:71–76`): `format` → `null` becomes `'Pending'`; median uses `=== null → 'Unavailable'`; `estimate` prefixes `~`.
- Numeric zero: `normalize` uses `female_percent > 0` to decide inclusion indicators (line ~256) — a reported 0% does not force `includes_female = false`; unknown propagation via `known` set (lines ~258–263).

## 4. Links, assets, browser errors and existing build checks

- Working links/assets verified via dev-preview (all 200): pilot page assets, ledger CSV, pilot CSS, redesign CSS, JS modules.
- **Likely broken asset reference:** `index.html:6388` — `<script defer src="/<unique-path>/script.js"></script>` (placeholder path) — will 404 in any real deployment.
- `/_vercel/insights/script.js` (index.html:6384) only resolves under Vercel.
- Pilot download link: `js/pilot.js:124–125` → `assets/adhd-pilot-records.csv` (exists, 500 rows + header, 153 KB); methodology link `#/about` (js/pilot.js:126).
- No browser runtime was executed (no browser available in this session); static checks only. Syntax-clean, so no parse-time errors expected; runtime errors could not be fully excluded without a browser session.

## 5. Exact prerequisites and commands for rebuilding the score/report

- Prerequisites: Python 3 (with `curl`), Node.js (ESM, ≥18 for dev-preview), Vercel CLI for full app; hosted model API key for `--run` paths.
- Rebuild snapshot from saved extraction records (no network): `python3 scripts/adhd_pilot.py` → rewrites `research/adhd-pilot-v2/{report.json,review-queue.json,study-evidence.json}`, `assets/{adhd-pilot.js,adhd-pilot-records.csv}`. Note filename in code: `atomic(ASSETS / 'adhd-pilot.js', ...)` and `atomic(ASSETS / 'adhd-pilot-records.csv', ...)`.
- Full extraction: `python3 scripts/adhd_pilot.py --run --fulltext --background`; smoke: `python3 scripts/adhd_pilot.py --run --limit 5`; scoring inputs: `python3 scripts/adhd_pilot.py --screened-corpus-size <n> --consistent-findings yes|no`.
- Evaluation: `python3 scripts/evaluate_adhd_pilot.py`.
- Local preview: `node dev-preview.mjs` → http://127.0.0.1:8000/#/conditions/adhd/pilot.

## 6. Stale or hardcoded ADHD figures

- **Duplicate condition datasets with divergent content:** served copy (`index.html` inline, last modified Nov 10) vs modular copy (`js/data/conditions.js`, last modified Nov 24). Metrics are identical across copies for all conditions; findings and sources differ for all conditions; PCOS also differs in `name` and `lastReviewed`. The served page therefore shows ADHD findings/citations from the inline copy, which have drifted from the modular copy. `REDESIGN-NOTES.md:26` claims the embedded dataset was "compared byte for byte with the original checkout and is identical" — not true for findings/sources.
- **Hardcoded home-page statistics:** `js/pages/home.js:68–72` (e.g. "30% of cardiovascular trial participants are women", "79% of studies that include women don't analyze sex differences", "6 yrs average diagnostic delay for women with sleep apnea vs. men"); hardcoded chip/feature slugs at `js/pages/home.js:39` and `:250`.
- **Hardcoded March 2025 figures on the condition page:** ADHD 872 studies / 58% / 5% / 12% / EQ 2 / score 42 (index.html:2833–2838, js/data/conditions.js:~62–68), counts displayed with `~` (approximation) but the score displayed without a `~`.
- Assistant/FAQ references to old (March 2025) weights (30/20/30/20) vs pilot weights (25/25/35/15) — intentional separation, but FAQ text should not be read as the current pilot scoring.

## 7. Actionable findings and suggested fixes

1. **Single source of truth:** migrate served copy to `js/data/conditions.js` (or vice versa) and add a check that inline dataset == module dataset (findings, sources, metrics, PCOS fields).
2. **Pipeline provenance:** include `pipeline_version` in the browser payload (`assets/adhd-pilot.js`) and decide whether `examples` belongs in report.json.
3. **Pending score UX:** render the pending composite score state on the pilot page (currently null/not rendered) with explicit "pending" labeling.
4. **Placeholder script:** replace `/<unique-path>/script.js` in `index.html:6388`.
5. **Precision labeling:** apply consistent `~` (approximation) treatment to the Representation Score as well as counts, or document why the score is not flagged.
6. **Scoring inputs:** before any numeric score is published, supply documented `--screened-corpus-size` and `--consistent-findings`; otherwise report/asset correctly remain `score: null`.

## 8. Validation results (this session)

- JS: parse OK (modules + inline). Python: compile OK. JSON: asset/report cross-check performed.
- Local preview asset probes: OK (200).
- Condition-data divergence check: implemented ad-hoc comparison (js module vs inline array); **metrics identical across copies for all 10 conditions; findings/sources differ for all conditions; PCOS `name`/`lastReviewed` differ**.
- No final numbers were invented; all figures above are quoted from source files.

## 9. Open questions for the owning sessions

- Which copy of the condition data is canonical for the served page going forward?
- When will `--screened-corpus-size` / `--consistent-findings` be supplied, and what should the eventual ADHD pilot score be?
- Is `/<unique-path>/script.js` intentional (placeholder) or stale?
