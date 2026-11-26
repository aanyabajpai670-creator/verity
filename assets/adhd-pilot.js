window.verityAdhdPilot = {
  "sample": 500,
  "legacyComplete": 229,
  "legacyPartial": 1,
  "legacyAllFormatPassing": 134,
  "legacyIncluded": 111,
  "legacyFemalePositive": 9,
  "legacyProportionN": 5,
  "legacyProportionMedian": 36.8421052631579,
  "legacyDisaggregated": 9,
  "abstractsSaved": 498,
  "articlesSaved": 55,
  "humanReferenceN": 25,
  "included": 384,
  "excluded": 96,
  "eligibilityUnresolved": 20,
  "inclusionKnown": 146,
  "inclusionYes": 134,
  "proportionN": 86,
  "proportionMedian": 32.30278225806451,
  "disaggregationKnown": 255,
  "disaggregationYes": 102,
  "evidenceRating": null,
  "screenedCorpus": null,
  "components": [
    {
      "name": "Female inclusion",
      "weight": 25,
      "subscore": null,
      "contribution": null
    },
    {
      "name": "Median female participant proportion",
      "weight": 25,
      "subscore": null,
      "contribution": null
    },
    {
      "name": "Sex-disaggregated analysis",
      "weight": 35,
      "subscore": null,
      "contribution": null
    },
    {
      "name": "Evidence-base strength",
      "weight": 15,
      "subscore": null,
      "contribution": null
    }
  ],
  "score": null,
  "provisional": {
    "label": "Provisional evidence score",
    "score": 53.09659660848431,
    "availableWeight": 85,
    "totalWeight": 100,
    "coveragePercent": 85,
    "complete": false,
    "components": [
      {
        "name": "Female inclusion",
        "weight": 25,
        "numerator": 134,
        "denominator": 146,
        "rate": 91.78082191780823,
        "median": null,
        "subscore": 91.78082191780823,
        "contribution": 22.945205479452056,
        "available": true,
        "reason": null
      },
      {
        "name": "Median female participant proportion",
        "weight": 25,
        "numerator": null,
        "denominator": 86,
        "rate": null,
        "median": 32.30278225806451,
        "subscore": 64.60556451612902,
        "contribution": 16.151391129032255,
        "available": true,
        "reason": null
      },
      {
        "name": "Sex-disaggregated analysis",
        "weight": 35,
        "numerator": 102,
        "denominator": 255,
        "rate": 40.0,
        "median": null,
        "subscore": 40.0,
        "contribution": 14.0,
        "available": true,
        "reason": null
      },
      {
        "name": "Evidence-base strength",
        "weight": 15,
        "numerator": null,
        "denominator": null,
        "rate": null,
        "median": null,
        "subscore": null,
        "contribution": null,
        "available": false,
        "reason": "Requires a documented eligible corpus size and a documented consistency synthesis; neither is established, so the rubric cannot be scored."
      }
    ],
    "gaps": [
      "Requires a documented eligible corpus size and a documented consistency synthesis; neither is established, so the rubric cannot be scored."
    ],
    "caveat": "Calculated only from records with supported decisions. Records with unknown values are excluded from each denominator and are never counted as zero or as \"not reported\". Unavailable components keep their weight and are reported as gaps, so the provisional value covers 85 of 100 weight points and is not comparable to a complete score. Incomplete reporting and limited full-text access may bias these rates."
  },
  "projection": {
    "databaseRecords": 12351,
    "sampleRecords": 500,
    "sampleCounts": {
      "include": 384,
      "exclude": 96,
      "unresolved": 20,
      "womenIncluded": 134,
      "sexDisaggregated": 102,
      "femaleOnly": 5
    },
    "projectedCounts": {
      "include": 9485,
      "exclude": 2372,
      "unresolved": 494,
      "womenIncluded": 3311,
      "sexDisaggregated": 2521,
      "femaleOnly": 124
    },
    "weightedObservedMedian": 32.3475,
    "method": "Each sampled record is weighted by PubMed candidate count divided by sampled count within its five-year stratum. Projected categories use observed decisions or evidence only.",
    "strata": [
      {
        "start": 2000,
        "databaseRecords": 1113,
        "sampleRecords": 45,
        "weight": 24.733333333333334,
        "sampleCounts": {
          "include": 24,
          "unresolved": 6,
          "exclude": 15,
          "sexDisaggregated": 8,
          "womenIncluded": 7
        }
      },
      {
        "start": 2005,
        "databaseRecords": 2133,
        "sampleRecords": 86,
        "weight": 24.802325581395348,
        "sampleCounts": {
          "exclude": 25,
          "include": 56,
          "sexDisaggregated": 15,
          "womenIncluded": 18,
          "unresolved": 5,
          "femaleOnly": 1
        }
      },
      {
        "start": 2010,
        "databaseRecords": 2976,
        "sampleRecords": 121,
        "weight": 24.59504132231405,
        "sampleCounts": {
          "include": 92,
          "womenIncluded": 30,
          "unresolved": 3,
          "exclude": 26,
          "femaleOnly": 1,
          "sexDisaggregated": 15
        }
      },
      {
        "start": 2015,
        "databaseRecords": 3232,
        "sampleRecords": 131,
        "weight": 24.671755725190838,
        "sampleCounts": {
          "include": 110,
          "sexDisaggregated": 30,
          "womenIncluded": 33,
          "exclude": 16,
          "femaleOnly": 2,
          "unresolved": 5
        }
      },
      {
        "start": 2020,
        "databaseRecords": 2897,
        "sampleRecords": 117,
        "weight": 24.76068376068376,
        "sampleCounts": {
          "include": 102,
          "womenIncluded": 46,
          "sexDisaggregated": 34,
          "exclude": 14,
          "unresolved": 1,
          "femaleOnly": 1
        }
      }
    ]
  },
  "assistantSourceReviews": 199,
  "assistantFieldReviews": 360,
  "referenceComparison": {
    "eligibility": {
      "compared": 22,
      "matches_after_checks": 17
    },
    "sex_reporting": {
      "compared": 3,
      "matches_after_checks": 2
    },
    "n_female": {
      "compared": 16,
      "matches_after_checks": 16,
      "flagged_or_missing": 1
    },
    "n_total": {
      "compared": 16,
      "matches_after_checks": 14
    }
  },
  "review": {
    "queued": 362,
    "eligibilityUnresolved": 20,
    "includedQueued": 315,
    "excludedQueued": 27,
    "sampleSizeUnresolvedNonExcluded": 24,
    "withQuoteIssues": 5,
    "withWhitespaceRecoveredEvidence": 78
  },
  "examples": [
    {
      "pmid": "21854282",
      "title": "An exploration of site effects in a multisite trial of OROS-methylphenidate for smokers with attention deficit/hyperactivity disorder.",
      "field": "eligibility",
      "answer": "include",
      "quote": "A total of 255 adult smokers diagnosed with ADHD were enrolled in three clinic types: 72 in ADHD, 79 in tobacco dependence, and 104 in the mental health clinics.",
      "source": "original-pass abstract"
    },
    {
      "pmid": "14515941",
      "title": "Attention-deficit-hyperactivity disorder with and without oppositional defiant disorder in 3- to 7-year-old children.",
      "field": "n_female",
      "answer": 30,
      "quote": "131 children (101 males, 30 females) with ADHD (mean age 5 years, SD 1 year 5 months; range 3 to 7 years) were clinically examined",
      "source": "original-pass abstract"
    },
    {
      "pmid": "15769563",
      "title": "Childhood hyperactivity-inattention symptoms and smoking in adolescence.",
      "field": "sex_reporting",
      "answer": 2,
      "quote": "In females, hyperactivity-inattention symptoms contributed independently to subsequent daily smoking (OR=1.98, p=0.04). In males, hyperactivity-inattention symptoms alone did not increase the risk for smoking.",
      "source": "original-pass abstract"
    }
  ],
  "pipeline_version": "62eeae4ebf7c"
};
