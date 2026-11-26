# Enrollment & design review — validation record

Validated 2026-11-26 against `research/parallel-review/enrollment-design.json`.
Every quote below was re-checked against the live PMC article on the validation date,
because none of the four full texts is cached locally (`research/fulltext/PMC*.error.json`
are HTTP 500 stubs). Quotes that live in a PubMed abstract were checked against the
stored `title + abstract` source that `scripts/adhd_pilot.py` hashes.

## Flagged enrollment discrepancies

| PMID | Field | Current | Reviewed | Verdict | Basis |
|---|---|---|---|---|---|
| 23581554 | n_total | 719 | 713 | **accepted** | PMC3830729: "Six MTA girls participated in the BGALS ... they were omitted from the MTA analyses, yielding a total N of 573." 573 + 140 = 713. 719 double counts the 6 girls. |
| 25366258 | n_total | 48 | 50 | **accepted** | PMC9979240: "A total of 50 children and adolescents enrolled at Boston Children's Hospital (n=29), the 2011 meeting of The Noonan Syndrome Support Group (n=6), the 2013 meeting of the Noonan Syndrome Foundation (n=5), or by arrangement ... (n=10)." 29+6+5+10 = 50 enrolled; 48 is the analysed sample after two exclusions. |
| 25433424 | n_total | 60 | 153 | **accepted** | PMC4272653: "121 youth (9.89–17.71 years) were selected from the LAMS1 cohort of 707 youth ... CWRU (n=32); CCH (n=46); UPMC (n=43)" plus "For comparison, 32 age and sex ratio-matched HC were newly recruited". 121 + 32 = 153 recruited; 60 is the post-exclusion analysed sample. |
| 30064718 | n_total_lower_bound | 490 | 631 | **accepted as a floor, not a total** | Article evidence: "The FAS comprised 490 participants receiving GXR and 141 receiving placebo." 490 + 141 = 631. This is a full analysis set defined after randomisation, so it stays a documented floor and is **not** promoted to `n_total`. |

All four quotes were confirmed present in the live source text on 2026-11-26. The
`n_total` corrections are recorded with `scope: "linked article"` and the PMC URL, matching
the convention already used in `assistant-field-review.json`; no copyrighted full text is
stored in the repository.

## 29852825 — unit check (483,281)

**Rejected as participant enrollment.** The abstract states: "This cross-sectional analysis
of data from the 2012 Kids' Inpatient Database included 483,281 *hospitalizations* in general
and children's hospitals of persons under age 21 with a primary or secondary behavioral
diagnosis."

- The unit is hospitalizations/encounters, not unique children. Readmissions cannot be
  separated in the KID, so the number of unique participants is strictly smaller and
  unbounded below.
- It is therefore not a participant count and not a valid lower bound on participants
  (it is an *upper* bound on unique children). Storing it in `n_total` or
  `n_total_lower_bound` would misstate enrollment and would corrupt sample-size scoring.
- The record's eligibility is also unresolved, so it is outside every included-record
  denominator regardless.
- Decision: `n_total` stays null, no floor is recorded, and the record stays
  eligibility-unresolved. The review entry is reclassified `preserved-unknown`.

The proposed-value rationale cited `34826393` (n_total = 414,637) as precedent for
administrative record counts. That precedent is not applied here: the unit is explicitly
named as hospitalizations in the source sentence, and the audit rule is to count unique
index participants.

## Design disagreements

Documented taxonomy (`enrollment-design.json` → `rules_applied.study_design`): one of
RCT, Cohort-Prospective, Cohort-Retrospective, Cross-sectional, Case-control, Other,
"supported by a quote about this study's own methods"; a PubMed `Randomized Controlled Trial`
publication type can supply RCT, but a model/PubMed disagreement leaves the field unresolved.

| PMID | Proposed | Verdict | Basis |
|---|---|---|---|
| 12501563 | Other | **accepted** | Abstract methods sentence: two-rater (self vs informant) single-timepoint concordance study. Consistent with the existing coding of the structurally similar two-source agreement study 14593669 (Other). |
| 23581554 | Other | **accepted, with an explicit pubtype override** | Abstract: the two samples "were analyzed separately". The analysed publication is a secondary analysis of the MTA trial plus the naturalistic BGALS cohort, not a trial. The full text settles what the abstract could not, so the RCT publication type is a metadata artefact and Other is the design of record. |
| 25366258 | Cross-sectional | **accepted** | Abstract methods: single administration of tests to a syndrome group and unaffected siblings, no follow-up. |
| 25433424 | Cross-sectional | **accepted** | Abstract methods: one resting-state scan per participant, connectivity related concurrently to symptoms. The parent cohort's longitudinal name does not make this analysis longitudinal. |
| 26299295 | Other | **accepted** | Abstract methods: pooled cross-cohort SNP-heritability (GCTA/GREML) estimation. Consistent with 15520832 (TDT family study) and 27371487, both coded Other. |
| 28574288 | Cross-sectional | **accepted, quote replaced** | The submitted quote was a result sentence ("eveningness scores ... were significantly higher"). Replaced with the abstract methods sentence describing the single assessment of children with ADHD and healthy controls. |
| 27851842 | Cross-sectional | **accepted** | PMC7418037 (Discussion): "while the study's cross-sectional design limits inferences about developmental trends". The authors name their own design; the abstract-only quote previously failed to match. |
| 19048655 | Cross-sectional | **not applied** | Eligibility is unresolved, so the field cannot enter any included-record computation. Kept as a documented proposal. |
| 15164862 | Other | **kept unresolved** | PubMed publication type is `Randomized Controlled Trial`. The abstract is an analogue vignette experiment and cannot establish whether teachers were randomised to tape conditions. `build_rows` removes a non-RCT design when the pubtype is RCT, and the abstract cannot settle the conflict. Left null. |

## Effect on scoring

The three accepted `n_total` corrections and the raised floor change enrollment coverage,
not the component definitions or weights. 29852825 contributes nothing to any denominator.
No design value is inferred for an unresolved-eligibility record.
