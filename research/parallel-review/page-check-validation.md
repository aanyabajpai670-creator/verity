# Validation of `page-check.md` (read-only)

**Validated:** 2026-11-26
**Method:** every factual claim re-derived independently from the working tree — `node` eval of both condition datasets, `git show HEAD` comparison, `py_compile`, `node --check`, live `dev-preview.mjs` + `curl` probes, and in-memory execution of `scripts/adhd_pilot.py` `describe()` (no `publish`, no writes).
**Verdict:** the review is broadly sound and its headline structural finding (two divergent condition datasets) is **correct and important**. But its **central causal explanation for the null score is wrong**, one finding is a **false positive**, and several line/date citations are off. Do not act on §5/§7.6 as written.

---

## 1. Claims confirmed correct

| Claim | Evidence |
| --- | --- |
| `index.html:6388` placeholder `/<unique-path>/script.js` | line 6388 exactly; `curl` → **404** |
| Two divergent condition datasets (inline vs module) | eval'd both: **metrics identical for all 10; findings + sources differ for all 10** |
| PCOS differs in `name` and `lastReviewed` | module `PCOS` / `March 2025`; inline `PCOS (PMOS)` / `August 2026` |
| Divergence already at HEAD | `git show HEAD` reproduces identical divergence pattern |
| `REDESIGN-NOTES.md:26` "byte for byte … identical" is false | line 26 confirmed; contradicted by the above |
| report ↔ asset agree on all shared keys | 30 shared keys, **0 differ** |
| report has `pipeline_version` only; asset has `examples` only | confirmed; cause is line 724 writing report before line 736 sets `examples` |
| `score: null`, all 4 `subscore`/`contribution` null, `evidenceRating`/`screenedCorpus` null in both | confirmed |
| Pilot page never renders the composite score | `grep` for score usage in `js/pilot.js` returns only the prose `scoreMeaning` |
| `proportion_score = min(2*median, 100)` | line 357 |
| `quality_rating` 322–346, `describe` 349–406, `normalize` 219–264 | confirmed |
| `female_percent > 0` gate at line 256 | confirmed |
| 20 eligibility-unresolved records | confirmed (listed) |
| `py_compile` all `scripts/` + `build_table.py` | OK |
| `js/` modules parse | OK — but **17** files, not 18 |
| preview probes 200; `/api/chatbot` GET → 405 | confirmed (except Vercel paths, §5) |
| home-page stats hardcoded | confirmed (see §4 location error) |

---

## 2. Material error — the score gate is misdiagnosed

The review states in three places that the score is withheld *until the two CLI flags are supplied*:

> §2 "Scoring is intentionally withheld until `--screened-corpus-size` and `--consistent-findings` are supplied"
> §5 "before any numeric score is published, supply documented `--screened-corpus-size` and `--consistent-findings`"
> §7.6 "otherwise report/asset correctly remain `score: null`"

**This is wrong.** I ran the real `describe()` in memory with the flags supplied:

```
no flags (current published state)                 score=None  components=[None, None, None, None]
WITH flags: corpus=9485, consistent=True           score=None  components=[None, None, None, None]
WITH flags: corpus=384,  consistent=True           score=None  components=[None, None, None, None]
```

The binding constraint is **field coverage**, not the flags. In `describe()`:

```python
enrollment_score = 100*sum(inclusion)/n if n and len(inclusion)==n and screen_complete else None
split_score      = 100*sum(v>=2 for v in split)/n if n and len(split)==n and screen_complete else None
```

and `score` is `sum(contributions)` only `if all(... is not None)` (line 403). Current coverage on 384 included records:

| Field | Known | Required |
| --- | --- | --- |
| `female_inclusion` | 143 | 384 |
| `sex_reporting` | 249 | 384 |
| `female_proportion_percent` | 78 | (only needs >0) |

So `len(inclusion)==n` and `len(split)==n` are both **False** → two components are `None` → score `None` **regardless of both flags**. Supplying the flags today would change nothing.

**Correct framing:** the score is blocked on completing `female_inclusion` (241 unresolved) and `sex_reporting` (135 unresolved) coding. The two flags are a *later*, additional requirement that only becomes reachable after coverage is complete. This is the single most consequential correction in this document — acting on §7.6 would waste the owning session's effort.

---

## 3. False positive — `quality_rating` does not "mix scales"

The review asserts:

> §3 "`quality_rating` … mixes scales — compares enrollment score < 20 and split score < 5 (scores out of 100) as if they were counts."

The call site is `quality_rating(included, eligible_corpus, enrollment_score, split_score, consistent)` — so the parameters named `inclusion`/`disaggregation` receive **percentages (0–100)**, and the guards are `inclusion < 20` / `disaggregation < 5`. Comparing a percentage to 20 (i.e. 20%) and to 5 (i.e. 5%) is dimensionally coherent — these are ordinary percentage floors, not count thresholds. There is no evidence in the code, comments, or README that counts were intended. **Recommend deleting this finding** or downgrading it to "thresholds are undocumented; confirm 20%/5% are intended."

### Real defect in the same function the review missed

```python
if len(trials) >= 1 and size >= 50 or sum(r['study_design'] not in ('RCT','Other') for r in split) >= 5:
    return 3
```

`and` binds tighter than `or`, so this parses as `(trials>=1 and size>=50) or (count>=5)`. The second clause alone promotes to tier 3 **regardless of trial count or median size**, defeating the `size`/`trials` conditions. This is a genuine latent bug and a better finding than the one it replaced.

---

## 4. Citation errors (all verified)

| Review says | Actual |
| --- | --- |
| `renderConditionPage` ~**4750**–5560 | **5189–5593** (4750 is `renderHomePage`, which starts 4704) |
| condition route ~**6236** | **6226** |
| inline ADHD block **2825–2908** | slug 2826, block ends **2909** |
| "**18** JS modules under `js/`" | **17** files (3 `js/`, 8 `js/components`, 1 `js/data`, 5 `js/pages`) |
| served copy "last modified **Nov 10**" | mtime **2026-11-25 10:37**; last commit **2026-11-14** |
| hardcoded home stats at `js/pages/home.js:68–72` | correct for the *module*, but the **served** page uses the inline copy at **`index.html:4780–4785`** — cite both |

Correct as written: `index.html:2833–2838` metrics, `2897` methodology, `2898–2907` sources, `2908` related, `6216` pilot route, `6360–6381` init, `lib/conditions.js:32–123`, `js/pilot.js:48–69` and `:78–143`, `js/app.js:16`, `js/adhd-pilot-page.js:1–38`.

---

## 5. Claim that needs qualification

- **`/_vercel/insights/script.js`** — review says "only resolves under Vercel". Accurate in effect, but locally it is a hard **404** (probed). Worth stating as a second local 404 alongside the `/<unique-path>/` placeholder so the two aren't conflated.
- **"which have drifted from the modular copy"** — implies the inline copy is the stale one. Neither file changed in the working tree: `git show HEAD` yields the *same* PMID split (`inline: 20410711…32946507`, `module: 20025684…32034875`). They were **born divergent**, not drifted. Direction-neutral wording is safer.

---

## 6. Findings the review missed (worth adding)

1. **Neither findings set is traceable to the audited corpus.** All 14 PMIDs cited across the two ADHD findings blocks — `20410711, 20385342, 25317366, 34231220, 30832197, 32946507` (inline) and `20025684, 20136130, 25386846, 34618367, 30927357, 32034875` (module) — are **absent from the 500-record `research/adhd/study-records.json` sample**. So the displayed "Female-Specific Findings" cannot be reconciled against the pilot evidence base at all. This is more serious than the metrics-drift framing and should be escalated to the owning session.
2. **Two different medians exist; the page shows the unweighted one.** `report.json` carries `proportionMedian = 35.88` (displayed as "35.9%") *and* `projection.weightedObservedMedian = 37.5`, which is never surfaced. The label "Median female participation" does not state which basis is shown, and the stratified weight (37.5) is arguably the methodologically correct one for a stratified sample. Flag as a provenance/labelling question.
3. **Unguarded `examples` access.** `js/pilot.js:128` does `if (data.examples.length)` with no optional chaining, while `report.json` legitimately lacks `examples`. Safe today only because the browser loads the asset; the `if (!data?.projection)` guard two lines earlier shows the inconsistency. Low severity, trivially hardened to `data.examples?.length`.
4. **`screenedCorpus` guard is one-sided.** `publish` raises only if `screened_corpus_size < eligible_proposals`; there is no upper bound or provenance check, so an arbitrarily large documented number is accepted.

---

## 7. Net assessment

- **Keep as-is:** §1 file map, §4 broken asset, §6 duplicate-dataset finding, §8 check results.
- **Correct before acting:** §2/§5/§7.6 score-gate explanation (§2 above) — this is the actionable blocker.
- **Delete or downgrade:** the `quality_rating` "scale mixing" claim (§3 above); replace with the operator-precedence defect.
- **Fix citations:** §1.1 renderer range, §1.1 condition route, §6 file dates, module count, home.js location.
- **Add:** the untraceable-findings PMIDs, the dual-median provenance issue, the unguarded `examples` access.

No application source, data file, score methodology, or the reviewer's `page-check.md` was modified by this validation. Only this file was added.
