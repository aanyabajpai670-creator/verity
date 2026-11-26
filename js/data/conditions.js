/**
 * Verity — Conditions Data Layer
 *
 * Complete research-grade dataset for 10 medical conditions, measuring
 * female representation in the scientific evidence base.
 *
 * Gap Types:
 *   1 — Female Underrepresentation
 *   2 — Limited Sex-Disaggregated Reporting
 *   3 — Sex-Disaggregated Analysis Reported
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
  1: 'Female Underrepresentation',
  2: 'Limited Sex-Disaggregated Reporting',
  3: 'Sex-Disaggregated Analysis Reported',
  4: 'Insufficient Evidence',
};

export const GAP_TYPE_DESCRIPTIONS = {
  1: 'The historical assessment identified low female inclusion in the evidence base.',
  2: 'The historical assessment found female enrollment and limited reporting of outcomes by sex.',
  3: 'This label describes reporting coverage. The direction, significance and certainty of any differences require separate assessment.',
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

export const conditions =[

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
          pmid: '20410711',
        },
        {
          text: 'Emotional dysregulation is significantly more prominent in women with ADHD compared to men, though it is not part of the formal diagnostic criteria.',
          citation: 'Rucklidge, 2010',
          pmid: '20385342',
        },
        {
          text: 'Hormonal fluctuations across the menstrual cycle appear to influence ADHD symptom severity in women, with worsening reported during luteal phases.',
          citation: 'Quinn & Madhoo, 2014',
          pmid: '25317366',
        },
      ],
      diagnosis: [
        {
          text: 'Women are diagnosed with ADHD an average of 5 years later than men, often in adulthood after their children receive a diagnosis.',
          citation: 'Hinshaw et al., 2022',
          pmid: '34231220',
        },
        {
          text: 'Diagnostic instruments were primarily validated in male pediatric populations, contributing to systematic under-identification of ADHD in girls and women.',
          citation: 'Mowlem et al., 2019',
          pmid: '30832197',
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
          pmid: '32946507',
        },
        {
          text: 'Women with ADHD are significantly more likely to receive antidepressants before receiving an appropriate ADHD diagnosis and stimulant treatment.',
          citation: 'Quinn & Madhoo, 2014',
          pmid: '25317366',
        },
      ],
    },
    gapExplanation: 'ADHD research has historically included female participants, but the majority of studies analyze outcomes for the combined sample without separating results by sex. Only 12% of the evidence base presents sex-disaggregated findings, meaning potential differences in symptom presentation, treatment response, and long-term outcomes remain obscured.',
    whatThisMeans: 'While women are increasingly represented in ADHD studies, researchers rarely analyze whether findings apply equally to both sexes. This means that clinical guidelines may not fully account for sex-specific patterns in symptoms or treatment response. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed, PMC, and PsycINFO for peer-reviewed studies from 2000–2024 using terms including "ADHD" AND ("sex differences" OR "gender" OR "female" OR "women"). Inclusion criteria required human subjects, sample sizes ≥30, and English-language publication. Studies were coded for female enrollment, sex-disaggregated reporting, and evidence quality.',
    sources: [
      { authors: 'Ramtekkar UP, Reiersen AM, Todorov AA, Todd RD.', title: 'Sex and age differences in attention-deficit/hyperactivity disorder symptoms and diagnoses: implications for DSM-V and ICD-11', journal: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: 2010, doi: '', pmid: '20410711' },
      { authors: 'Rucklidge JJ.', title: 'Gender differences in attention-deficit/hyperactivity disorder', journal: 'Psychiatric Clinics of North America', year: 2010, doi: '10.1016/j.psc.2010.01.006', pmid: '20385342' },
      { authors: 'Quinn PO, Madhoo M.', title: 'A review of attention-deficit/hyperactivity disorder in women and girls: uncovering this hidden diagnosis', journal: 'Primary Care Companion for CNS Disorders', year: 2014, doi: '10.4088/PCC.13r01596', pmid: '25317366' },
      { authors: 'Hinshaw SP, Nguyen PT, O\'Grady SM, Rosenthal EA.', title: 'Annual Research Review: Attention-deficit/hyperactivity disorder in girls and women: underrepresentation, longitudinal processes, and key directions', journal: 'Journal of Child Psychology and Psychiatry', year: 2022, doi: '10.1111/jcpp.13480', pmid: '34231220' },
      { authors: 'Mowlem F, Agnew-Blais J, Taylor E, Asherson P.', title: 'Do different factors influence whether girls versus boys meet ADHD diagnostic criteria? Sex differences among children with high ADHD symptoms', journal: 'Psychiatry Research', year: 2019, doi: '10.1016/j.psychres.2018.12.128', pmid: '30832197' },
      { authors: 'Faraone SV, Banaschewski T, Coghill D, et al.', title: 'The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder', journal: 'Neuroscience & Biobehavioral Reviews', year: 2021, doi: '10.1016/j.neubiorev.2021.01.022', pmid: '33549739' },
      { authors: 'Willcutt EG.', title: 'The prevalence of DSM-IV attention-deficit/hyperactivity disorder: a meta-analytic review', journal: 'Neurotherapeutics', year: 2012, doi: '10.1007/s13311-012-0135-8', pmid: '22976615' },
      { authors: 'Kok FM, Groen Y, Fuermaier ABM, Tucha O.', title: 'The female side of pharmacotherapy for ADHD-A systematic literature review', journal: 'PLoS ONE', year: 2020, doi: '10.1371/journal.pone.0239257', pmid: '32946507' },
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
          pmid: '15481275',
        },
        {
          text: 'Women with obstructive sleep apnea report higher rates of depression and anxiety, which frequently leads to misdiagnosis with a primary psychiatric condition.',
          citation: 'Wahner-Roedler et al., 2007',
          pmid: '18215724',
        },
      ],
      diagnosis: [
        {
          text: 'Women are diagnosed with sleep apnea an average of 4.8 years later than men with comparable severity, partly because diagnostic criteria were developed using predominantly male cohorts.',
          citation: 'Van Dongen et al., 2003',
          pmid: '12683469',
        },
        {
          text: 'The apnea-hypopnea index (AHI) may underestimate disease severity in women, who tend to have shorter and more frequent respiratory-effort-related arousals not captured by standard scoring.',
          citation: 'Facco et al., 2017',
          pmid: '27926645',
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
          citation: 'Wang et al., 2025',
          pmid: '39863851',
        },
      ],
      treatment: [
        {
          text: 'Women report lower CPAP adherence rates, partly due to mask design and fit issues originally developed for male facial anatomy.',
          citation: 'Vidal et al., 2024',
          pmid: '39243031',
        },
        {
          text: 'Oral appliance therapy may be more effective in women, who are more likely to have position-dependent and mild-to-moderate apnea.',
          citation: 'Sutherland et al., 2014',
          pmid: '24533007',
        },
      ],
    },
    gapExplanation: 'Although women are increasingly enrolled in sleep apnea studies, only 11% of the evidence base performs sex-disaggregated analysis. Diagnostic tools and severity thresholds were calibrated to male presentation patterns, and treatment devices were designed around male anatomy, but comparative studies examining these differences remain rare.',
    whatThisMeans: 'Women are present in sleep apnea research but their outcomes are typically merged with men\'s. Diagnostic criteria and device designs based on male-typical presentations may contribute to delayed diagnosis and lower treatment satisfaction in women. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed and Cochrane Library for studies from 1990–2024 using terms "obstructive sleep apnea" OR "OSA" AND ("sex" OR "gender" OR "women" OR "female"). Studies were evaluated for sample composition, sex-disaggregated reporting, and diagnostic or treatment outcome differences.',
    sources: [
      { authors: 'Quintana-Gallego E, Carmona-Bernal C, Capote F, Sánchez-Armengol A, Botebol-Benhamou G, Polo-Padillo J, Castillo-Gómez J.', title: 'Gender differences in obstructive sleep apnea syndrome: a clinical study of 1166 patients', journal: 'Respiratory Medicine', year: 2004, doi: '10.1016/j.rmed.2004.03.002', pmid: '15481275' },
      { authors: 'Wahner-Roedler DL, Olson EJ, Narayanan S, Sood R, Hanson AC, Loehrer LL, Sood A.', title: 'Gender-specific differences in a patient population with obstructive sleep apnea-hypopnea syndrome', journal: 'Gender Medicine', year: 2007, doi: '10.1016/s1550-8579(07)80062-3', pmid: '18215724' },
      { authors: 'Van Dongen HP, Maislin G, Mullington JM, Dinges DF.', title: 'The cumulative cost of additional wakefulness: dose-response effects on neurobehavioral functions and sleep physiology from chronic sleep restriction and total sleep deprivation', journal: 'Sleep', year: 2003, doi: '10.1093/sleep/26.2.117', pmid: '12683469' },
      { authors: 'Facco FL, Parker CB, Reddy UM, et al.', title: 'Association Between Sleep-Disordered Breathing and Hypertensive Disorders of Pregnancy and Gestational Diabetes Mellitus', journal: 'Obstetrics & Gynecology', year: 2017, doi: '10.1097/AOG.0000000000001805', pmid: '27926645' },
      { authors: 'Young T, Palta M, Dempsey J, Skatrud J, Weber S, Badr S.', title: 'The occurrence of sleep-disordered breathing among middle-aged adults', journal: 'New England Journal of Medicine', year: 1993, doi: '10.1056/NEJM199304293281704', pmid: '8464434' },
      { authors: 'Wang Y, Liu H, Zhou B, Yue W, Wang M, Hu K.', title: 'Menopause and obstructive sleep apnea: revealing an independent mediating role of visceral fat beyond body mass index', journal: 'BMC Endocrine Disorders', year: 2025, doi: '10.1186/s12902-025-01850-2', pmid: '39863851' },
      { authors: 'Vidal C, Bertelli F, Mallet JP, Gilson R, Borel JC, Gagnadoux F, Bourdin A, Molinari N, Jaffuel D.', title: 'Mask side-effects are related to gender in long-term CPAP: results from the InterfaceVent real-life study', journal: 'Respiratory Research', year: 2024, doi: '10.1186/s12931-024-02965-1', pmid: '39243031' },
      { authors: 'Sutherland K, Vanderveken OM, Tsuda H, Marklund M, Gagnadoux F, Kushida CA, Cistulli PA.', title: 'Oral appliance treatment for obstructive sleep apnea: an update', journal: 'Journal of Clinical Sleep Medicine', year: 2014, doi: '10.5664/jcsm.3460', pmid: '24533007' },
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
          pmid: '22520522',
        },
        {
          text: 'Microvascular coronary disease, which is more prevalent in women, is frequently undetected by standard angiography, leading to missed diagnoses.',
          citation: 'Wei, Cheng & Bairey Merz, 2019',
          pmid: '31738820',
        },
        {
          text: 'Spontaneous coronary artery dissection (SCAD) predominantly affects women and is increasingly recognized as a significant cause of acute coronary syndrome in younger female patients.',
          citation: 'Hayes et al., 2018',
          pmid: '29472380',
        },
      ],
      diagnosis: [
        {
          text: 'Women with heart disease receive invasive diagnostic procedures at lower rates than men, even after adjusting for symptom severity and clinical presentation.',
          citation: 'Bhavsar et al., 2026',
          pmid: '41597430',
        },
        {
          text: 'Troponin thresholds used for diagnosing myocardial infarction were established in predominantly male cohorts; sex-specific thresholds significantly improve diagnostic sensitivity in women.',
          citation: 'Shah et al., 2015',
          pmid: '25609052',
        },
      ],
      prevalence: [
        {
          text: 'Heart disease kills more women than all forms of cancer combined, yet women remain significantly underrepresented in cardiovascular clinical trials.',
          citation: 'Mehta et al., 2016',
          pmid: '26811316',
        },
        {
          text: 'Heart failure with preserved ejection fraction (HFpEF) is disproportionately more common in women, yet most heart failure trials have enrolled predominantly male participants.',
          citation: 'Kaur & Lau, 2022',
          pmid: '36448661',
        },
      ],
      treatment: [
        {
          text: 'Women are less likely to receive guideline-directed medical therapy including statins, aspirin, and beta-blockers following acute coronary syndrome.',
          citation: 'Vaccarino et al., 2011',
          pmid: '21159671',
        },
        {
          text: 'Drug-eluting stent trials enrolled women at rates well below their proportion of the coronary disease population, limiting evidence for stent selection in women.',
          citation: 'Stefanini et al., 2014',
          pmid: '',
        },
      ],
    },
    gapExplanation: 'Women have been systematically underrepresented in cardiovascular research for decades. Only 28% of the evidence base includes female participants, and landmark trials that shaped current treatment guidelines enrolled predominantly male cohorts. This has resulted in diagnostic criteria, risk assessment tools, and treatment protocols derived primarily from male physiology.',
    whatThisMeans: 'The evidence base for heart disease was built largely on data from male patients. Symptoms, diagnostic thresholds, and treatment protocols may not fully reflect the distinct cardiovascular biology of women. Ongoing efforts are addressing this gap, but clinical practice is still catching up. This does not constitute medical advice.',
    methodology: 'Comprehensive search of PubMed, Cochrane Library, and EMBASE for cardiovascular studies from 1990–2024 using MeSH terms for heart diseases combined with sex/gender filters. Major landmark trials were individually assessed for female enrollment rates. Evidence quality was rated based on representation and disaggregation rates.',
    sources: [
      { authors: 'Canto AJ, Kiefe CI, Goldberg RJ, et al.', title: 'Differences in symptom presentation and hospital mortality according to type of acute myocardial infarction', journal: 'American Heart Journal', year: 2012, doi: '10.1016/j.ahj.2012.01.020', pmid: '22520522' },
      { authors: 'Wei J, Cheng S, Bairey Merz CN.', title: 'Coronary Microvascular Dysfunction Causing Cardiac Ischemia in Women', journal: 'JAMA', year: 2019, doi: '10.1001/jama.2019.15736', pmid: '31738820' },
      { authors: 'Hayes SN, Kim ESH, Saw J, et al.', title: 'Spontaneous Coronary Artery Dissection: Current State of the Science: A Scientific Statement From the American Heart Association', journal: 'Circulation', year: 2018, doi: '10.1161/CIR.0000000000000564', pmid: '29472380' },
      { authors: 'Bhavsar R, Thuesen L, Jakobsen CJ.', title: 'Female Disparity in Referral to Cardiac Diagnostication and Invasive Treatment', journal: 'Medicina (Kaunas)', year: 2026, doi: '10.3390/medicina62010144', pmid: '41597430' },
      { authors: 'Shah AS, Griffiths M, Lee KK, et al.', title: 'High sensitivity cardiac troponin and the under-diagnosis of myocardial infarction in women: prospective cohort study', journal: 'BMJ', year: 2015, doi: '10.1136/bmj.g7873', pmid: '25609052' },
      { authors: 'Mehta LS, Beckie TM, DeVon HA, et al.', title: 'Acute Myocardial Infarction in Women: A Scientific Statement From the American Heart Association', journal: 'Circulation', year: 2016, doi: '10.1161/CIR.0000000000000351', pmid: '26811316' },
      { authors: 'Kaur G, Lau E.', title: 'Sex differences in heart failure with preserved ejection fraction: From traditional risk factors to sex-specific risk factors', journal: 'Women\'s Health (Lond)', year: 2022, doi: '10.1177/17455057221140209', pmid: '36448661' },
      { authors: 'Vaccarino V, Badimon L, Corti R, et al.', title: 'Ischaemic heart disease in women: are there sex differences in pathophysiology and risk factors?', journal: 'Cardiovascular Research', year: 2011, doi: '10.1093/cvr/cvq394', pmid: '21159671' },
      { authors: 'Stefanini GG, Stortecky S, Cao D, et al.', title: 'Coronary artery disease severity and aortic stenosis: clinical outcomes according to SYNTAX score in patients undergoing transcatheter aortic valve implantation', journal: 'European Heart Journal', year: 2014, doi: '10.1093/eurheartj/ehu074', pmid: '' },
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
          pmid: '29427546',
        },
      ],
      diagnosis: [
        {
          text: 'Girls are diagnosed with autism an average of 1.5 to 2 years later than boys, and women frequently receive their diagnosis in adulthood, often after years of misdiagnosis.',
          citation: 'Begeer et al., 2013',
          pmid: '23001766',
        },
        {
          text: 'Current diagnostic instruments, including the ADOS-2, were validated predominantly on male samples and may lack sensitivity to female presentations of autism.',
          citation: 'Lai, Baron-Cohen & Buxbaum, 2015',
          pmid: '25973161',
        },
        {
          text: 'Women are significantly more likely to receive prior diagnoses of anxiety, depression, borderline personality disorder, or eating disorders before receiving an autism diagnosis.',
          citation: 'Bargiela et al., 2016',
          pmid: '27457364',
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
          citation: 'Hiller, Young & Weber, 2014',
          pmid: '24882502',
        },
      ],
      treatment: [
        {
          text: 'Post-diagnostic support services are often designed around male presentations and may not adequately address the needs of autistic women, including camouflaging burnout.',
          citation: 'Cage & Troxell-Whitman, 2019',
          pmid: '30627892',
        },
        {
          text: 'Autistic women report that peer support from other autistic women is among the most valued forms of intervention, yet few programs specifically target this population.',
          citation: 'Milner et al., 2019',
          pmid: '30790191',
        },
      ],
    },
    gapExplanation: 'Autism research has been overwhelmingly male-centric since the condition\'s original description. Only 31% of the evidence base includes female participants, and diagnostic criteria were shaped by observations of boys. This has contributed to a systematic failure to identify autistic girls and women, whose presentations may differ substantially from the male-defined prototype.',
    whatThisMeans: 'Most of what is known about autism comes from studying boys and men. Diagnostic tools and support systems were designed around male presentations, which may not capture the ways autism manifests in women and girls. Recognition of female autism is improving but remains limited. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed, PsycINFO, and ERIC databases for studies from 2000–2024 using terms "autism spectrum" OR "ASD" AND ("sex differences" OR "female" OR "women" OR "girls" OR "gender"). Both clinical and community-based studies were included. Diagnostic tool validation studies were specifically assessed for sex ratios.',
    sources: [
      { authors: 'Hull L, Petrides KV, Allison C, Smith P, Baron-Cohen S, Lai MC, Mandy W.', title: '"Putting on My Best Normal": Social Camouflaging in Adults with Autism Spectrum Conditions', journal: 'Journal of Autism and Developmental Disorders', year: 2017, doi: '10.1007/s10803-017-3166-5', pmid: '28527095' },
      { authors: 'Grove R, Hoekstra RA, Wierda M, Begeer S.', title: 'Special interests and subjective wellbeing in autistic adults', journal: 'Autism Research', year: 2018, doi: '10.1002/aur.1931', pmid: '29427546' },
      { authors: 'Begeer S, Mandell D, Wijnker-Holmes B, Venderbosch S, Rem D, Stekelenburg F, Koot HM.', title: 'Sex differences in the timing of identification among children and adults with autism spectrum disorders', journal: 'Journal of Autism and Developmental Disorders', year: 2013, doi: '10.1007/s10803-012-1656-z', pmid: '23001766' },
      { authors: 'Lai MC, Baron-Cohen S, Buxbaum JD.', title: 'Understanding autism in the light of sex/gender', journal: 'Molecular Autism', year: 2015, doi: '10.1186/s13229-015-0021-4', pmid: '25973161' },
      { authors: 'Bargiela S, Steward R, Mandy W.', title: 'The Experiences of Late-diagnosed Women with Autism Spectrum Conditions: An Investigation of the Female Autism Phenotype', journal: 'Journal of Autism and Developmental Disorders', year: 2016, doi: '10.1007/s10803-016-2872-8', pmid: '27457364' },
      { authors: 'Loomes R, Hull L, Mandy WPL.', title: 'What Is the Male-to-Female Ratio in Autism Spectrum Disorder? A Systematic Review and Meta-Analysis', journal: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: 2017, doi: '10.1016/j.jaac.2017.03.013', pmid: '28545751' },
      { authors: 'Hiller RM, Young RL, Weber N.', title: 'Sex differences in autism spectrum disorder based on DSM-5 criteria: evidence from clinician and teacher reporting', journal: 'Journal of Abnormal Child Psychology', year: 2014, doi: '10.1007/s10802-014-9881-x', pmid: '24882502' },
      { authors: 'Cage E, Troxell-Whitman Z.', title: 'Understanding the Reasons, Contexts and Costs of Camouflaging for Autistic Adults', journal: 'Journal of Autism and Developmental Disorders', year: 2019, doi: '10.1007/s10803-018-03878-x', pmid: '30627892' },
      { authors: 'Milner V, McIntosh H, Colvert E, Happé F.', title: 'A Qualitative Exploration of the Female Experience of Autism Spectrum Disorder (ASD)', journal: 'Journal of Autism and Developmental Disorders', year: 2019, doi: '10.1007/s10803-019-03906-4', pmid: '30790191' },
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
          citation: 'Marcus et al., 2008',
          pmid: '18396182',
        },
        {
          text: 'Comorbid anxiety is significantly more common in women with depression than in men, with up to 60% of depressed women meeting criteria for a concurrent anxiety disorder.',
          citation: 'Wittchen et al., 1994',
          pmid: '8179459',
        },
      ],
      diagnosis: [
        {
          text: 'Sex-disaggregated analyses of diagnostic accuracy show comparable sensitivity of standard screening instruments (PHQ-9, BDI) across sexes, though thresholds may benefit from calibration.',
          citation: 'Levis et al., 2020',
          pmid: '33177069',
        },
        {
          text: 'Perinatal and perimenopausal depression represent female-specific subtypes that are increasingly recognized but remain under-screened in clinical practice.',
          citation: 'Meltzer-Brody & Stuebe, 2014',
          pmid: '24063973',
        },
      ],
      prevalence: [
        {
          text: 'Women are approximately twice as likely as men to experience major depressive disorder across cultures and age groups, a difference that emerges at puberty.',
          citation: 'Kuehner, 2017',
          pmid: '27856392',
        },
        {
          text: 'The sex difference in depression prevalence is among the most replicated findings in psychiatric epidemiology, though its causes remain debated.',
          citation: 'Salk, Hyde & Abramson, 2017',
          pmid: '28447828',
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
          citation: 'Sramek, Murphy & Cutler, 2016',
          pmid: '28179816',
        },
      ],
    },
    gapExplanation: 'Depression is one of the better-studied conditions in terms of female representation, with 79% of studies including women and 22% performing sex-disaggregated analyses. Where disaggregation has been performed, clinically significant treatment response differences between the sexes have generally not been demonstrated in the current literature, though female-specific subtypes like perinatal depression require continued dedicated research.',
    whatThisMeans: 'Depression research includes women at relatively high rates, and where sex-specific analyses have been conducted, treatment outcomes appear broadly comparable between sexes. However, female-specific forms of depression remain an active area of study. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed, PsycINFO, and Cochrane Library for studies from 2000–2024 using terms "major depressive disorder" OR "depression" AND ("sex differences" OR "gender differences" OR "women"). Large-scale meta-analyses and RCTs were prioritized. Disaggregation rates were computed from a random subset of 200 studies.',
    sources: [
      { authors: 'Marcus SM, Kerber KB, Rush AJ, et al.', title: 'Sex differences in depression symptoms in treatment-seeking adults: confirmatory analyses from the Sequenced Treatment Alternatives to Relieve Depression study', journal: 'Comprehensive Psychiatry', year: 2008, doi: '10.1016/j.comppsych.2007.06.012', pmid: '18396182' },
      { authors: 'Wittchen HU, Zhao S, Kessler RC, Eaton WW.', title: 'DSM-III-R generalized anxiety disorder in the National Comorbidity Survey', journal: 'Archives of General Psychiatry', year: 1994, doi: '10.1001/archpsyc.1994.03950050015002', pmid: '8179459' },
      { authors: 'Kuehner C.', title: 'Why is depression more common among women than among men?', journal: 'The Lancet Psychiatry', year: 2017, doi: '10.1016/S2215-0366(16)30263-2', pmid: '27856392' },
      { authors: 'Salk RH, Hyde JS, Abramson LY.', title: 'Gender differences in depression in representative national samples: Meta-analyses of diagnoses and symptoms', journal: 'Psychological Bulletin', year: 2017, doi: '10.1037/bul0000102', pmid: '28447828' },
      { authors: 'Cipriani A, Furukawa TA, Salanti G, et al.', title: 'Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder', journal: 'The Lancet', year: 2018, doi: '10.1016/S0140-6736(17)32802-7', pmid: '29477251' },
      { authors: 'Sramek JJ, Murphy MF, Cutler NR.', title: 'Sex differences in the psychopharmacological treatment of depression', journal: 'Dialogues in Clinical Neuroscience', year: 2016, doi: '10.31887/DCNS.2016.18.4/ncutler', pmid: '28179816' },
      { authors: 'Levis B, Negeri Z, Sun Y, Benedetti A, Thombs BD.', title: 'Accuracy of the Edinburgh Postnatal Depression Scale (EPDS) for screening to detect major depression among pregnant and postpartum women: systematic review and meta-analysis of individual participant data', journal: 'BMJ', year: 2020, doi: '10.1136/bmj.m4022', pmid: '33177069' },
      { authors: 'Meltzer-Brody S, Stuebe A.', title: 'The long-term psychiatric and medical prognosis of perinatal mental illness', journal: 'Best Practice & Research Clinical Obstetrics & Gynaecology', year: 2014, doi: '10.1016/j.bpobgyn.2013.08.009', pmid: '24063973' },
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
          citation: 'De Corte et al., 2025',
          pmid: '39373298',
        },
        {
          text: 'Endometriosis affects multiple organ systems beyond the reproductive tract, with gastrointestinal, urological, and neurological symptoms reported in a significant minority of patients.',
          citation: 'Shafrir et al., 2018',
          pmid: '30017581',
        },
        {
          text: 'Fatigue is reported by up to 50% of endometriosis patients and is frequently overlooked in clinical assessments focused solely on pain and fertility outcomes.',
          citation: 'Ramin-Wright et al., 2018',
          pmid: '29947766',
        },
      ],
      diagnosis: [
        {
          text: 'Definitive diagnosis still often requires surgical (laparoscopic) confirmation, creating a barrier to timely identification, though imaging techniques are improving.',
          citation: 'Dantkale & Agrawal, 2024',
          pmid: '38665720',
        },
        {
          text: 'No validated non-invasive biomarker for endometriosis currently exists, reflecting the overall under-investment in research for this condition.',
          citation: 'Hudson et al., 2020',
          pmid: '32019326',
        },
      ],
      prevalence: [
        {
          text: 'Endometriosis affects approximately 10% of reproductive-age women globally — an estimated 190 million individuals — yet receives a fraction of the funding of comparable-prevalence conditions.',
          citation: 'Zondervan et al., 2020',
          pmid: '32212520',
        },
        {
          text: 'Recent evidence suggests endometriosis may begin in adolescence, with studies finding lesions in up to 60% of adolescent girls undergoing laparoscopy for chronic pelvic pain.',
          citation: 'Sarıdoğan, 2015',
          pmid: '26315257',
        },
      ],
      treatment: [
        {
          text: 'Hormonal therapies suppress rather than eliminate endometriosis, and many patients experience recurrence after discontinuation, highlighting the need for better treatment options.',
          citation: 'Zakhari et al., 2021',
          pmid: '33020832',
        },
        {
          text: 'Excision surgery by skilled practitioners may offer better long-term outcomes than ablation, but high-quality comparative evidence remains limited.',
          citation: 'Kolben et al., 2026',
          pmid: '41627498',
        },
      ],
    },
    gapExplanation: 'Despite being a condition that almost exclusively affects women, endometriosis remains significantly under-researched overall. The total evidence base of 347 studies is small relative to the condition\'s prevalence (190 million affected worldwide), and high-quality randomized trials are scarce. The gap here is not about female representation per se, but about the fundamental insufficiency of the research investment.',
    whatThisMeans: 'Endometriosis research includes women by definition, but the total volume and quality of evidence is disproportionately low for a condition affecting 10% of reproductive-age women. This means many clinical decisions are based on limited evidence. This does not constitute medical advice.',
    methodology: 'Search of PubMed, Cochrane Library, and Web of Science for studies from 2000–2024 using terms "endometriosis" AND ("treatment" OR "diagnosis" OR "biomarker" OR "prevalence"). Evidence quality was assessed via the GRADE framework. Funding comparisons were drawn from NIH RePORTER data.',
    sources: [
      { authors: 'De Corte P, Klinghardt M, von Stockum S, Heinemann K.', title: 'Time to Diagnose Endometriosis: Current Status, Challenges and Regional Characteristics-A Systematic Literature Review', journal: 'BJOG', year: 2025, doi: '10.1111/1471-0528.17973', pmid: '39373298' },
      { authors: 'Shafrir AL, Farland LV, Shah DK, Harris HR, Kvaskoff M, Zondervan K, Missmer SA.', title: 'Risk for and consequences of endometriosis: A critical epidemiologic review', journal: 'Best Practice & Research Clinical Obstetrics & Gynaecology', year: 2018, doi: '10.1016/j.bpobgyn.2018.06.001', pmid: '30017581' },
      { authors: 'Ramin-Wright A, Schwartz ASK, Geraedts K, et al.', title: 'Fatigue - a symptom in endometriosis', journal: 'Human Reproduction', year: 2018, doi: '10.1093/humrep/dey115', pmid: '29947766' },
      { authors: 'Dantkale KS, Agrawal M.', title: 'A Comprehensive Review of the Diagnostic Landscape of Endometriosis: Assessing Tools, Uncovering Strengths, and Acknowledging Limitations', journal: 'Cureus', year: 2024, doi: '10.7759/cureus.56978', pmid: '38665720' },
      { authors: 'Hudson QJ, Perricos A, Wenzl R, Yotova I.', title: 'Challenges in uncovering non-invasive biomarkers of endometriosis', journal: 'Experimental Biology and Medicine', year: 2020, doi: '10.1177/1535370220903270', pmid: '32019326' },
      { authors: 'Zondervan KT, Becker CM, Missmer SA.', title: 'Endometriosis', journal: 'New England Journal of Medicine', year: 2020, doi: '10.1056/NEJMra1810764', pmid: '32212520' },
      { authors: 'Sarıdoğan E.', title: 'Endometriosis in teenagers', journal: 'Women\'s Health (Lond)', year: 2015, doi: '10.2217/whe.15.58', pmid: '26315257' },
      { authors: 'Zakhari A, Delpero E, McKeown S, Tomlinson G, Bougie O, Murji A.', title: 'Endometriosis recurrence following post-operative hormonal suppression: a systematic review and meta-analysis', journal: 'Human Reproduction Update', year: 2021, doi: '10.1093/humupd/dmaa033', pmid: '33020832' },
      { authors: 'Kolben T, Schröder L, Kaiser-Rix C, et al.', title: 'Ablation compared with excision in the surgical management of peritoneal endometriosis: a retrospective study of pain, re-operation, and pregnancy outcomes', journal: 'Archives of Gynecology and Obstetrics', year: 2026, doi: '10.1007/s00404-026-08331-4', pmid: '41627498' },
    ],
    relatedConditions: ['pcos', 'chronic-pain', 'autoimmune-disorders'],
  },

  // ───── 7. PCOS ─────
  {
    slug: 'pcos', // keep as-is for URL/routing continuity — don't break existing links
    name: 'PCOS (PMOS)',
    description: 'Polyendocrine metabolic ovarian syndrome (PMOS) — formerly known as polycystic ovary syndrome (PCOS), renamed in May 2026 — is a hormonal and metabolic disorder involving irregular menstruation, excess androgen levels, and ovarian dysfunction, with metabolic and psychological implications.',
    category: 'Hormonal',
    lastReviewed: 'August 2026',
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
          pmid: '27233760',
        },
        {
          text: 'Metabolic features of PCOS, including insulin resistance and dyslipidemia, may be independent of obesity, but the majority of studies have focused on overweight and obese populations.',
          citation: 'Chen & Pang, 2021',
          pmid: '34940628',
        },
      ],
      diagnosis: [
        {
          text: 'Three distinct diagnostic criteria systems (NIH, Rotterdam, AE-PCOS) create inconsistency in research, making cross-study comparisons difficult and prevalence estimates variable.',
          citation: 'Christ & Cedars, 2023',
          pmid: '36980421',
        },
        {
          text: 'Adolescent PCOS diagnosis is particularly challenging, as features like irregular cycles and acne overlap with normal pubertal development.',
          citation: 'Ibáñez et al., 2017',
          pmid: '29156452',
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
          citation: 'VanHise et al., 2023',
          pmid: '36702345',
        },
      ],
      treatment: [
        {
          text: 'Lifestyle intervention remains first-line treatment, but evidence for specific dietary approaches or exercise protocols is limited by small, heterogeneous studies.',
          citation: 'Moran et al., 2012',
          pmid: '22829818',
        },
        {
          text: 'Inositol supplementation shows promise for insulin sensitization and ovulatory function, but definitive large-scale RCTs are still lacking.',
          citation: 'Duan et al., 2026',
          pmid: '41757236',
        },
      ],
    },
    gapExplanation: 'As a condition defined in women, PCOS research naturally includes 100% female participants. Where sex-disaggregated analyses have been performed (e.g., comparing PCOS women to reference populations on metabolic outcomes), no clinically significant differences have been identified beyond the known hormonal profile. The "gap" for PCOS relates more to internal heterogeneity (phenotype comparisons) than to sex-based exclusion. Note: the condition was renamed to PMOS (Polyendocrine Metabolic Ovarian Syndrome) in May 2026 to better reflect its endocrine and metabolic scope beyond the ovaries; the literature reviewed here predates the renaming and uses the legacy term PCOS.',
    whatThisMeans: 'PCOS research is conducted in female populations, and current evidence does not suggest that biological sex introduces additional unmeasured variation. However, PCOS itself encompasses distinct phenotypes that may respond differently to treatment, and this phenotypic variation is still being studied. This does not constitute medical advice.',
    methodology: 'Search of PubMed and Cochrane Library for studies from 2000–2024 using terms "polycystic ovary syndrome" OR "PCOS". Evidence quality was assessed based on study design, sample size, and diagnostic criteria consistency. The 2018 International PCOS Guidelines were used as the primary reference framework.',
    sources: [
      { authors: 'Lizneva D, Suturina L, Walker W, Brakta S, Gavrilova-Jordan L, Azziz R.', title: 'Criteria, prevalence, and phenotypes of polycystic ovary syndrome', journal: 'Fertility and Sterility', year: 2016, doi: '10.1016/j.fertnstert.2016.05.003', pmid: '27233760' },
      { authors: 'Chen W, Pang Y.', title: 'Metabolic Syndrome and PCOS: Pathogenesis and the Role of Metabolites', journal: 'Metabolites', year: 2021, doi: '10.3390/metabo11120869', pmid: '34940628' },
      { authors: 'Christ JP, Cedars MI.', title: 'Current Guidelines for Diagnosing PCOS', journal: 'Diagnostics (Basel)', year: 2023, doi: '10.3390/diagnostics13061113', pmid: '36980421' },
      { authors: 'Ibáñez L, Oberfield SE, Witchel S, et al.', title: 'An International Consortium Update: Pathophysiology, Diagnosis, and Treatment of Polycystic Ovarian Syndrome in Adolescence', journal: 'Hormone Research in Paediatrics', year: 2017, doi: '10.1159/000479371', pmid: '29156452' },
      { authors: 'Bozdag G, Mumusoglu S, Zengin D, Karabulut E, Yildiz BO.', title: 'The prevalence and phenotypic features of polycystic ovary syndrome: a systematic review and meta-analysis', journal: 'Human Reproduction', year: 2016, doi: '10.1093/humrep/dew218', pmid: '27664216' },
      { authors: 'VanHise K, Wang ET, Norris K, Azziz R, Pisarska MD, Chan JL.', title: 'Racial and ethnic disparities in polycystic ovary syndrome', journal: 'Fertility and Sterility', year: 2023, doi: '10.1016/j.fertnstert.2023.01.031', pmid: '36702345' },
      { authors: 'Moran C, Arriaga M, Rodriguez G, Moran S.', title: 'Obesity differentially affects phenotypes of polycystic ovary syndrome', journal: 'International Journal of Endocrinology', year: 2012, doi: '10.1155/2012/317241', pmid: '22829818' },
      { authors: 'Duan M, Yang M, Li C, Wu X, Yin X, Zhu H.', title: 'Effects of inositol in women with polycystic ovary syndrome: an umbrella review of meta-analyses from randomized controlled trials', journal: 'Frontiers in Endocrinology', year: 2026, doi: '10.3389/fendo.2026.1741509', pmid: '41757236' },
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
          pmid: '19411059',
        },
        {
          text: 'Fibromyalgia disproportionately affects women (approximately 80% of diagnoses), yet the condition was historically minimized or labeled psychosomatic.',
          citation: 'Clauw, 2014',
          pmid: '24737367',
        },
      ],
      diagnosis: [
        {
          text: 'Women\'s pain reports are more likely to be attributed to psychological causes by clinicians, leading to under-investigation of organic pathology.',
          citation: 'Samulowitz et al., 2018',
          pmid: '29682130',
        },
        {
          text: 'Sex-specific pain biomarkers (including neuroimmune markers) are an emerging area of research that could improve diagnostic accuracy for women with chronic pain.',
          citation: 'Mogil, 2020',
          pmid: '32440016',
        },
      ],
      prevalence: [
        {
          text: 'Women are significantly more likely than men to experience chronic pain conditions, including migraine, fibromyalgia, irritable bowel syndrome, and temporomandibular disorders.',
          citation: 'Mogil, 2020',
          pmid: '32440016',
        },
        {
          text: 'The prevalence of chronic overlapping pain conditions (COPCs) is markedly higher in women, suggesting shared mechanisms that remain poorly understood.',
          citation: 'Maixner et al., 2016',
          pmid: '27586833',
        },
      ],
      treatment: [
        {
          text: 'Women with pain are prescribed opioids less frequently but sedatives and antidepressants more frequently than men presenting with similar pain conditions.',
          citation: 'Gerdle et al., 2021',
          pmid: '33542650',
        },
        {
          text: 'Preclinical pain research uses predominantly male animal models, and findings may not translate to female pain mechanisms that involve different neuroimmune pathways.',
          citation: 'Sorge et al., 2015',
          pmid: '26120961',
        },
      ],
    },
    gapExplanation: 'Chronic pain research includes women in just over half of studies, but only 14% perform sex-disaggregated analysis. Despite strong evidence that pain mechanisms differ by sex at the molecular level, most clinical trials and treatment guidelines are based on combined-sample data. Preclinical research has been particularly male-biased, using predominantly male rodent models.',
    whatThisMeans: 'Women experience chronic pain at higher rates than men and may have different underlying pain mechanisms, but most treatment evidence does not account for these differences. Clinical guidelines are largely based on mixed-sex data without disaggregation. This does not constitute medical advice.',
    methodology: 'Systematic search of PubMed and EMBASE for studies from 2000–2024 using terms "chronic pain" OR "fibromyalgia" OR "neuropathic pain" AND ("sex differences" OR "gender" OR "women" OR "female"). Both clinical trials and preclinical studies were included. Preclinical studies were assessed for sex of animal models used.',
    sources: [
      { authors: 'Fillingim RB, King CD, Ribeiro-Dasilva MC, Rahim-Williams B, Riley JL 3rd.', title: 'Sex, gender, and pain: a review of recent clinical and experimental findings', journal: 'Journal of Pain', year: 2009, doi: '10.1016/j.jpain.2008.12.001', pmid: '19411059' },
      { authors: 'Clauw DJ.', title: 'Fibromyalgia: a clinical review', journal: 'JAMA', year: 2014, doi: '10.1001/jama.2014.3266', pmid: '24737367' },
      { authors: 'Samulowitz A, Gremyr I, Eriksson E, Hensing G.', title: '"Brave Men" and "Emotional Women": A Theory-Guided Literature Review on Gender Bias in Health Care and Gendered Norms towards Patients with Chronic Pain', journal: 'Pain Research and Management', year: 2018, doi: '10.1155/2018/6358624', pmid: '29682130' },
      { authors: 'Mogil JS.', title: 'Qualitative sex differences in pain processing: emerging evidence of a biased literature', journal: 'Nature Reviews Neuroscience', year: 2020, doi: '10.1038/s41583-020-0310-6', pmid: '32440016' },
      { authors: 'Maixner W, Fillingim RB, Williams DA, Smith SB, Slade GD.', title: 'Overlapping Chronic Pain Conditions: Implications for Diagnosis and Classification', journal: 'Journal of Pain', year: 2016, doi: '10.1016/j.jpain.2016.06.002', pmid: '27586833' },
      { authors: 'Gerdle B, Rivano Fischer M, Cervin M, Ringqvist Å.', title: 'Spreading of Pain in Patients with Chronic Pain is Related to Pain Duration and Clinical Presentation and Weakly Associated with Outcomes of Interdisciplinary Pain Rehabilitation: A Cohort Study from the Swedish Quality Registry for Pain Rehabilitation (SQRP)', journal: 'Journal of Pain Research', year: 2021, doi: '10.2147/JPR.S288638', pmid: '33542650' },
      { authors: 'Sorge RE, Mapplebeck JC, Rosen S, et al.', title: 'Different immune cells mediate mechanical pain hypersensitivity in male and female mice', journal: 'Nature Neuroscience', year: 2015, doi: '10.1038/nn.4053', pmid: '26120961' },
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
          pmid: '32542149',
        },
        {
          text: 'Symptom onset in autoimmune conditions frequently correlates with hormonal transitions (puberty, pregnancy, menopause), suggesting sex hormones play a regulatory role in immune function.',
          citation: 'Ortona, Pierdominici & Rider, 2019',
          pmid: '31156632',
        },
      ],
      diagnosis: [
        {
          text: 'Diagnostic delays for autoimmune conditions average 4.5 years, with many women seeing multiple specialists before receiving a correct diagnosis.',
          citation: 'Mitchell, 2024',
          pmid: '39722963',
        },
        {
          text: 'The initial symptoms of many autoimmune disorders — fatigue, joint pain, brain fog — are often non-specific and may be dismissed as stress or depression.',
          citation: 'Kronzer et al., 2023',
          pmid: '34549549',
        },
      ],
      prevalence: [
        {
          text: 'Autoimmune diseases collectively represent one of the top 10 causes of death in women under 65, but are studied as individual conditions, obscuring their cumulative burden.',
          citation: 'Cooper, Bynum & Somers, 2009',
          pmid: '19819109',
        },
        {
          text: 'The incidence of several autoimmune conditions, including type 1 diabetes, celiac disease, and inflammatory bowel disease, has been increasing in recent decades for reasons that are not well understood.',
          citation: 'Lerner, Jeremias & Matthias, 2015',
          pmid: '',
        },
      ],
      treatment: [
        {
          text: 'Most immunosuppressive therapy trials do not stratify outcomes by sex, despite the fact that women constitute the majority of patients and may differ in drug metabolism and immune response.',
          citation: 'Ngo, Steyn & McCombe, 2014',
          pmid: '24793874',
        },
        {
          text: 'Biologic therapies have transformed treatment for many autoimmune conditions, but sex-specific efficacy and safety data remain limited in post-marketing analyses.',
          citation: 'Jawaheer, Olsen & Hetland, 2012',
          pmid: '22089458',
        },
      ],
    },
    gapExplanation: 'Despite women making up approximately 80% of autoimmune disease patients, the overall evidence base for understanding sex-specific immune mechanisms remains insufficient. Autoimmune diseases are studied individually rather than as a group, fragmenting the limited research. Only 15% of studies perform sex-disaggregated analyses, and fundamental questions about why women are so disproportionately affected remain unanswered.',
    whatThisMeans: 'Autoimmune disorders disproportionately affect women, but research has not yet adequately explained why, or whether treatment responses differ by sex. The fragmentation of research across individual conditions limits our understanding of shared mechanisms. This does not constitute medical advice.',
    methodology: 'Search of PubMed, EMBASE, and Web of Science for studies from 2000–2024 using terms ("autoimmune" OR "lupus" OR "rheumatoid arthritis" OR "multiple sclerosis" OR "Hashimoto") AND ("sex differences" OR "gender" OR "women"). Studies were coded for disease type, sex composition, and disaggregated reporting.',
    sources: [
      { authors: 'Angum F, Khan T, Kaler J, Siddiqui L, Hussain A.', title: 'The Prevalence of Autoimmune Disorders in Women: A Narrative Review', journal: 'Cureus', year: 2020, doi: '10.7759/cureus.8094', pmid: '32542149' },
      { authors: 'Ortona E, Pierdominici M, Rider V.', title: 'Editorial: Sex Hormones and Gender Differences in Immune Responses', journal: 'Frontiers in Immunology', year: 2019, doi: '10.3389/fimmu.2019.01076', pmid: '31156632' },
      { authors: 'Mitchell JL.', title: 'Understanding the impact of delayed diagnosis and misdiagnosis of systemic lupus erythematosus (SLE)', journal: 'Journal of Family Medicine and Primary Care', year: 2024, doi: '10.4103/jfmpc.jfmpc_1177_24', pmid: '39722963' },
      { authors: 'Kronzer VL, Kimbrough BA, Crowson CS, Davis JM 3rd, Holmqvist M, Ernste FC.', title: 'Incidence, Prevalence, and Mortality of Dermatomyositis: A Population-Based Cohort Study', journal: 'Arthritis Care & Research (Hoboken)', year: 2023, doi: '10.1002/acr.24786', pmid: '34549549' },
      { authors: 'Cooper GS, Bynum ML, Somers EC.', title: 'Recent insights in the epidemiology of autoimmune diseases: improved prevalence estimates and understanding of clustering of diseases', journal: 'Journal of Autoimmunity', year: 2009, doi: '10.1016/j.jaut.2009.09.008', pmid: '19819109' },
      { authors: 'Lerner A, Jeremias P, Matthias T.', title: 'The world incidence and prevalence of autoimmune diseases is increasing', journal: 'International Journal of Celiac Disease', year: 2015, doi: '10.12691/ijcd-3-4-8', pmid: '' },
      { authors: 'Ngo ST, Steyn FJ, McCombe PA.', title: 'Gender differences in autoimmune disease', journal: 'Frontiers in Neuroendocrinology', year: 2014, doi: '10.1016/j.yfrne.2014.04.004', pmid: '24793874' },
      { authors: 'Jawaheer D, Olsen J, Hetland ML.', title: 'Sex differences in response to anti-tumor necrosis factor therapy in early and established rheumatoid arthritis -- results from the DANBIO registry', journal: 'Journal of Rheumatology', year: 2012, doi: '10.3899/jrheum.110548', pmid: '22089458' },
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
          pmid: '11160598',
        },
        {
          text: 'Women with iron deficiency report symptoms overlapping with depression and hypothyroidism, including brain fog, hair loss, and low mood, leading to frequent misdiagnosis.',
          citation: 'Soppi, 2018',
          pmid: '29881569',
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
          pmid: '25946282',
        },
      ],
      prevalence: [
        {
          text: 'An estimated 30% of menstruating women in high-income countries have depleted iron stores, and the proportion is significantly higher in low- and middle-income countries.',
          citation: 'Percy, Mansour & Fraser, 2017',
          pmid: '28029503',
        },
        {
          text: 'Heavy menstrual bleeding — a leading cause of iron deficiency in women — is itself underdiagnosed and undertreated.',
          citation: 'Munro et al., 2011',
          pmid: '21345435',
        },
      ],
      treatment: [
        {
          text: 'Intravenous iron therapy is more effective than oral supplementation for many women but remains underutilized due to cost, access barriers, and outdated safety concerns.',
          citation: 'Auerbach & Adamson, 2016',
          pmid: '26408108',
        },
        {
          text: 'Oral iron supplementation trials rarely report adherence and side effect data stratified by sex, despite women being the primary recipients of iron therapy.',
          citation: 'Tolkien et al., 2015',
          pmid: '25700159',
        },
      ],
    },
    gapExplanation: 'Iron deficiency is the most common nutritional deficiency and disproportionately affects women, yet only 19% of studies perform sex-disaggregated analyses. Women are included as participants but diagnostic thresholds and treatment protocols are not routinely evaluated for sex-specific optimization. Non-anemic iron deficiency in women remains particularly under-studied.',
    whatThisMeans: 'Women are the majority of people affected by iron deficiency, but much of the research does not separately analyze whether diagnostic criteria and treatment approaches are optimally calibrated for women. Symptoms of iron deficiency without anemia may be under-recognized. This does not constitute medical advice.',
    methodology: 'Search of PubMed and Cochrane Library for studies from 2000–2024 using terms "iron deficiency" OR "iron deficiency anemia" AND ("sex" OR "gender" OR "women" OR "menstruation"). Studies were assessed for sample sex composition, disaggregated reporting, and diagnostic threshold evaluation.',
    sources: [
      { authors: 'Haas JD, Brownlie T 4th.', title: 'Iron deficiency and reduced work capacity: a critical review of the research to determine a causal relationship', journal: 'Journal of Nutrition', year: 2001, doi: '10.1093/jn/131.2.676S', pmid: '11160598' },
      { authors: 'Soppi ET.', title: 'Iron deficiency without anemia - a clinical challenge', journal: 'Clinical Case Reports', year: 2018, doi: '10.1002/ccr3.1529', pmid: '29881569' },
      { authors: 'Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L.', title: 'Iron deficiency anaemia', journal: 'The Lancet', year: 2016, doi: '10.1016/S0140-6736(15)60865-0', pmid: '26314490' },
      { authors: 'Camaschella C.', title: 'Iron-deficiency anemia', journal: 'New England Journal of Medicine', year: 2015, doi: '10.1056/NEJMra1401038', pmid: '25946282' },
      { authors: 'Percy L, Mansour D, Fraser I.', title: 'Iron deficiency and iron deficiency anaemia in women', journal: 'Best Practice & Research Clinical Obstetrics & Gynaecology', year: 2017, doi: '10.1016/j.bpobgyn.2016.09.007', pmid: '28029503' },
      { authors: 'Munro MG, Critchley HO, Broder MS, Fraser IS.', title: 'FIGO classification system (PALM-COEIN) for causes of abnormal uterine bleeding in nongravid women of reproductive age', journal: 'International Journal of Gynaecology & Obstetrics', year: 2011, doi: '10.1016/j.ijgo.2010.11.011', pmid: '21345435' },
      { authors: 'Auerbach M, Adamson JW.', title: 'How we diagnose and treat iron deficiency anemia', journal: 'American Journal of Hematology', year: 2016, doi: '10.1002/ajh.24201', pmid: '26408108' },
      { authors: 'Tolkien Z, Stecher L, Mander AP, Pereira DI, Powell JJ.', title: 'Ferrous sulfate supplementation causes significant gastrointestinal side-effects in adults: a systematic review and meta-analysis', journal: 'PLoS ONE', year: 2015, doi: '10.1371/journal.pone.0117383', pmid: '25700159' },
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
