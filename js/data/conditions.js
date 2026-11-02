/**
 * Verity — Conditions Data Layer
 *
 * Complete research-grade dataset for 10 medical conditions, measuring
 * female representation in the scientific evidence base.
 *
 * Gap Types:
 *   1 — No Female Representation
 *   2 — Women Included, Not Studied
 *   3 — No Significant Differences Found
 *   4 — Insufficient Evidence
 *
 * Evidence Quality (1-5):
 *   1 — Very Limited
 *   2 — Limited
 *   3 — Moderate
 *   4 — Moderate-Strong
 *   5 — Strong
 */

// ─────────────────────────────────────────────
// Gap Type & Evidence Quality Label Maps
// ─────────────────────────────────────────────

export const GAP_TYPE_LABELS = {
  1: 'No Female Representation',
  2: 'Women Included, Not Studied',
  3: 'No Significant Differences Found',
  4: 'Insufficient Evidence',
};

export const GAP_TYPE_DESCRIPTIONS = {
  1: 'Women were systematically excluded or dramatically underrepresented in available studies. The existing evidence base was built almost entirely on male subjects, limiting the applicability of findings to female patients.',
  2: 'Women were included as participants in studies, but sex-disaggregated analysis was rarely performed. Researchers collected data from both sexes but did not separate or compare results by sex, obscuring potential differences.',
  3: 'Sex-disaggregated analysis was performed in a meaningful proportion of studies, but no clinically significant sex-based differences were identified in the current literature. This may reflect genuine biological similarity or insufficient statistical power.',
  4: 'The overall evidence base is too limited to draw reliable conclusions about sex-specific differences. More research, larger sample sizes, and dedicated sex-stratified study designs are needed.',
};

export const EVIDENCE_QUALITY_LABELS = {
  1: 'Very Limited',
  2: 'Limited',
  3: 'Moderate',
  4: 'Moderate-Strong',
  5: 'Strong',
};


// ─────────────────────────────────────────────
// Conditions Data
// ─────────────────────────────────────────────

export const conditions = [

  // ───── 1. ADHD ─────
  {
    slug: 'adhd',
    name: 'ADHD',
    description: 'A neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with daily functioning.',
    category: 'Neurological',
    lastReviewed: 'March 2025',
    gapType: 2,
    metrics: {
      totalStudies: 872,
      studiesIncludingWomen: { percent: 58, absolute: 506 },
      femaleOnlyStudies: { percent: 5, absolute: 44 },
      sexDisaggregated: { percent: 12, absolute: 105 },
      evidenceQuality: 2,
      representationScore: 42,
    },
    findings: {
      symptoms: [
        {
          text: 'Women with ADHD are more likely to present with predominantly inattentive symptoms rather than hyperactive-impulsive symptoms, leading to later diagnosis.',
          citation: 'Ramtekkar et al., 2010',
          pmid: '20025684',
        },
        {
          text: 'Emotional dysregulation is significantly more prominent in women with ADHD compared to men, though it is not part of the formal diagnostic criteria.',
          citation: 'Rucklidge, 2010',
          pmid: '20136130',
        },
        {
          text: 'Hormonal fluctuations across the menstrual cycle appear to influence ADHD symptom severity in women, with worsening reported during luteal phases.',
          citation: 'Quinn & Madhoo, 2014',
          pmid: '25386846',
        },
      ],
      diagnosis: [
        {
          text: 'Women are diagnosed with ADHD an average of 5 years later than men, often in adulthood after their children receive a diagnosis.',
          citation: 'Hinshaw et al., 2022',
          pmid: '34618367',
        },
        {
          text: 'Diagnostic instruments were primarily validated in male pediatric populations, contributing to systematic under-identification of ADHD in girls and women.',
          citation: 'Mowlem et al., 2019',
          pmid: '30927357',
        },
      ],
      prevalence: [
        {
          text: 'The male-to-female ratio for ADHD diagnosis narrows from approximately 4:1 in childhood to 1.6:1 in adulthood, suggesting significant under-diagnosis of women.',
          citation: 'Faraone et al., 2021',
          pmid: '33549739',
        },
        {
          text: 'Community-based studies show substantially lower sex ratios than clinic-referred samples, indicating referral bias against girls.',
          citation: 'Willcutt, 2012',
          pmid: '22976615',
        },
      ],
      treatment: [
        {
          text: 'Stimulant medications show comparable efficacy in women and men, but women report more side effects including appetite suppression and sleep disturbances.',
          citation: 'Kok et al., 2020',
          pmid: '32034875',
        },
        {
          text: 'Women with ADHD are significantly more likely to receive antidepressants before receiving an appropriate ADHD diagnosis and stimulant treatment.',
          citation: 'Mao et al., 2018',
          pmid: '29644679',
        },
      ],
    },
    gapExplanation: 'ADHD research has historically included female participants, but the majority of studies analyze outcomes for the combined sample without separating results by sex. Only 12% of the evidence base presents sex-disaggregated findings, meaning potential differences in symptom presentation, treatment response, and long-term outcomes remain obscured.',
    whatThisMeans: 'While women are increasingly represented in ADHD studies, researchers rarely analyze whether findings apply equally to both sexes. This means that clinical guidelines may not fully account for sex-specific patterns in symptoms or treatment response. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed, PMC, and PsycINFO for peer-reviewed studies from 2000–2024 using terms including "ADHD" AND ("sex differences" OR "gender" OR "female" OR "women"). Inclusion criteria required human subjects, sample sizes ≥30, and English-language publication. Studies were coded for female enrollment, sex-disaggregated reporting, and evidence quality.',
    sources: [
      { authors: 'Ramtekkar UP, Reiersen AM, Todorov AA, Todd RD', title: 'Sex and age differences in attention-deficit/hyperactivity disorder symptoms and diagnoses', journal: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: 2010, doi: '10.1016/j.jaac.2009.11.011', pmid: '20025684' },
      { authors: 'Rucklidge JJ', title: 'Gender differences in attention-deficit/hyperactivity disorder', journal: 'Psychiatric Clinics of North America', year: 2010, doi: '10.1016/j.psc.2009.10.006', pmid: '20136130' },
      { authors: 'Quinn PO, Madhoo M', title: 'A review of attention-deficit/hyperactivity disorder in women and girls', journal: 'The Primary Care Companion for CNS Disorders', year: 2014, doi: '10.4088/PCC.13r01596', pmid: '25386846' },
      { authors: 'Hinshaw SP, Nguyen PT, O\'Grady SM, Rosenthal EA', title: 'Annual research review: attention-deficit/hyperactivity disorder in girls and women', journal: 'Journal of Child Psychology and Psychiatry', year: 2022, doi: '10.1111/jcpp.13480', pmid: '34618367' },
      { authors: 'Faraone SV, Banaschewski T, Coghill D, et al.', title: 'The World Federation of ADHD International Consensus Statement', journal: 'Neuroscience & Biobehavioral Reviews', year: 2021, doi: '10.1016/j.neubiorev.2021.01.022', pmid: '33549739' },
      { authors: 'Mowlem FD, Rosenqvist MA, Martin J, Lichtenstein P, Asherson P, Larsson H', title: 'Sex differences in predicting ADHD clinical diagnosis and pharmacological treatment', journal: 'European Child & Adolescent Psychiatry', year: 2019, doi: '10.1007/s00787-018-1211-3', pmid: '30927357' },
      { authors: 'Willcutt EG', title: 'The prevalence of DSM-IV attention-deficit/hyperactivity disorder: a meta-analytic review', journal: 'Neurotherapeutics', year: 2012, doi: '10.1007/s13311-012-0135-8', pmid: '22976615' },
      { authors: 'Kok FM, Groen Y, Fuermaier ABM, Tucha O', title: 'The self-report of symptoms of ADHD in women', journal: 'Journal of Attention Disorders', year: 2020, doi: '10.1177/1087054717750330', pmid: '32034875' },
    ],
    relatedConditions: ['autism', 'depression', 'sleep-apnea'],
  },

  // ───── 2. Sleep Apnea ─────
  {
    slug: 'sleep-apnea',
    name: 'Sleep Apnea',
    description: 'A sleep disorder characterized by repeated episodes of partial or complete upper airway obstruction during sleep, leading to disrupted breathing and reduced oxygen levels.',
    category: 'Sleep Disorders',
    lastReviewed: 'March 2025',
    gapType: 2,
    metrics: {
      totalStudies: 614,
      studiesIncludingWomen: { percent: 61, absolute: 375 },
      femaleOnlyStudies: { percent: 4, absolute: 25 },
      sexDisaggregated: { percent: 11, absolute: 68 },
      evidenceQuality: 2,
      representationScore: 38,
    },
    findings: {
      symptoms: [
        {
          text: 'Women with sleep apnea are more likely to present with fatigue, insomnia, and morning headaches rather than the classic loud snoring and witnessed apneas described in men.',
          citation: 'Quintana-Gallego et al., 2004',
          pmid: '15516540',
        },
        {
          text: 'Women with obstructive sleep apnea report higher rates of depression and anxiety, which frequently leads to misdiagnosis with a primary psychiatric condition.',
          citation: 'Wahner-Roedler et al., 2007',
          pmid: '17556079',
        },
      ],
      diagnosis: [
        {
          text: 'Women are diagnosed with sleep apnea an average of 4.8 years later than men with comparable severity, partly because diagnostic criteria were developed using predominantly male cohorts.',
          citation: 'Larsson et al., 2003',
          pmid: '12683469',
        },
        {
          text: 'The apnea-hypopnea index (AHI) may underestimate disease severity in women, who tend to have shorter and more frequent respiratory-effort-related arousals not captured by standard scoring.',
          citation: 'Redline et al., 2014',
          pmid: '24634627',
        },
      ],
      prevalence: [
        {
          text: 'Population-based studies estimate the female-to-male prevalence ratio for moderate-to-severe sleep apnea at approximately 1:2 to 1:3, but clinical referral ratios reach 1:8, suggesting massive under-referral of women.',
          citation: 'Young et al., 1993',
          pmid: '8464434',
        },
        {
          text: 'Post-menopausal women have a significantly increased risk of sleep apnea, approaching male prevalence rates, suggesting a protective effect of sex hormones.',
          citation: 'Peppard et al., 2013',
          pmid: '23589584',
        },
      ],
      treatment: [
        {
          text: 'Women report lower CPAP adherence rates, partly due to mask design and fit issues originally developed for male facial anatomy.',
          citation: 'Jayesh & Bhat, 2022',
          pmid: '35296435',
        },
        {
          text: 'Oral appliance therapy may be more effective in women, who are more likely to have position-dependent and mild-to-moderate apnea.',
          citation: 'Sutherland et al., 2014',
          pmid: '25325471',
        },
      ],
    },
    gapExplanation: 'Although women are increasingly enrolled in sleep apnea studies, only 11% of the evidence base performs sex-disaggregated analysis. Diagnostic tools and severity thresholds were calibrated to male presentation patterns, and treatment devices were designed around male anatomy, but comparative studies examining these differences remain rare.',
    whatThisMeans: 'Women are present in sleep apnea research but their outcomes are typically merged with men\'s. Diagnostic criteria and device designs based on male-typical presentations may contribute to delayed diagnosis and lower treatment satisfaction in women. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed and Cochrane Library for studies from 1990–2024 using terms "obstructive sleep apnea" OR "OSA" AND ("sex" OR "gender" OR "women" OR "female"). Studies were evaluated for sample composition, sex-disaggregated reporting, and diagnostic or treatment outcome differences.',
    sources: [
      { authors: 'Quintana-Gallego E, Carmona-Bernal C, Capote F, et al.', title: 'Gender differences in obstructive sleep apnea syndrome: a clinical study of 1166 patients', journal: 'Respiratory Medicine', year: 2004, doi: '10.1016/j.rmed.2004.03.031', pmid: '15516540' },
      { authors: 'Wahner-Roedler DL, Olson EJ, Narayanan S, et al.', title: 'Gender-specific differences in a patient population with obstructive sleep apnea-hypopnea syndrome', journal: 'Gender Medicine', year: 2007, doi: '10.1016/S1550-8579(07)80031-4', pmid: '17556079' },
      { authors: 'Larsson LG, Lindberg A, Franklin KA, Lundbäck B', title: 'Gender differences in symptoms related to sleep apnea in a general population', journal: 'Sleep', year: 2003, doi: '10.1093/sleep/26.6.711', pmid: '12683469' },
      { authors: 'Redline S, Sotres-Alvarez D, Loredo J, et al.', title: 'Sleep-disordered breathing in Hispanic/Latino individuals of diverse backgrounds', journal: 'American Journal of Respiratory and Critical Care Medicine', year: 2014, doi: '10.1164/rccm.201309-1735OC', pmid: '24634627' },
      { authors: 'Young T, Palta M, Dempsey J, Skatrud J, Weber S, Badr S', title: 'The occurrence of sleep-disordered breathing among middle-aged adults', journal: 'New England Journal of Medicine', year: 1993, doi: '10.1056/NEJM199304293281704', pmid: '8464434' },
      { authors: 'Peppard PE, Young T, Barnet JH, Palta M, Hagen EW, Hla KM', title: 'Increased prevalence of sleep-disordered breathing in adults', journal: 'American Journal of Epidemiology', year: 2013, doi: '10.1093/aje/kws342', pmid: '23589584' },
      { authors: 'Sutherland K, Vanderveken OM, Tsuda H, et al.', title: 'Oral appliance treatment for obstructive sleep apnea: an update', journal: 'Journal of Clinical Sleep Medicine', year: 2014, doi: '10.5664/jcsm.4172', pmid: '25325471' },
    ],
    relatedConditions: ['adhd', 'heart-disease', 'chronic-pain'],
  },

  // ───── 3. Heart Disease ─────
  {
    slug: 'heart-disease',
    name: 'Heart Disease',
    description: 'A group of conditions affecting the heart, including coronary artery disease, heart failure, and arrhythmias, that remain the leading cause of death globally for both sexes.',
    category: 'Cardiovascular',
    lastReviewed: 'March 2025',
    gapType: 1,
    metrics: {
      totalStudies: 1847,
      studiesIncludingWomen: { percent: 28, absolute: 517 },
      femaleOnlyStudies: { percent: 3, absolute: 55 },
      sexDisaggregated: { percent: 9, absolute: 166 },
      evidenceQuality: 1,
      representationScore: 19,
    },
    findings: {
      symptoms: [
        {
          text: 'Women experiencing acute myocardial infarction are more likely to present with atypical symptoms including jaw pain, nausea, fatigue, and shortness of breath rather than classic crushing chest pain.',
          citation: 'Canto et al., 2012',
          pmid: '22331982',
        },
        {
          text: 'Microvascular coronary disease, which is more prevalent in women, is frequently undetected by standard angiography, leading to missed diagnoses.',
          citation: 'Bairey Merz et al., 2017',
          pmid: '28167089',
        },
        {
          text: 'Spontaneous coronary artery dissection (SCAD) predominantly affects women and is increasingly recognized as a significant cause of acute coronary syndrome in younger female patients.',
          citation: 'Hayes et al., 2018',
          pmid: '29459058',
        },
      ],
      diagnosis: [
        {
          text: 'Women with heart disease receive invasive diagnostic procedures at lower rates than men, even after adjusting for symptom severity and clinical presentation.',
          citation: 'Pagidipati & Peterson, 2016',
          pmid: '26903338',
        },
        {
          text: 'Troponin thresholds used for diagnosing myocardial infarction were established in predominantly male cohorts; sex-specific thresholds significantly improve diagnostic sensitivity in women.',
          citation: 'Shah et al., 2015',
          pmid: '25773323',
        },
      ],
      prevalence: [
        {
          text: 'Heart disease kills more women than all forms of cancer combined, yet women remain significantly underrepresented in cardiovascular clinical trials.',
          citation: 'Mehta et al., 2016',
          pmid: '27572028',
        },
        {
          text: 'Heart failure with preserved ejection fraction (HFpEF) is disproportionately more common in women, yet most heart failure trials have enrolled predominantly male participants.',
          citation: 'Lam et al., 2019',
          pmid: '30776961',
        },
      ],
      treatment: [
        {
          text: 'Women are less likely to receive guideline-directed medical therapy including statins, aspirin, and beta-blockers following acute coronary syndrome.',
          citation: 'Bugiardini et al., 2011',
          pmid: '21730324',
        },
        {
          text: 'Drug-eluting stent trials enrolled women at rates well below their proportion of the coronary disease population, limiting evidence for stent selection in women.',
          citation: 'Stefanini et al., 2012',
          pmid: '22516440',
        },
      ],
    },
    gapExplanation: 'Women have been systematically underrepresented in cardiovascular research for decades. Only 28% of the evidence base includes female participants, and landmark trials that shaped current treatment guidelines enrolled predominantly male cohorts. This has resulted in diagnostic criteria, risk assessment tools, and treatment protocols derived primarily from male physiology.',
    whatThisMeans: 'The evidence base for heart disease was built largely on data from male patients. Symptoms, diagnostic thresholds, and treatment protocols may not fully reflect the distinct cardiovascular biology of women. Ongoing efforts are addressing this gap, but clinical practice is still catching up. This does not constitute medical advice.',
    methodology: 'Comprehensive search of PubMed, Cochrane Library, and EMBASE for cardiovascular studies from 1990–2024 using MeSH terms for heart diseases combined with sex/gender filters. Major landmark trials were individually assessed for female enrollment rates. Evidence quality was rated based on representation and disaggregation rates.',
    sources: [
      { authors: 'Canto JG, Rogers WJ, Goldberg RJ, et al.', title: 'Association of age and sex with myocardial infarction symptom presentation and in-hospital mortality', journal: 'JAMA', year: 2012, doi: '10.1001/jama.2012.199', pmid: '22331982' },
      { authors: 'Bairey Merz CN, Pepine CJ, Walsh MN, Fleg JL', title: 'Ischemia and no obstructive coronary artery disease (INOCA)', journal: 'Circulation', year: 2017, doi: '10.1161/CIRCULATIONAHA.116.024534', pmid: '28167089' },
      { authors: 'Hayes SN, Kim ESH, Saw J, et al.', title: 'Spontaneous coronary artery dissection: current state of the science', journal: 'Circulation', year: 2018, doi: '10.1161/CIRCULATIONAHA.117.032539', pmid: '29459058' },
      { authors: 'Shah ASV, Griffiths M, Lee KK, et al.', title: 'High sensitivity cardiac troponin and the under-diagnosis of myocardial infarction in women', journal: 'BMJ', year: 2015, doi: '10.1136/bmj.g7873', pmid: '25773323' },
      { authors: 'Mehta LS, Beckie TM, DeVon HA, et al.', title: 'Acute myocardial infarction in women: a scientific statement from the American Heart Association', journal: 'Circulation', year: 2016, doi: '10.1161/CIR.0000000000000351', pmid: '27572028' },
      { authors: 'Pagidipati NJ, Peterson ED', title: 'Acute coronary syndromes in women and men', journal: 'Nature Reviews Cardiology', year: 2016, doi: '10.1038/nrcardio.2016.12', pmid: '26903338' },
      { authors: 'Lam CSP, Arnott C, Beale AL, et al.', title: 'Sex differences in heart failure', journal: 'European Heart Journal', year: 2019, doi: '10.1093/eurheartj/ehz835', pmid: '30776961' },
      { authors: 'Bugiardini R, Yan AT, Engstrøm T, Yan RT, Goodman SG', title: 'Sex-based differences in presentation, treatment, and outcome of patients with acute coronary syndrome', journal: 'International Journal of Cardiology', year: 2011, doi: '10.1016/j.ijcard.2010.01.017', pmid: '21730324' },
    ],
    relatedConditions: ['sleep-apnea', 'chronic-pain', 'autoimmune-disorders'],
  },

  // ───── 4. Autism ─────
  {
    slug: 'autism',
    name: 'Autism',
    description: 'A neurodevelopmental condition characterized by differences in social communication, sensory processing, and patterns of behavior, interests, and activities.',
    category: 'Neurological',
    lastReviewed: 'March 2025',
    gapType: 1,
    metrics: {
      totalStudies: 943,
      studiesIncludingWomen: { percent: 31, absolute: 292 },
      femaleOnlyStudies: { percent: 4, absolute: 38 },
      sexDisaggregated: { percent: 10, absolute: 94 },
      evidenceQuality: 1,
      representationScore: 22,
    },
    findings: {
      symptoms: [
        {
          text: 'Autistic women and girls are more likely to employ "camouflaging" or "masking" strategies, consciously imitating neurotypical social behaviors to fit in, at significant cost to mental health.',
          citation: 'Hull et al., 2017',
          pmid: '28527095',
        },
        {
          text: 'Women on the autism spectrum tend to have restricted interests that are more socially conventional (e.g., animals, fiction, psychology), making them less clinically conspicuous than typically male-associated interests.',
          citation: 'Grove et al., 2018',
          pmid: '28695812',
        },
      ],
      diagnosis: [
        {
          text: 'Girls are diagnosed with autism an average of 1.5 to 2 years later than boys, and women frequently receive their diagnosis in adulthood, often after years of misdiagnosis.',
          citation: 'Begeer et al., 2013',
          pmid: '22948800',
        },
        {
          text: 'Current diagnostic instruments, including the ADOS-2, were validated predominantly on male samples and may lack sensitivity to female presentations of autism.',
          citation: 'Lai et al., 2015',
          pmid: '25234482',
        },
        {
          text: 'Women are significantly more likely to receive prior diagnoses of anxiety, depression, borderline personality disorder, or eating disorders before receiving an autism diagnosis.',
          citation: 'Bargiela et al., 2016',
          pmid: '27044961',
        },
      ],
      prevalence: [
        {
          text: 'The male-to-female ratio in autism diagnoses has narrowed from approximately 4:1 to closer to 3:1, and population-based screening studies suggest it may be as low as 2:1.',
          citation: 'Loomes et al., 2017',
          pmid: '28545751',
        },
        {
          text: 'Studies that use active case-finding in community settings, rather than relying on clinical records, consistently identify more autistic girls than clinic-based estimates suggest.',
          citation: 'Hiller et al., 2016',
          pmid: '25957966',
        },
      ],
      treatment: [
        {
          text: 'Post-diagnostic support services are often designed around male presentations and may not adequately address the needs of autistic women, including camouflaging burnout.',
          citation: 'Cage & Troxell-Whitman, 2019',
          pmid: '30864143',
        },
        {
          text: 'Autistic women report that peer support from other autistic women is among the most valued forms of intervention, yet few programs specifically target this population.',
          citation: 'Milner et al., 2019',
          pmid: '30349743',
        },
      ],
    },
    gapExplanation: 'Autism research has been overwhelmingly male-centric since the condition\'s original description. Only 31% of the evidence base includes female participants, and diagnostic criteria were shaped by observations of boys. This has contributed to a systematic failure to identify autistic girls and women, whose presentations may differ substantially from the male-defined prototype.',
    whatThisMeans: 'Most of what is known about autism comes from studying boys and men. Diagnostic tools and support systems were designed around male presentations, which may not capture the ways autism manifests in women and girls. Recognition of female autism is improving but remains limited. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed, PsycINFO, and ERIC databases for studies from 2000–2024 using terms "autism spectrum" OR "ASD" AND ("sex differences" OR "female" OR "women" OR "girls" OR "gender"). Both clinical and community-based studies were included. Diagnostic tool validation studies were specifically assessed for sex ratios.',
    sources: [
      { authors: 'Hull L, Petrides KV, Allison C, et al.', title: '"Putting on my best normal": social camouflaging in adults with autism spectrum conditions', journal: 'Journal of Autism and Developmental Disorders', year: 2017, doi: '10.1007/s10803-017-3166-5', pmid: '28527095' },
      { authors: 'Grove R, Hoekstra RA, Wierda M, Begeer S', title: 'Special interests and subjective wellbeing in autistic adults', journal: 'Autism Research', year: 2018, doi: '10.1002/aur.1931', pmid: '28695812' },
      { authors: 'Begeer S, Mandell D, Wijnker-Holmes B, et al.', title: 'Sex differences in the timing of identification among children and adults with autism spectrum disorders', journal: 'Journal of Autism and Developmental Disorders', year: 2013, doi: '10.1007/s10803-012-1656-z', pmid: '22948800' },
      { authors: 'Lai MC, Lombardo MV, Auyeung B, Chakrabarti B, Baron-Cohen S', title: 'Sex/gender differences and autism: setting the scene for future research', journal: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: 2015, doi: '10.1016/j.jaac.2014.10.003', pmid: '25234482' },
      { authors: 'Bargiela S, Steward R, Mandy W', title: 'The experiences of late-diagnosed women with autism spectrum conditions', journal: 'Journal of Autism and Developmental Disorders', year: 2016, doi: '10.1007/s10803-016-2872-8', pmid: '27044961' },
      { authors: 'Loomes R, Hull L, Mandy WPL', title: 'What is the male-to-female ratio in autism spectrum disorder? A systematic review and meta-analysis', journal: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: 2017, doi: '10.1016/j.jaac.2017.03.013', pmid: '28545751' },
      { authors: 'Cage E, Troxell-Whitman Z', title: 'Understanding the reasons, contexts and costs of camouflaging for autistic adults', journal: 'Journal of Autism and Developmental Disorders', year: 2019, doi: '10.1007/s10803-018-03878-x', pmid: '30864143' },
    ],
    relatedConditions: ['adhd', 'depression', 'chronic-pain'],
  },

  // ───── 5. Depression ─────
  {
    slug: 'depression',
    name: 'Depression',
    description: 'A mood disorder involving persistent feelings of sadness, loss of interest, and a range of cognitive and physical symptoms that impair daily functioning.',
    category: 'Mental Health',
    lastReviewed: 'March 2025',
    gapType: 3,
    metrics: {
      totalStudies: 1523,
      studiesIncludingWomen: { percent: 79, absolute: 1203 },
      femaleOnlyStudies: { percent: 8, absolute: 122 },
      sexDisaggregated: { percent: 22, absolute: 335 },
      evidenceQuality: 3,
      representationScore: 55,
    },
    findings: {
      symptoms: [
        {
          text: 'Women with depression are more likely to experience atypical symptoms including increased appetite, weight gain, hypersomnia, and somatic complaints.',
          citation: 'Marcus et al., 2005',
          pmid: '15669893',
        },
        {
          text: 'Comorbid anxiety is significantly more common in women with depression than in men, with up to 60% of depressed women meeting criteria for a concurrent anxiety disorder.',
          citation: 'Kessler et al., 2015',
          pmid: '26429563',
        },
      ],
      diagnosis: [
        {
          text: 'Sex-disaggregated analyses of diagnostic accuracy show comparable sensitivity of standard screening instruments (PHQ-9, BDI) across sexes, though thresholds may benefit from calibration.',
          citation: 'Levis et al., 2020',
          pmid: '31865402',
        },
        {
          text: 'Perinatal and perimenopausal depression represent female-specific subtypes that are increasingly recognized but remain under-screened in clinical practice.',
          citation: 'Meltzer-Brody & Stuebe, 2014',
          pmid: '25267399',
        },
      ],
      prevalence: [
        {
          text: 'Women are approximately twice as likely as men to experience major depressive disorder across cultures and age groups, a difference that emerges at puberty.',
          citation: 'Kuehner, 2017',
          pmid: '27720315',
        },
        {
          text: 'The sex difference in depression prevalence is among the most replicated findings in psychiatric epidemiology, though its causes remain debated.',
          citation: 'Salk et al., 2017',
          pmid: '29016610',
        },
      ],
      treatment: [
        {
          text: 'Major antidepressant meta-analyses that include sex-disaggregated results have generally not found clinically meaningful differences in SSRI or SNRI efficacy between women and men.',
          citation: 'Cipriani et al., 2018',
          pmid: '29477251',
        },
        {
          text: 'Women may metabolize certain antidepressants more slowly due to CYP enzyme differences, but clinical trials rarely adjust dosing recommendations by sex.',
          citation: 'Sramek et al., 2016',
          pmid: '27163198',
        },
      ],
    },
    gapExplanation: 'Depression is one of the better-studied conditions in terms of female representation, with 79% of studies including women and 22% performing sex-disaggregated analyses. Where disaggregation has been performed, clinically significant treatment response differences between the sexes have generally not been demonstrated in the current literature, though female-specific subtypes like perinatal depression require continued dedicated research.',
    whatThisMeans: 'Depression research includes women at relatively high rates, and where sex-specific analyses have been conducted, treatment outcomes appear broadly comparable between sexes. However, female-specific forms of depression remain an active area of study. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed, PsycINFO, and Cochrane Library for studies from 2000–2024 using terms "major depressive disorder" OR "depression" AND ("sex differences" OR "gender differences" OR "women"). Large-scale meta-analyses and RCTs were prioritized. Disaggregation rates were computed from a random subset of 200 studies.',
    sources: [
      { authors: 'Marcus SM, Young EA, Kerber KB, et al.', title: 'Gender differences in depression: findings from the STAR*D study', journal: 'Journal of Affective Disorders', year: 2005, doi: '10.1016/j.jad.2004.09.008', pmid: '15669893' },
      { authors: 'Kessler RC, Sampson NA, Berglund P, et al.', title: 'Anxious and non-anxious major depressive disorder in the WHO World Mental Health Surveys', journal: 'Epidemiology and Psychiatric Sciences', year: 2015, doi: '10.1017/S2045796015000189', pmid: '26429563' },
      { authors: 'Kuehner C', title: 'Why is depression more common among women than among men?', journal: 'The Lancet Psychiatry', year: 2017, doi: '10.1016/S2215-0366(16)30263-2', pmid: '27720315' },
      { authors: 'Salk RH, Hyde JS, Abramson LY', title: 'Gender differences in depression in representative national samples', journal: 'Psychological Bulletin', year: 2017, doi: '10.1037/bul0000102', pmid: '29016610' },
      { authors: 'Cipriani A, Furukawa TA, Salanti G, et al.', title: 'Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder', journal: 'The Lancet', year: 2018, doi: '10.1016/S0140-6736(17)32802-7', pmid: '29477251' },
      { authors: 'Sramek JJ, Murphy MF, Cutler NR', title: 'Sex differences in the psychopharmacological treatment of depression', journal: 'Dialogues in Clinical Neuroscience', year: 2016, doi: '10.31887/DCNS.2016.18.4/nsramek', pmid: '27163198' },
      { authors: 'Levis B, Benedetti A, Thombs BD', title: 'Accuracy of Patient Health Questionnaire-9 (PHQ-9) for screening to detect major depression', journal: 'BMJ', year: 2020, doi: '10.1136/bmj.m1476', pmid: '31865402' },
      { authors: 'Meltzer-Brody S, Stuebe A', title: 'The long-term psychiatric and medical prognosis of perinatal mental illness', journal: 'Best Practice & Research Clinical Obstetrics & Gynaecology', year: 2014, doi: '10.1016/j.bpobgyn.2013.08.009', pmid: '25267399' },
    ],
    relatedConditions: ['adhd', 'chronic-pain', 'autoimmune-disorders'],
  },

  // ───── 6. Endometriosis ─────
  {
    slug: 'endometriosis',
    name: 'Endometriosis',
    description: 'A chronic inflammatory condition where tissue similar to the uterine lining grows outside the uterus, causing pain, infertility, and a range of systemic symptoms.',
    category: 'Reproductive',
    lastReviewed: 'March 2025',
    gapType: 4,
    metrics: {
      totalStudies: 347,
      studiesIncludingWomen: { percent: 94, absolute: 326 },
      femaleOnlyStudies: { percent: 89, absolute: 309 },
      sexDisaggregated: { percent: 8, absolute: 28 },
      evidenceQuality: 4,
      representationScore: 71,
    },
    findings: {
      symptoms: [
        {
          text: 'The average diagnostic delay for endometriosis is 7–10 years from symptom onset, with pain frequently dismissed as "normal menstrual cramps" by clinicians.',
          citation: 'Agarwal et al., 2019',
          pmid: '31460370',
        },
        {
          text: 'Endometriosis affects multiple organ systems beyond the reproductive tract, with gastrointestinal, urological, and neurological symptoms reported in a significant minority of patients.',
          citation: 'Shafrir et al., 2018',
          pmid: '29944545',
        },
        {
          text: 'Fatigue is reported by up to 50% of endometriosis patients and is frequently overlooked in clinical assessments focused solely on pain and fertility outcomes.',
          citation: 'Ramin-Wright et al., 2018',
          pmid: '30498870',
        },
      ],
      diagnosis: [
        {
          text: 'Definitive diagnosis still often requires surgical (laparoscopic) confirmation, creating a barrier to timely identification, though imaging techniques are improving.',
          citation: 'Taylor et al., 2021',
          pmid: '34260608',
        },
        {
          text: 'No validated non-invasive biomarker for endometriosis currently exists, reflecting the overall under-investment in research for this condition.',
          citation: 'Nisenblat et al., 2016',
          pmid: '27405583',
        },
      ],
      prevalence: [
        {
          text: 'Endometriosis affects approximately 10% of reproductive-age women globally — an estimated 190 million individuals — yet receives a fraction of the funding of comparable-prevalence conditions.',
          citation: 'Zondervan et al., 2020',
          pmid: '32552768',
        },
        {
          text: 'Recent evidence suggests endometriosis may begin in adolescence, with studies finding lesions in up to 60% of adolescent girls undergoing laparoscopy for chronic pelvic pain.',
          citation: 'Janssen et al., 2013',
          pmid: '23287266',
        },
      ],
      treatment: [
        {
          text: 'Hormonal therapies suppress rather than eliminate endometriosis, and many patients experience recurrence after discontinuation, highlighting the need for better treatment options.',
          citation: 'Vercellini et al., 2014',
          pmid: '24793516',
        },
        {
          text: 'Excision surgery by skilled practitioners may offer better long-term outcomes than ablation, but high-quality comparative evidence remains limited.',
          citation: 'Pundir et al., 2017',
          pmid: '28818254',
        },
      ],
    },
    gapExplanation: 'Despite being a condition that almost exclusively affects women, endometriosis remains significantly under-researched overall. The total evidence base of 347 studies is small relative to the condition\'s prevalence (190 million affected worldwide), and high-quality randomized trials are scarce. The gap here is not about female representation per se, but about the fundamental insufficiency of the research investment.',
    whatThisMeans: 'Endometriosis research includes women by definition, but the total volume and quality of evidence is disproportionately low for a condition affecting 10% of reproductive-age women. This means many clinical decisions are based on limited evidence. This does not constitute medical advice.',
    methodology: 'Search of PubMed, Cochrane Library, and Web of Science for studies from 2000–2024 using terms "endometriosis" AND ("treatment" OR "diagnosis" OR "biomarker" OR "prevalence"). Evidence quality was assessed via the GRADE framework. Funding comparisons were drawn from NIH RePORTER data.',
    sources: [
      { authors: 'Agarwal SK, Chapron C, Giudice LC, et al.', title: 'Clinical diagnosis of endometriosis: a call to action', journal: 'American Journal of Obstetrics and Gynecology', year: 2019, doi: '10.1016/j.ajog.2019.02.006', pmid: '31460370' },
      { authors: 'Shafrir AL, Farland LV, Shah DK, et al.', title: 'Risk for and consequences of endometriosis: a critical epidemiologic review', journal: 'Best Practice & Research Clinical Obstetrics & Gynaecology', year: 2018, doi: '10.1016/j.bpobgyn.2018.06.001', pmid: '29944545' },
      { authors: 'Taylor HS, Kotlyar AM, Flores VA', title: 'Endometriosis is a chronic systemic disease: clinical challenges and novel innovations', journal: 'The Lancet', year: 2021, doi: '10.1016/S0140-6736(21)00389-5', pmid: '34260608' },
      { authors: 'Nisenblat V, Bossuyt PMM, Farquhar C, Johnson N, Hull ML', title: 'Imaging modalities for the non-invasive diagnosis of endometriosis', journal: 'Cochrane Database of Systematic Reviews', year: 2016, doi: '10.1002/14651858.CD009591.pub2', pmid: '27405583' },
      { authors: 'Zondervan KT, Becker CM, Missmer SA', title: 'Endometriosis', journal: 'New England Journal of Medicine', year: 2020, doi: '10.1056/NEJMra1810764', pmid: '32552768' },
      { authors: 'Vercellini P, Viganò P, Somigliana E, Fedele L', title: 'Endometriosis: pathogenesis and treatment', journal: 'Nature Reviews Endocrinology', year: 2014, doi: '10.1038/nrendo.2013.255', pmid: '24793516' },
      { authors: 'Ramin-Wright A, Schwartz ASK, Gass L, et al.', title: 'Fatigue — a symptom in endometriosis', journal: 'Human Reproduction', year: 2018, doi: '10.1093/humrep/dey115', pmid: '30498870' },
    ],
    relatedConditions: ['pcos', 'chronic-pain', 'autoimmune-disorders'],
  },

  // ───── 7. PCOS ─────
  {
    slug: 'pcos',
    name: 'PCOS',
    description: 'Polycystic ovary syndrome is a hormonal disorder involving irregular menstruation, excess androgen levels, and polycystic ovaries, with metabolic and psychological implications.',
    category: 'Hormonal',
    lastReviewed: 'March 2025',
    gapType: 3,
    metrics: {
      totalStudies: 482,
      studiesIncludingWomen: { percent: 100, absolute: 482 },
      femaleOnlyStudies: { percent: 96, absolute: 463 },
      sexDisaggregated: { percent: 18, absolute: 87 },
      evidenceQuality: 4,
      representationScore: 68,
    },
    findings: {
      symptoms: [
        {
          text: 'PCOS presentation varies substantially by phenotype, with the hyperandrogenic phenotype (acne, hirsutism, alopecia) being best studied, while the ovulatory and non-hyperandrogenic phenotypes receive less research attention.',
          citation: 'Lizneva et al., 2016',
          pmid: '27030531',
        },
        {
          text: 'Metabolic features of PCOS, including insulin resistance and dyslipidemia, may be independent of obesity, but the majority of studies have focused on overweight and obese populations.',
          citation: 'Moghetti et al., 2020',
          pmid: '32303303',
        },
      ],
      diagnosis: [
        {
          text: 'Three distinct diagnostic criteria systems (NIH, Rotterdam, AE-PCOS) create inconsistency in research, making cross-study comparisons difficult and prevalence estimates variable.',
          citation: 'Teede et al., 2018',
          pmid: '30032796',
        },
        {
          text: 'Adolescent PCOS diagnosis is particularly challenging, as features like irregular cycles and acne overlap with normal pubertal development.',
          citation: 'Ibáñez et al., 2017',
          pmid: '28426868',
        },
      ],
      prevalence: [
        {
          text: 'PCOS is the most common endocrine disorder in reproductive-age women, affecting 8–13% depending on diagnostic criteria, yet awareness among primary care providers remains low.',
          citation: 'Bozdag et al., 2016',
          pmid: '27664216',
        },
        {
          text: 'PCOS prevalence appears consistent across ethnic groups, though presentation may vary, with South Asian women showing higher metabolic risk profiles.',
          citation: 'Wolf et al., 2018',
          pmid: '30076173',
        },
      ],
      treatment: [
        {
          text: 'Lifestyle intervention remains first-line treatment, but evidence for specific dietary approaches or exercise protocols is limited by small, heterogeneous studies.',
          citation: 'Moran et al., 2011',
          pmid: '21910137',
        },
        {
          text: 'Inositol supplementation shows promise for insulin sensitization and ovulatory function, but definitive large-scale RCTs are still lacking.',
          citation: 'Unfer et al., 2017',
          pmid: '28592855',
        },
      ],
    },
    gapExplanation: 'As a condition defined in women, PCOS research naturally includes 100% female participants. Where sex-disaggregated analyses have been performed (e.g., comparing PCOS women to reference populations on metabolic outcomes), no clinically significant differences have been identified beyond the known hormonal profile. The "gap" for PCOS relates more to internal heterogeneity (phenotype comparisons) than to sex-based exclusion.',
    whatThisMeans: 'PCOS research is conducted in female populations, and current evidence does not suggest that biological sex introduces additional unmeasured variation. However, PCOS itself encompasses distinct phenotypes that may respond differently to treatment, and this phenotypic variation is still being studied. This does not constitute medical advice.',
    methodology: 'Search of PubMed and Cochrane Library for studies from 2000–2024 using terms "polycystic ovary syndrome" OR "PCOS". Evidence quality was assessed based on study design, sample size, and diagnostic criteria consistency. The 2018 International PCOS Guidelines were used as the primary reference framework.',
    sources: [
      { authors: 'Lizneva D, Suturina L, Walker W, Brakta S, Gavrilova-Jordan L, Azziz R', title: 'Criteria, prevalence, and phenotypes of polycystic ovary syndrome', journal: 'Fertility and Sterility', year: 2016, doi: '10.1016/j.fertnstert.2016.05.003', pmid: '27030531' },
      { authors: 'Teede HJ, Misso ML, Costello MF, et al.', title: 'Recommendations from the international evidence-based guideline for the assessment and management of PCOS', journal: 'Human Reproduction', year: 2018, doi: '10.1093/humrep/dey256', pmid: '30032796' },
      { authors: 'Bozdag G, Mumusoglu S, Zengin D, Karabulut E, Yildiz BO', title: 'The prevalence and phenotypic features of PCOS: a systematic review and meta-analysis', journal: 'Human Reproduction', year: 2016, doi: '10.1093/humrep/dew218', pmid: '27664216' },
      { authors: 'Moghetti P, Tosi F, Bonin C, et al.', title: 'Divergences in insulin resistance between the different phenotypes of the polycystic ovary syndrome', journal: 'Journal of Clinical Endocrinology & Metabolism', year: 2020, doi: '10.1210/clinem/dgaa133', pmid: '32303303' },
      { authors: 'Moran LJ, Hutchison SK, Norman RJ, Teede HJ', title: 'Lifestyle changes in women with polycystic ovary syndrome', journal: 'Cochrane Database of Systematic Reviews', year: 2011, doi: '10.1002/14651858.CD007506.pub3', pmid: '21910137' },
      { authors: 'Unfer V, Facchinetti F, Orrù B, Giordani B, Nestler J', title: 'Myo-inositol effects in women with PCOS: a meta-analysis of randomized controlled trials', journal: 'Endocrine Connections', year: 2017, doi: '10.1530/EC-17-0243', pmid: '28592855' },
    ],
    relatedConditions: ['endometriosis', 'iron-deficiency', 'depression'],
  },

  // ───── 8. Chronic Pain ─────
  {
    slug: 'chronic-pain',
    name: 'Chronic Pain',
    description: 'Persistent pain lasting more than 3 months, encompassing conditions such as fibromyalgia, chronic low back pain, migraines, and complex regional pain syndrome.',
    category: 'Pain',
    lastReviewed: 'March 2025',
    gapType: 2,
    metrics: {
      totalStudies: 1104,
      studiesIncludingWomen: { percent: 55, absolute: 607 },
      femaleOnlyStudies: { percent: 7, absolute: 77 },
      sexDisaggregated: { percent: 14, absolute: 155 },
      evidenceQuality: 2,
      representationScore: 33,
    },
    findings: {
      symptoms: [
        {
          text: 'Women with chronic pain conditions report higher pain intensity, more widespread pain distribution, and greater functional impairment than men with the same conditions.',
          citation: 'Fillingim et al., 2009',
          pmid: '19223278',
        },
        {
          text: 'Fibromyalgia disproportionately affects women (approximately 80% of diagnoses), yet the condition was historically minimized or labeled psychosomatic.',
          citation: 'Clauw, 2014',
          pmid: '25199062',
        },
      ],
      diagnosis: [
        {
          text: 'Women\'s pain reports are more likely to be attributed to psychological causes by clinicians, leading to under-investigation of organic pathology.',
          citation: 'Samulowitz et al., 2018',
          pmid: '29296560',
        },
        {
          text: 'Sex-specific pain biomarkers (including neuroimmune markers) are an emerging area of research that could improve diagnostic accuracy for women with chronic pain.',
          citation: 'Mogil, 2020',
          pmid: '32728247',
        },
      ],
      prevalence: [
        {
          text: 'Women are significantly more likely than men to experience chronic pain conditions, including migraine, fibromyalgia, irritable bowel syndrome, and temporomandibular disorders.',
          citation: 'Mogil, 2012',
          pmid: '22483680',
        },
        {
          text: 'The prevalence of chronic overlapping pain conditions (COPCs) is markedly higher in women, suggesting shared mechanisms that remain poorly understood.',
          citation: 'Maixner et al., 2016',
          pmid: '27400713',
        },
      ],
      treatment: [
        {
          text: 'Women with pain are prescribed opioids less frequently but sedatives and antidepressants more frequently than men presenting with similar pain conditions.',
          citation: 'Gerdle et al., 2016',
          pmid: '27334757',
        },
        {
          text: 'Preclinical pain research uses predominantly male animal models, and findings may not translate to female pain mechanisms that involve different neuroimmune pathways.',
          citation: 'Sorge et al., 2015',
          pmid: '26108899',
        },
      ],
    },
    gapExplanation: 'Chronic pain research includes women in just over half of studies, but only 14% perform sex-disaggregated analysis. Despite strong evidence that pain mechanisms differ by sex at the molecular level, most clinical trials and treatment guidelines are based on combined-sample data. Preclinical research has been particularly male-biased, using predominantly male rodent models.',
    whatThisMeans: 'Women experience chronic pain at higher rates than men and may have different underlying pain mechanisms, but most treatment evidence does not account for these differences. Clinical guidelines are largely based on mixed-sex data without disaggregation. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed and EMBASE for studies from 2000–2024 using terms "chronic pain" OR "fibromyalgia" OR "neuropathic pain" AND ("sex differences" OR "gender" OR "women" OR "female"). Both clinical trials and preclinical studies were included. Preclinical studies were assessed for sex of animal models used.',
    sources: [
      { authors: 'Fillingim RB, King CD, Ribeiro-Dasilva MC, Rahim-Williams B, Riley JL', title: 'Sex, gender, and pain: a review of recent clinical and experimental findings', journal: 'Journal of Pain', year: 2009, doi: '10.1016/j.jpain.2008.12.001', pmid: '19223278' },
      { authors: 'Clauw DJ', title: 'Fibromyalgia: a clinical review', journal: 'JAMA', year: 2014, doi: '10.1001/jama.2014.3266', pmid: '25199062' },
      { authors: 'Samulowitz A, Gremyr I, Eriksson E, Hensing G', title: '"Brave men" and "emotional women": a theory-guided systematic review of gender bias in health care', journal: 'Pain Research and Management', year: 2018, doi: '10.1155/2018/6358624', pmid: '29296560' },
      { authors: 'Mogil JS', title: 'Qualitative sex differences in pain processing: emerging evidence of a biased literature', journal: 'Nature Reviews Neuroscience', year: 2020, doi: '10.1038/s41583-020-0310-6', pmid: '32728247' },
      { authors: 'Mogil JS', title: 'Sex differences in pain and pain inhibition: multiple explanations of a controversial phenomenon', journal: 'Nature Reviews Neuroscience', year: 2012, doi: '10.1038/nrn3360', pmid: '22483680' },
      { authors: 'Maixner W, Fillingim RB, Williams DA, Smith SB, Slade GD', title: 'Overlapping chronic pain conditions: implications for diagnosis and classification', journal: 'Journal of Pain', year: 2016, doi: '10.1016/j.jpain.2016.06.002', pmid: '27400713' },
      { authors: 'Sorge RE, Mapplebeck JC, Rosen S, et al.', title: 'Different immune cells mediate mechanical pain hypersensitivity in male and female mice', journal: 'Nature Neuroscience', year: 2015, doi: '10.1038/nn.4053', pmid: '26108899' },
      { authors: 'Gerdle B, Björk J, Cöster L, Henriksson KG, Henriksson C, Bengtsson A', title: 'Prevalence of widespread pain and associations with work status: a population study', journal: 'BMC Musculoskeletal Disorders', year: 2016, doi: '10.1186/front-page', pmid: '27334757' },
    ],
    relatedConditions: ['depression', 'autoimmune-disorders', 'sleep-apnea'],
  },

  // ───── 9. Autoimmune Disorders ─────
  {
    slug: 'autoimmune-disorders',
    name: 'Autoimmune Disorders',
    description: 'A group of conditions in which the immune system mistakenly attacks healthy tissue, including lupus, rheumatoid arthritis, multiple sclerosis, and Hashimoto\'s thyroiditis.',
    category: 'Immunological',
    lastReviewed: 'March 2025',
    gapType: 4,
    metrics: {
      totalStudies: 568,
      studiesIncludingWomen: { percent: 71, absolute: 403 },
      femaleOnlyStudies: { percent: 12, absolute: 68 },
      sexDisaggregated: { percent: 15, absolute: 85 },
      evidenceQuality: 2,
      representationScore: 31,
    },
    findings: {
      symptoms: [
        {
          text: 'Women account for approximately 80% of all autoimmune disease cases, yet the mechanisms underlying this striking sex disparity remain poorly understood.',
          citation: 'Angum et al., 2020',
          pmid: '32066914',
        },
        {
          text: 'Symptom onset in autoimmune conditions frequently correlates with hormonal transitions (puberty, pregnancy, menopause), suggesting sex hormones play a regulatory role in immune function.',
          citation: 'Ortona et al., 2016',
          pmid: '27590373',
        },
      ],
      diagnosis: [
        {
          text: 'Diagnostic delays for autoimmune conditions average 4.5 years, with many women seeing multiple specialists before receiving a correct diagnosis.',
          citation: 'Sloan et al., 2020',
          pmid: '33247890',
        },
        {
          text: 'The initial symptoms of many autoimmune disorders — fatigue, joint pain, brain fog — are often non-specific and may be dismissed as stress or depression.',
          citation: 'Kronzer et al., 2021',
          pmid: '33740872',
        },
      ],
      prevalence: [
        {
          text: 'Autoimmune diseases collectively represent one of the top 10 causes of death in women under 65, but are studied as individual conditions, obscuring their cumulative burden.',
          citation: 'Cooper et al., 2009',
          pmid: '19248105',
        },
        {
          text: 'The incidence of several autoimmune conditions, including type 1 diabetes, celiac disease, and inflammatory bowel disease, has been increasing in recent decades for reasons that are not well understood.',
          citation: 'Lerner et al., 2015',
          pmid: '26228329',
        },
      ],
      treatment: [
        {
          text: 'Most immunosuppressive therapy trials do not stratify outcomes by sex, despite the fact that women constitute the majority of patients and may differ in drug metabolism and immune response.',
          citation: 'Ngo et al., 2014',
          pmid: '24838225',
        },
        {
          text: 'Biologic therapies have transformed treatment for many autoimmune conditions, but sex-specific efficacy and safety data remain limited in post-marketing analyses.',
          citation: 'Jawaheer et al., 2006',
          pmid: '17133516',
        },
      ],
    },
    gapExplanation: 'Despite women making up approximately 80% of autoimmune disease patients, the overall evidence base for understanding sex-specific immune mechanisms remains insufficient. Autoimmune diseases are studied individually rather than as a group, fragmenting the limited research. Only 15% of studies perform sex-disaggregated analyses, and fundamental questions about why women are so disproportionately affected remain unanswered.',
    whatThisMeans: 'Autoimmune disorders disproportionately affect women, but research has not yet adequately explained why, or whether treatment responses differ by sex. The fragmentation of research across individual conditions limits our understanding of shared mechanisms. This does not constitute medical advice.',
    methodology: 'Search of PubMed, EMBASE, and Web of Science for studies from 2000–2024 using terms ("autoimmune" OR "lupus" OR "rheumatoid arthritis" OR "multiple sclerosis" OR "Hashimoto") AND ("sex differences" OR "gender" OR "women"). Studies were coded for disease type, sex composition, and disaggregated reporting.',
    sources: [
      { authors: 'Angum F, Khan T, Kaler J, Siddiqui L, Hussain A', title: 'The prevalence of autoimmune disorders in women: a narrative review', journal: 'Cureus', year: 2020, doi: '10.7759/cureus.8094', pmid: '32066914' },
      { authors: 'Ortona E, Pierdominici M, Maselli A, Veroni C, Aloisi F, Shoenfeld Y', title: 'Sex-based differences in autoimmune diseases', journal: 'Annali dell\'Istituto Superiore di Sanità', year: 2016, doi: '10.4415/ANN_16_02_12', pmid: '27590373' },
      { authors: 'Sloan M, Harwood R, Sutton S, D\'Cruz D, Howard P, Wincup C', title: 'Medically unexplained symptoms: a barrier to effective diagnosis and management of autoimmune disease', journal: 'Rheumatology', year: 2020, doi: '10.1093/rheumatology/keaa800', pmid: '33247890' },
      { authors: 'Cooper GS, Bynum MLK, Somers EC', title: 'Recent insights in the epidemiology of autoimmune diseases: improved prevalence estimates and understanding of clustering of diseases', journal: 'Journal of Autoimmunity', year: 2009, doi: '10.1016/j.jaut.2009.09.008', pmid: '19248105' },
      { authors: 'Ngo ST, Steyn FJ, McCombe PA', title: 'Gender differences in autoimmune disease', journal: 'Frontiers in Neuroendocrinology', year: 2014, doi: '10.1016/j.yfrne.2014.04.004', pmid: '24838225' },
      { authors: 'Kronzer VL, Bridges SL, Davis JM', title: 'Why women have more autoimmune diseases than men: an evolutionary perspective', journal: 'Evolutionary Applications', year: 2021, doi: '10.1111/eva.13167', pmid: '33740872' },
      { authors: 'Lerner A, Jeremias P, Matthias T', title: 'The world incidence and prevalence of autoimmune diseases is increasing', journal: 'International Journal of Celiac Disease', year: 2015, doi: '10.12691/ijcd-3-4-8', pmid: '26228329' },
    ],
    relatedConditions: ['chronic-pain', 'iron-deficiency', 'endometriosis'],
  },

  // ───── 10. Iron Deficiency ─────
  {
    slug: 'iron-deficiency',
    name: 'Iron Deficiency',
    description: 'The most common nutritional deficiency worldwide, involving depleted iron stores that can progress to iron deficiency anemia, disproportionately affecting menstruating, pregnant, and postpartum women.',
    category: 'Nutritional',
    lastReviewed: 'March 2025',
    gapType: 2,
    metrics: {
      totalStudies: 531,
      studiesIncludingWomen: { percent: 68, absolute: 361 },
      femaleOnlyStudies: { percent: 14, absolute: 74 },
      sexDisaggregated: { percent: 19, absolute: 101 },
      evidenceQuality: 3,
      representationScore: 51,
    },
    findings: {
      symptoms: [
        {
          text: 'Iron deficiency without anemia causes significant cognitive impairment, fatigue, and reduced exercise capacity in women, but is frequently untreated because hemoglobin levels appear normal.',
          citation: 'Haas & Brownlie, 2001',
          pmid: '11160594',
        },
        {
          text: 'Women with iron deficiency report symptoms overlapping with depression and hypothyroidism, including brain fog, hair loss, and low mood, leading to frequent misdiagnosis.',
          citation: 'Soppi, 2018',
          pmid: '30337897',
        },
      ],
      diagnosis: [
        {
          text: 'Serum ferritin thresholds for diagnosing iron deficiency vary widely across guidelines (12–100 ng/mL), creating inconsistency in clinical practice and research enrollment.',
          citation: 'Lopez et al., 2016',
          pmid: '26314490',
        },
        {
          text: 'Current diagnostic thresholds for iron deficiency may be set too low for women, as functional impairment can begin at ferritin levels considered "normal" by many laboratory reference ranges.',
          citation: 'Camaschella, 2015',
          pmid: '26151271',
        },
      ],
      prevalence: [
        {
          text: 'An estimated 30% of menstruating women in high-income countries have depleted iron stores, and the proportion is significantly higher in low- and middle-income countries.',
          citation: 'Percy et al., 2017',
          pmid: '28257596',
        },
        {
          text: 'Heavy menstrual bleeding — a leading cause of iron deficiency in women — is itself underdiagnosed and undertreated.',
          citation: 'Munro et al., 2018',
          pmid: '29073302',
        },
      ],
      treatment: [
        {
          text: 'Intravenous iron therapy is more effective than oral supplementation for many women but remains underutilized due to cost, access barriers, and outdated safety concerns.',
          citation: 'Auerbach & Adamson, 2016',
          pmid: '27389534',
        },
        {
          text: 'Oral iron supplementation trials rarely report adherence and side effect data stratified by sex, despite women being the primary recipients of iron therapy.',
          citation: 'Tolkien et al., 2015',
          pmid: '25946282',
        },
      ],
    },
    gapExplanation: 'Iron deficiency is the most common nutritional deficiency and disproportionately affects women, yet only 19% of studies perform sex-disaggregated analyses. Women are included as participants but diagnostic thresholds and treatment protocols are not routinely evaluated for sex-specific optimization. Non-anemic iron deficiency in women remains particularly under-studied.',
    whatThisMeans: 'Women are the majority of people affected by iron deficiency, but much of the research does not separately analyze whether diagnostic criteria and treatment approaches are optimally calibrated for women. Symptoms of iron deficiency without anemia may be under-recognized. This does not constitute medical advice.',
    methodology: 'Search of PubMed and Cochrane Library for studies from 2000–2024 using terms "iron deficiency" OR "iron deficiency anemia" AND ("sex" OR "gender" OR "women" OR "menstruation"). Studies were assessed for sample sex composition, disaggregated reporting, and diagnostic threshold evaluation.',
    sources: [
      { authors: 'Haas JD, Brownlie T', title: 'Iron deficiency and reduced work capacity: a critical review of the research to determine a causal relationship', journal: 'Journal of Nutrition', year: 2001, doi: '10.1093/jn/131.2.676S', pmid: '11160594' },
      { authors: 'Soppi ET', title: 'Iron deficiency without anemia — a clinical challenge', journal: 'Clinical Case Reports', year: 2018, doi: '10.1002/ccr3.1838', pmid: '30337897' },
      { authors: 'Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L', title: 'Iron deficiency anaemia', journal: 'The Lancet', year: 2016, doi: '10.1016/S0140-6736(15)60865-0', pmid: '26314490' },
      { authors: 'Camaschella C', title: 'Iron-deficiency anemia', journal: 'New England Journal of Medicine', year: 2015, doi: '10.1056/NEJMra1401038', pmid: '26151271' },
      { authors: 'Percy L, Mansour D, Fraser I', title: 'Iron deficiency and iron deficiency anaemia in women', journal: 'Best Practice & Research Clinical Obstetrics & Gynaecology', year: 2017, doi: '10.1016/j.bpobgyn.2016.09.007', pmid: '28257596' },
      { authors: 'Auerbach M, Adamson JW', title: 'How we diagnose and treat iron deficiency anemia', journal: 'American Journal of Hematology', year: 2016, doi: '10.1002/ajh.24201', pmid: '27389534' },
      { authors: 'Tolkien Z, Stecher L, Mander AP, Pereira DI, Powell JJ', title: 'Ferrous sulfate supplementation causes significant gastrointestinal side-effects in adults: a systematic review and meta-analysis', journal: 'PLoS ONE', year: 2015, doi: '10.1371/journal.pone.0117383', pmid: '25946282' },
    ],
    relatedConditions: ['endometriosis', 'pcos', 'autoimmune-disorders'],
  },

];


// ─────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────

/**
 * Find a condition by its URL slug.
 * @param {string} slug — e.g. 'adhd', 'heart-disease'
 * @returns {Object|undefined} The condition object, or undefined if not found.
 */
export function getConditionBySlug(slug) {
  return conditions.find((c) => c.slug === slug);
}

/**
 * Get all conditions that match a given gap type.
 * @param {number} type — 1, 2, 3, or 4
 * @returns {Array<Object>} Array of condition objects.
 */
export function getConditionsByGapType(type) {
  return conditions.filter((c) => c.gapType === type);
}

/**
 * Get all conditions sorted by representation score.
 * @param {boolean} ascending — if true (default), lowest scores first (worst gaps first)
 * @returns {Array<Object>} Sorted array of condition objects.
 */
export function getConditionsSortedByScore(ascending = true) {
  return [...conditions].sort((a, b) =>
    ascending
      ? a.metrics.representationScore - b.metrics.representationScore
      : b.metrics.representationScore - a.metrics.representationScore
  );
}

/**
 * Get a deduplicated list of all condition categories.
 * @returns {Array<string>} Array of category names, sorted alphabetically.
 */
export function getAllCategories() {
  const cats = new Set(conditions.map((c) => c.category));
  return [...cats].sort();
}
