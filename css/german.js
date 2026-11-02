const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, LevelFormat, convertInchesToTwip,
  PageBreak, VerticalAlign
} = require("docx");

// ---------- COLORS ----------
const NAVY = "1F3864";
const GOLD = "B8860B";
const LIGHTBLUE = "DCE6F1";
const LIGHTGOLD = "FBF2DA";
const LIGHTGREEN = "E2F0D9";
const LIGHTRED = "FCE4E4";
const GREY = "F2F2F2";

// ---------- BASIC HELPERS ----------
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    border: { bottom: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 12 } },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 32 })]
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, color: NAVY, size: 26 })]
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, color: GOLD, size: 23 })]
  });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, ...opts })]
  });
}
function pRuns(runs, opts = {}) {
  return new Paragraph({ spacing: { after: 120 }, ...opts, children: runs });
}
function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, ...opts })]
  });
}
function numbered(text, ref = "num-list") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text })]
  });
}
function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// A coloured callout box (single-cell shaded table)
function box(label, text, shade = LIGHTGOLD, borderColor = GOLD) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
      left: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
      right: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: shade },
            margins: { top: 100, bottom: 100, left: 150, right: 150 },
            children: [
              new Paragraph({ children: [new TextRun({ text: label, bold: true, color: borderColor, size: 21 })] }),
              new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text, size: 21 })] })
            ]
          })
        ]
      })
    ]
  });
}
function spacer(h = 100) { return new Paragraph({ spacing: { after: h }, children: [] }); }

// Generic data table
function dataTable(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const mkCell = (text, isHeader) => new TableCell({
    width: { size: text._w, type: WidthType.DXA },
    shading: isHeader ? { type: ShadingType.CLEAR, fill: NAVY } : { type: ShadingType.CLEAR, fill: "FFFFFF" },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: text._t, bold: isHeader, color: isHeader ? "FFFFFF" : "000000", size: 20 })]
    })]
  });
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((t, i) => mkCell({ _t: t, _w: widths[i] }, true))
  });
  const bodyRows = rows.map((r, ri) => new TableRow({
    children: r.map((t, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: ri % 2 === 0 ? "FFFFFF" : GREY },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text: t, size: 20 })] })]
    }))
  }));
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...bodyRows]
  });
}

// Examples list: array of [German, English]
function examplesList(examples) {
  return examples.map((e, i) => new Paragraph({
    numbering: { reference: "num-list", level: 0 },
    spacing: { after: 90 },
    children: [
      new TextRun({ text: e[0], italics: true, color: NAVY, bold: true }),
      new TextRun({ text: "  —  " + e[1], color: "444444" })
    ]
  }));
}

function exerciseItems(items) {
  return items.map(t => new Paragraph({
    numbering: { reference: "num-list", level: 0 },
    spacing: { after: 70 },
    children: [new TextRun({ text: t })]
  }));
}

function answerKey(answers) {
  return [
    new Paragraph({
      spacing: { before: 100, after: 60 },
      children: [new TextRun({ text: "Answer Key", bold: true, color: GOLD, italics: true, size: 21 })]
    }),
    ...answers.map((a, i) => new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: `${i + 1}. ${a}`, size: 20, color: "333333" })]
    }))
  ];
}

module.exports = {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, AlignmentType, LevelFormat, convertInchesToTwip,
  PageBreak, VerticalAlign,
  NAVY, GOLD, LIGHTBLUE, LIGHTGOLD, LIGHTGREEN, LIGHTRED, GREY,
  h1, h2, h3, p, pRuns, bullet, numbered, pageBreak, box, spacer, dataTable, examplesList, exerciseItems, answerKey
};
const {
  Paragraph, TextRun, h1, h2, h3, p, bullet, numbered, box, spacer, dataTable,
  examplesList, exerciseItems, answerKey, GOLD, LIGHTBLUE, LIGHTGOLD, LIGHTGREEN, LIGHTRED
} = require("./build");

function topic1() {
  const out = [];
  out.push(h1("1. Irrealer Vergleichssatz — als ob + Konjunktiv II"));

  out.push(h2("1.1 Definition"));
  out.push(p("An unreal comparison (irrealer Vergleichssatz) is used to describe how something appears, sounds, feels, or behaves, compared to a situation that is NOT actually true — or whose truth the speaker cannot confirm. In English this is the 'as if' / 'as though' construction."));
  out.push(p("Because the comparison describes something imagined or contrary to reality, German requires the Konjunktiv II (subjunctive II) mood in the clause, never the normal indicative."));

  out.push(h2("1.2 Intuition"));
  out.push(p("Think of 'als ob' as a small stage direction: the speaker is saying 'picture this — even though it isn't really happening.' Compare:"));
  out.push(bullet("Er ist müde. (fact — indicative)"));
  out.push(bullet("Er sieht aus, als ob er müde wäre. (comparison to an imagined state — Konjunktiv II)"));
  out.push(p("The second sentence doesn't claim he IS tired — only that his appearance resembles that of a tired person."));

  out.push(h2("1.3 Why This Grammar Exists"));
  out.push(p("German marks the difference between 'this is real' and 'this is a hypothetical mental comparison' directly on the verb, instead of relying on context the way English mostly does. This keeps the sentence unambiguous: the listener instantly knows the comparison is not asserted as fact."));

  out.push(h2("1.4 Structure & Word Order"));
  out.push(box("Formula", "Hauptsatz + als ob + Subjekt ... Verb (Konjunktiv II) [Satzende]\nHauptsatz + als + Verb (Konjunktiv II) + Subjekt ... [Verb-zweit]", LIGHTGOLD, GOLD));
  out.push(p("There are two accepted patterns:"));
  out.push(bullet("Pattern A — als ob: normal subordinate-clause word order. The conjugated verb goes to the very END of the clause."));
  out.push(bullet("Pattern B — als (without ob): the conjugated verb jumps immediately after 'als', producing verb-second order in the rest of the clause. This is more common in spoken and literary German."));
  out.push(h3("Word Order Diagram"));
  out.push(p("Er tut,  als ob  er  krank  wäre.        (verb at the end)", { font: "Courier New" }));
  out.push(p("Er tut,  als       wäre  er  krank.       (verb right after 'als')", { font: "Courier New" }));

  out.push(h2("1.5 Konjunktiv II — Complete Conjugation Tables"));
  out.push(p("Konjunktiv II is built from the Präteritum stem for irregular/strong verbs, with an umlaut added where possible, plus subjunctive endings (-e, -est, -e, -en, -et, -en)."));

  const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
  const verbs = {
    "sein": ["wäre", "wärst", "wäre", "wären", "wärt", "wären"],
    "haben": ["hätte", "hättest", "hätte", "hätten", "hättet", "hätten"],
    "werden": ["würde", "würdest", "würde", "würden", "würdet", "würden"],
    "können": ["könnte", "könntest", "könnte", "könnten", "könntet", "könnten"],
    "müssen": ["müsste", "müsstest", "müsste", "müssten", "müsstet", "müssten"],
    "dürfen": ["dürfte", "dürftest", "dürfte", "dürften", "dürftet", "dürften"],
    "wollen": ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
    "sollen": ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"]
  };
  Object.keys(verbs).forEach(v => {
    out.push(h3(v.toUpperCase() + " — Konjunktiv II"));
    out.push(dataTable(
      ["Pronomen", "Form"],
      pronouns.map((pr, i) => [pr, verbs[v][i]]),
      [3000, 3000]
    ));
    out.push(spacer(150));
  });

  out.push(h2("1.6 würde + Infinitiv"));
  out.push(p("Most weak (regular) verbs have a Konjunktiv II form that is identical to the simple past (Präteritum), which sounds old-fashioned or confusing (e.g. 'machte' can mean both 'made' and Konjunktiv II 'would make'). To avoid this ambiguity, spoken and everyday written German prefers the substitute construction:"));
  out.push(box("Formula", "würde (Konjunktiv II of werden) + Infinitiv (at the end of the clause)", LIGHTGOLD, GOLD));
  out.push(p("Example: Sie tut, als ob sie alles verstehen würde. (NOT: ...als ob sie alles verstünde — grammatically correct but very formal/rare.)"));
  out.push(p("Rule of thumb: sein, haben, werden, and the modal verbs almost always use their own Konjunktiv II form. Nearly everything else uses würde + Infinitiv."));

  out.push(h2("1.7 Difference from a Normal Comparison"));
  out.push(dataTable(
    ["Normal comparison (wie)", "Unreal comparison (als ob)"],
    [
      ["States a real, factual similarity", "Compares to something imagined/untrue"],
      ["Uses the indicative mood", "Uses Konjunktiv II"],
      ["Er singt, wie ein Profi singt.", "Er singt, als ob er ein Profi wäre."]
    ],
    [4500, 4500]
  ));

  out.push(h2("1.8 Common Mistakes"));
  out.push(box("Common Mistake", "Using the indicative after 'als ob': ✗ Er tut, als ob er krank ist. ✓ Er tut, als ob er krank wäre.", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Forgetting to move the verb to second position when 'ob' is dropped: ✗ Er tut, als er krank wäre. ✓ Er tut, als wäre er krank.", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Using Präteritum forms of weak verbs instead of würde + Infinitiv in speech: prefer 'als ob er lachen würde' over the rarely-used 'als ob er lachte'.", LIGHTRED, "C0392B"));

  out.push(h2("1.9 Memory Tricks"));
  out.push(box("Remember", "'ob' pushes the verb to the END (like dass). Drop 'ob' → the verb jumps back to be SECOND, right after 'als'.", LIGHTGREEN, "2E7D32"));
  out.push(box("Remember", "If you're not sure of a verb's own Konjunktiv II form, 'würde + infinitive' is almost always a safe, natural-sounding choice.", LIGHTGREEN, "2E7D32"));

  out.push(h2("1.10 Short Summary"));
  out.push(p("als ob / als wenn / als (+Konj. II) express a comparison to something unreal. With 'ob' or 'wenn', the verb goes to the end; with bare 'als', the verb comes straight after 'als'. sein, haben, werden and modals use their own Konjunktiv II; most other verbs use würde + infinitive."));

  out.push(h2("1.11 Example Sentences"));
  out.push(examplesList([
    ["Er tut, als ob er krank wäre.", "He acts as if he were sick."],
    ["Sie sieht aus, als hätte sie geweint.", "She looks as if she had been crying."],
    ["Es scheint, als ob es gleich regnen würde.", "It seems as if it's about to rain."],
    ["Du redest, als ob du alles wüsstest.", "You talk as if you knew everything."],
    ["Er lief, als ob er vor jemandem fliehen würde.", "He ran as if he were fleeing from someone."],
    ["Sie lächelte, als wäre nichts passiert.", "She smiled as if nothing had happened."],
    ["Das Kind tat, als ob es schliefe.", "The child pretended to be asleep."],
    ["Er spricht Deutsch, als ob er ein Muttersprachler wäre.", "He speaks German as if he were a native speaker."],
    ["Sie behandelt mich, als wäre ich ein Fremder.", "She treats me as if I were a stranger."],
    ["Es sah aus, als ob das Haus leer stünde.", "It looked as if the house were empty."],
    ["Er benimmt sich, als ob er der Chef wäre.", "He behaves as if he were the boss."],
    ["Ich fühle mich, als ob ich fliegen könnte.", "I feel as if I could fly."],
    ["Sie tat so, als ob sie mich nicht kennen würde.", "She acted as if she didn't know me."],
    ["Er starrte mich an, als hätte er ein Gespenst gesehen.", "He stared at me as if he had seen a ghost."],
    ["Die Kinder schrien, als ob ein Löwe im Zimmer wäre.", "The children screamed as if a lion were in the room."]
  ]));

  out.push(h2("1.12 Exercises"));

  out.push(h3("Fill in the Blanks (use the correct Konjunktiv II form)"));
  out.push(exerciseItems([
    "Er tut, als ob er nichts ______ (wissen).",
    "Sie sieht aus, als ______ sie krank. (sein)",
    "Wir fühlten uns, als ob wir im Traum ______ (sein).",
    "Er spricht, als ob er alles ______ (verstehen — würde-Form).",
    "Du siehst aus, als ______ du die ganze Nacht nicht geschlafen. (haben)",
    "Sie lachte, als ob nichts ______ (passieren — würde-Form).",
    "Er rennt, als ______ ihn jemand. (verfolgen — würde-Form)",
    "Ihr redet, als ob ihr alle Antworten ______ (haben).",
    "Das Baby schläft, als ob es keine Sorgen ______ (haben).",
    "Sie tat so, als ______ sie den Brief nie bekommen. (haben)"
  ]));
  out.push(...answerKey([
    "wüsste", "wäre", "wären", "verstehen würde", "hättest", "passieren würde",
    "verfolge → würde ihn jemand verfolgen", "hätten", "hätte", "hätte"
  ]));

  out.push(h3("Sentence Transformation (als ob ↔ bare als)"));
  out.push(exerciseItems([
    "Er tut, als ob er schliefe. → (use bare 'als')",
    "Sie sieht aus, als wäre sie traurig. → (use 'als ob')",
    "Es klingt, als ob er wütend wäre. → (use bare 'als')",
    "Du tust, als hättest du nichts gehört. → (use 'als ob')",
    "Er benimmt sich, als ob er reich wäre. → (use bare 'als')",
    "Sie schaut, als würde sie mir nicht glauben. → (use 'als ob')"
  ]));
  out.push(...answerKey([
    "Er tut, als schliefe er.",
    "Sie sieht aus, als ob sie traurig wäre.",
    "Es klingt, als wäre er wütend.",
    "Du tust, als ob du nichts gehört hättest.",
    "Er benimmt sich, als wäre er reich.",
    "Sie schaut, als ob sie mir nicht glauben würde."
  ]));

  out.push(h3("Translation: English → German"));
  out.push(exerciseItems([
    "He acts as if he were the teacher.",
    "It looks as if it will snow.",
    "She talks as if she had seen the film.",
    "They behave as if nothing had happened."
  ]));
  out.push(...answerKey([
    "Er tut, als ob er der Lehrer wäre.",
    "Es sieht aus, als ob es schneien würde.",
    "Sie redet, als ob sie den Film gesehen hätte.",
    "Sie benehmen sich, als ob nichts passiert wäre."
  ]));

  out.push(h3("Translation: German → English"));
  out.push(exerciseItems([
    "Er grinste, als hätte er ein Geheimnis.",
    "Sie sprechen, als ob sie sich schon lange kennen würden.",
    "Es fühlt sich an, als wäre die Zeit stehen geblieben.",
    "Du tust, als ob dich das nicht interessieren würde."
  ]));
  out.push(...answerKey([
    "He grinned as if he had a secret.",
    "They speak as if they had known each other for a long time.",
    "It feels as if time had stood still.",
    "You act as if that didn't interest you."
  ]));

  out.push(h3("Error Correction"));
  out.push(exerciseItems([
    "Er tut, als ob er krank ist.",
    "Sie sieht aus, als sie müde wäre.",
    "Du redest, als du alles wusstest.",
    "Es klingt, als ob er wütend ist."
  ]));
  out.push(...answerKey([
    "Er tut, als ob er krank wäre. (indicative → Konjunktiv II)",
    "Sie sieht aus, als wäre sie müde. (verb must move next to 'als')",
    "Du redest, als ob du alles wüsstest. / Du redest, als wüsstest du alles.",
    "Es klingt, als ob er wütend wäre. (indicative → Konjunktiv II)"
  ]));

  return out;
}

module.exports = topic1;
const {
  h1, h2, h3, p, bullet, box, spacer, dataTable, examplesList, exerciseItems, answerKey,
  GOLD, LIGHTGOLD, LIGHTGREEN, LIGHTRED
} = require("./build");

function topic2() {
  const out = [];
  out.push(h1("2. Genitiv & Genitiversatz"));

  out.push(h2("2.1 What Is the Genitive Case?"));
  out.push(p("The Genitive is the fourth German case. It marks the noun that POSSESSES or is closely associated with another noun — roughly the equivalent of English 's or 'of'. It also appears after certain prepositions and fixed expressions."));

  out.push(h2("2.2 Why German Uses the Genitive"));
  out.push(p("German case endings let word order stay flexible while the grammar itself still shows which noun belongs to which. The Genitive specifically flags a possession/belonging relationship directly on the article and (for some nouns) the noun ending, without needing a separate possessive particle like English 's."));

  out.push(h2("2.3 How Possession Works"));
  out.push(p("In the Genitive, the 'owner' noun phrase normally follows the noun it possesses, and its article/adjective endings change to Genitive forms:"));
  out.push(bullet("das Auto des Mannes — the man's car (literally: the car of-the man)"));
  out.push(bullet("die Farbe der Wand — the colour of the wall"));

  out.push(h2("2.4 Genitive vs. 'von'"));
  out.push(p("'von + Dativ' is a common substitute for the Genitive, especially in speech. Both can express possession, but they are not always interchangeable — see Genitiversatz below (2.7–2.9)."));

  out.push(h2("2.5 Article Tables in the Genitive"));

  out.push(h3("Definite Articles (der/die/das)"));
  out.push(dataTable(
    ["", "Maskulin", "Feminin", "Neutrum", "Plural"],
    [["Nominativ", "der", "die", "das", "die"],
     ["Akkusativ", "den", "die", "das", "die"],
     ["Dativ", "dem", "der", "dem", "den"],
     ["Genitiv", "des", "der", "des", "der"]],
    [2200, 1700, 1700, 1700, 1700]
  ));
  out.push(spacer(150));

  out.push(h3("Indefinite Articles (ein/eine/ein)"));
  out.push(dataTable(
    ["", "Maskulin", "Feminin", "Neutrum"],
    [["Nominativ", "ein", "eine", "ein"],
     ["Akkusativ", "einen", "eine", "ein"],
     ["Dativ", "einem", "einer", "einem"],
     ["Genitiv", "eines", "einer", "eines"]],
    [2200, 2300, 2300, 2300]
  ));
  out.push(spacer(150));

  out.push(h3("Negative Article (kein)"));
  out.push(dataTable(
    ["", "Maskulin", "Feminin", "Neutrum", "Plural"],
    [["Nominativ", "kein", "keine", "kein", "keine"],
     ["Akkusativ", "keinen", "keine", "kein", "keine"],
     ["Dativ", "keinem", "keiner", "keinem", "keinen"],
     ["Genitiv", "keines", "keiner", "keines", "keiner"]],
    [2200, 1700, 1700, 1700, 1700]
  ));
  out.push(spacer(150));

  out.push(h3("Possessive Articles (example: mein)"));
  out.push(dataTable(
    ["", "Maskulin", "Feminin", "Neutrum", "Plural"],
    [["Nominativ", "mein", "meine", "mein", "meine"],
     ["Akkusativ", "meinen", "meine", "mein", "meine"],
     ["Dativ", "meinem", "meiner", "meinem", "meinen"],
     ["Genitiv", "meines", "meiner", "meines", "meiner"]],
    [2200, 1700, 1700, 1700, 1700]
  ));
  out.push(p("All other possessives (dein, sein, ihr, unser, euer, ihr/Ihr) follow the exact same ending pattern as 'mein'."));

  out.push(box("Pattern to Memorise", "der → des   |   ein → eines   |   die → der   |   eine → einer   |   das → des   |   die (Pl.) → der", LIGHTGOLD, GOLD));

  out.push(h2("2.6 Genitive Noun Endings"));
  out.push(p("In the Genitive singular, masculine and neuter nouns usually add -s or -es to the noun itself, IN ADDITION to changing the article. Feminine and plural nouns never take an ending in the Genitive."));
  out.push(dataTable(
    ["Rule", "Example", "Genitive"],
    [
      ["Most masc./neut. nouns → add -s", "der Mann / das Auto", "des Mannes* / des Autos"],
      ["Nouns ending in -s, -ß, -x, -z, -sch, or one-syllable nouns → add -es", "das Kind / der Fluss", "des Kindes / des Flusses"],
      ["Feminine nouns → NO ending", "die Frau / die Stadt", "der Frau / der Stadt"],
      ["Plural nouns (any gender) → NO extra ending on noun", "die Kinder", "der Kinder"]
    ],
    [3200, 2800, 3000]
  ));
  out.push(p("*Both -s and -es are technically possible for many nouns (des Mannes / des Manns), but the fuller -es form is standard in formal writing."));

  out.push(h3("Exceptions: 'weak' (n-declension) masculine nouns"));
  out.push(p("A special group of masculine nouns (often referring to people/animals: der Junge, der Student, der Mensch, der Herr, der Name) add -n or -en in EVERY case except the Nominative singular — including the Genitive, where they do NOT add -s."));
  out.push(dataTable(
    ["Nominativ", "Genitiv"],
    [["der Student", "des Studenten"], ["der Junge", "des Jungen"], ["der Herr", "des Herrn"], ["der Name", "des Namens*"]],
    [4500, 4500]
  ));
  out.push(p("*'der Name' is a special mixed case: des Namens (adds -ns)."));

  out.push(h2("2.7 Genitiversatz — the 'von' Substitute"));
  out.push(box("Formula", "Genitiv  →  von + Dativ", LIGHTGOLD, GOLD));
  out.push(p("Genitiversatz means replacing a Genitive construction with 'von + Dativ'. This is extremely common in spoken German, where the Genitive can sound stiff or is dying out for certain uses."));
  out.push(p("des Mannes Auto → das Auto von dem Mann → colloquially: das Auto vom Mann (von + dem = vom)"));

  out.push(h2("2.8 When Both Are Acceptable"));
  out.push(bullet("With most concrete nouns that have an article: die Tasche der Frau = die Tasche von der Frau (Genitiv slightly more formal/written)."));
  out.push(bullet("After quantity words like 'viele', 'einige', 'ein paar' + plural noun: viele der Studenten = viele von den Studenten."));

  out.push(h2("2.9 When Genitive Is Preferred / When 'von' Sounds More Natural"));
  out.push(dataTable(
    ["Genitiv preferred", "'von' preferred / required"],
    [
      ["Formal writing, essays, news, legal text", "Casual spoken German"],
      ["With a proper name: Annas Buch / das Buch Annas", "With nouns that have NO article (plural, uncountable): der Duft von Blumen (not: der Duft Blumen)"],
      ["Fixed expressions: die Kraft des Willens", "To avoid a double Genitive / awkward stacking: das Ende von Peters Geschichte"],
      ["After Genitive prepositions: während des Sommers", "With most personal pronouns as possessor: eine Freundin von mir (never: eine Freundin meiner)"]
    ],
    [4300, 4700]
  ));

  out.push(h2("2.10 Common Mistakes"));
  out.push(box("Common Mistake", "Forgetting the noun ending: ✗ das Auto des Mann ✓ das Auto des Mannes", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Adding -s to weak (n-declension) nouns: ✗ des Studentens ✓ des Studenten", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Using 'von' + Genitive article instead of Dativ: ✗ von des Mannes ✓ von dem Mann", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Using Genitive with an article-less plural noun: ✗ der Duft Blumen ✓ der Duft von Blumen", LIGHTRED, "C0392B"));

  out.push(h2("2.11 Memory Tricks"));
  out.push(box("Remember", "'des/eines' always signals masculine or neuter Genitive — and the noun itself usually echoes with -s/-es, like a little rhyme: des Mannes, des Kindes.", LIGHTGREEN, "2E7D32"));
  out.push(box("Remember", "No article on the noun after it? Don't use Genitive — reach for 'von'.", LIGHTGREEN, "2E7D32"));

  out.push(h2("2.12 Short Summary"));
  out.push(p("Genitive = possession/'of'. Masculine & neuter articles → des/eines (+ noun -s/-es); feminine & plural articles → der (no noun ending). Weak masculine nouns take -n/-en, never -s. 'von + Dativ' replaces the Genitive in speech and whenever there's no article to carry the case ending."));

  out.push(h2("2.13 Example Sentences (30)"));
  out.push(examplesList([
    ["Das ist das Auto des Lehrers.", "That is the teacher's car."],
    ["Die Farbe der Wand gefällt mir.", "I like the colour of the wall."],
    ["Der Titel des Buches ist interessant.", "The title of the book is interesting."],
    ["Das Ende des Films war überraschend.", "The end of the film was surprising."],
    ["Die Mutter des Kindes ist Ärztin.", "The child's mother is a doctor."],
    ["Der Chef der Firma reist viel.", "The company's boss travels a lot."],
    ["Das ist die Tasche meiner Schwester.", "That is my sister's bag."],
    ["Der Preis des Autos ist hoch.", "The price of the car is high."],
    ["Die Fenster des Hauses sind groß.", "The house's windows are big."],
    ["Der Name des Studenten steht auf der Liste.", "The student's name is on the list."],
    ["Die Bedeutung des Wortes ist unklar.", "The meaning of the word is unclear."],
    ["Der Rand des Tisches ist scharf.", "The edge of the table is sharp."],
    ["Die Stimme der Sängerin ist wunderschön.", "The singer's voice is beautiful."],
    ["Das Dach des Gebäudes ist rot.", "The building's roof is red."],
    ["Der Erfolg des Projekts hängt von uns ab.", "The project's success depends on us."],
    ["Die Kinder der Nachbarn spielen im Garten.", "The neighbours' children are playing in the garden."],
    ["Das Auto vom Mann ist neu.", "The man's car is new. (Genitiversatz)"],
    ["Der Duft von Blumen erfüllt den Raum.", "The scent of flowers fills the room."],
    ["Eine Freundin von mir kommt aus Berlin.", "A friend of mine is from Berlin."],
    ["Während des Sommers reisen wir viel.", "During the summer we travel a lot."],
    ["Trotz des Regens gingen wir spazieren.", "Despite the rain, we went for a walk."],
    ["Wegen des Staus kamen wir zu spät.", "Because of the traffic jam, we arrived late."],
    ["Anfang des Jahres beginnt das neue Projekt.", "At the beginning of the year, the new project starts."],
    ["Die Werke Goethes sind weltberühmt.", "Goethe's works are world-famous."],
    ["Annas Zimmer ist immer aufgeräumt.", "Anna's room is always tidy."],
    ["Der Direktor der Schule hielt eine Rede.", "The school's principal gave a speech."],
    ["Trotz seines Fleißes bestand er die Prüfung nicht.", "Despite his diligence, he did not pass the exam."],
    ["Der Wert dieses Gemäldes ist enorm.", "The value of this painting is enormous."],
    ["Innerhalb eines Jahres wuchs das Unternehmen stark.", "Within a year, the company grew a lot."],
    ["Die Wurzel des Problems liegt tiefer.", "The root of the problem lies deeper."]
  ]));

  out.push(h2("2.14 Exercises"));

  out.push(h3("Fill in the Blanks (correct Genitive article/ending)"));
  out.push(exerciseItems([
    "Das ist das Buch ___ Lehrerin. (die)",
    "Die Farbe ___ Auto___ ist blau. (das Auto)",
    "Der Name ___ Student___ ist mir unbekannt. (der Student)",
    "Das Ende ___ Geschichte war traurig. (die)",
    "Wegen ___ Wetter___ bleiben wir zu Hause. (das Wetter)",
    "Die Mutter ___ Kind___ ist Lehrerin. (das Kind)",
    "Trotz ___ Problem___ blieb er ruhig. (das Problem)",
    "Der Titel ___ Film___ ist lustig. (der Film)",
    "Das Zimmer ___ Junge___ ist unordentlich. (der Junge)",
    "Die Farbe ___ Blumen gefällt mir. (von + die Blumen, Plural)"
  ]));
  out.push(...answerKey([
    "der (der Lehrerin)", "des Autos", "des Studenten", "der Geschichte", "des Wetters",
    "des Kindes", "des Problems", "des Films", "des Jungen", "von den Blumen"
  ]));

  out.push(h3("Sentence Transformation (Genitiv ↔ von + Dativ)"));
  out.push(exerciseItems([
    "das Auto des Lehrers → (use 'von')",
    "die Tasche von der Frau → (use Genitiv)",
    "der Titel des Buches → (use 'von')",
    "das Haus vom Nachbarn → (use Genitiv)",
    "die Werke des Dichters → (use 'von')",
    "der Erfolg von dem Projekt → (use Genitiv)"
  ]));
  out.push(...answerKey([
    "das Auto vom Lehrer",
    "die Tasche der Frau",
    "der Titel vom Buch",
    "das Haus des Nachbarn",
    "die Werke vom Dichter",
    "der Erfolg des Projekts"
  ]));

  out.push(h3("Translation: English → German"));
  out.push(exerciseItems([
    "The colour of the car is black.",
    "The teacher's book is on the table.",
    "Because of the rain, we stayed home.",
    "A friend of mine lives in Munich."
  ]));
  out.push(...answerKey([
    "Die Farbe des Autos ist schwarz.",
    "Das Buch des Lehrers liegt auf dem Tisch.",
    "Wegen des Regens sind wir zu Hause geblieben.",
    "Eine Freundin von mir wohnt in München."
  ]));

  out.push(h3("Translation: German → English"));
  out.push(exerciseItems([
    "Die Bedeutung dieses Wortes ist mir nicht klar.",
    "Trotz des schlechten Wetters spielten die Kinder draußen.",
    "Der Name des Studenten stand nicht auf der Liste.",
    "Innerhalb eines Monats hatte er alles gelernt."
  ]));
  out.push(...answerKey([
    "The meaning of this word is not clear to me.",
    "Despite the bad weather, the children played outside.",
    "The student's name was not on the list.",
    "Within a month, he had learned everything."
  ]));

  out.push(h3("Error Correction"));
  out.push(exerciseItems([
    "Das ist das Auto des Mann.",
    "Der Name des Studentens steht hier.",
    "Der Duft der Blumen ist stark. (Blumen has no article)",
    "Von des Mannes Auto ist das."
  ]));
  out.push(...answerKey([
    "Das ist das Auto des Mannes. (noun needs -es)",
    "Der Name des Studenten steht hier. (weak noun, no extra -s)",
    "Der Duft von Blumen ist stark. (article-less plural → von)",
    "Von dem Mann ist das Auto. (von takes Dativ, not Genitiv)"
  ]));

  return out;
}

module.exports = topic2;
const {
  h1, h2, h3, p, bullet, box, spacer, dataTable, examplesList, exerciseItems, answerKey,
  GOLD, LIGHTGOLD, LIGHTGREEN, LIGHTRED
} = require("./build");

function topic3() {
  const out = [];
  out.push(h1("3. Konsekutiver Nebensatz — sodass / so ..., dass"));

  out.push(h2("3.1 Definition"));
  out.push(p("A consecutive clause (Konsekutivsatz) expresses the RESULT or CONSEQUENCE of something stated in the main clause. It answers the question 'with what result/consequence?'."));

  out.push(h2("3.2 Intuition"));
  out.push(p("If a causal clause (weil) answers 'why?', a consecutive clause answers 'so what happened as a result?'. Es regnete so stark, dass wir zu Hause blieben — the heavy rain is the cause, staying home is the consequence."));

  out.push(h2("3.3 sodass vs. so ..., dass"));
  out.push(dataTable(
    ["sodass", "so ..., dass"],
    [
      ["One word, placed at the start of the subordinate clause", "'so' sits inside the main clause (before an adjective/adverb), 'dass' starts the subordinate clause"],
      ["Connects the whole main clause to its result", "Emphasises the specific degree/intensity of one adjective or adverb"],
      ["Er war müde, sodass er einschlief.", "Er war so müde, dass er einschlief."]
    ],
    [4500, 4500]
  ));
  out.push(p("Both sentences mean almost the same thing, but 'so ..., dass' highlights HOW tired he was, while 'sodass' simply links cause and effect."));

  out.push(h2("3.4 Sentence Structure & Word Order"));
  out.push(box("Formula 1", "Hauptsatz , sodass + Subjekt ... Verb (Satzende)", LIGHTGOLD, GOLD));
  out.push(box("Formula 2", "Hauptsatz (mit so + Adjektiv/Adverb) , dass + Subjekt ... Verb (Satzende)", LIGHTGOLD, GOLD));
  out.push(h3("Word Order Diagram"));
  out.push(p("Es regnete stark,   sodass   wir   zu Hause   blieben.", { font: "Courier New" }));
  out.push(p("Es regnete so stark,   dass   wir   zu Hause   blieben.", { font: "Courier New" }));
  out.push(p("In both cases the conjugated verb of the subordinate clause (blieben) goes to the very end — standard subordinate-clause word order."));

  out.push(h2("3.5 Verb Position"));
  out.push(bullet("Main clause: normal verb-second word order."));
  out.push(bullet("Subordinate clause (after sodass / dass): verb moves to the final position."));
  out.push(bullet("With separable verbs, the prefix reattaches at the very end: ..., sodass er die Tür zumachte."));

  out.push(h2("3.6 Common Mistakes"));
  out.push(box("Common Mistake", "Splitting 'sodass' incorrectly: ✗ Er war müde, so dass er einschlief (as two words is an older, now less-preferred spelling; modern standard is 'sodass' as one word, though 'so dass' is not technically wrong).", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Forgetting to send the verb to the end: ✗ ..., sodass er machte die Tür zu. ✓ ..., sodass er die Tür zumachte.", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Placing 'so' incorrectly — 'so' must sit directly before the adjective/adverb it intensifies, not before the noun: ✗ Er hatte so einen Hunger, dass... (colloquial) vs. formal ✓ Er hatte einen so großen Hunger, dass...", LIGHTRED, "C0392B"));

  out.push(h2("3.7 Comparison Table"));
  out.push(dataTable(
    ["Feature", "sodass", "so ..., dass"],
    [
      ["Position", "Starts subordinate clause", "'so' in main clause + 'dass' starts subordinate clause"],
      ["Focus", "General result", "Degree/intensity of quality"],
      ["Formality", "Neutral, common in writing", "Very common in speech and writing alike"],
      ["Example", "Er lernte viel, sodass er die Prüfung bestand.", "Er lernte so viel, dass er die Prüfung bestand."]
    ],
    [2200, 3400, 3400]
  ));

  out.push(h2("3.8 Memory Tricks"));
  out.push(box("Remember", "sodass = 'so' + 'dass' fused into one → think of it as a direct arrow from cause to consequence.", LIGHTGREEN, "2E7D32"));
  out.push(box("Remember", "so ADJEKTIV, dass = 'SO [quality], that...' — the 'so' always hugs the word it's intensifying.", LIGHTGREEN, "2E7D32"));

  out.push(h2("3.9 Short Summary"));
  out.push(p("Consecutive clauses show result. 'sodass' links a whole main clause to its consequence; 'so ..., dass' zooms in on the intensity of one adjective/adverb before delivering the same consequence. Verb always goes to the end of the sodass/dass-clause."));

  out.push(h2("3.10 Example Sentences"));
  out.push(examplesList([
    ["Es regnete stark, sodass wir zu Hause blieben.", "It rained heavily, so we stayed home."],
    ["Er war so müde, dass er sofort einschlief.", "He was so tired that he fell asleep immediately."],
    ["Sie lernte fleißig, sodass sie die Prüfung mit Bestnote bestand.", "She studied hard, so she passed the exam with top marks."],
    ["Der Kaffee war so heiß, dass ich mir die Zunge verbrannte.", "The coffee was so hot that I burnt my tongue."],
    ["Er sprach so leise, dass niemand ihn verstand.", "He spoke so quietly that no one understood him."],
    ["Das Auto war kaputt, sodass wir ein Taxi nehmen mussten.", "The car was broken, so we had to take a taxi."],
    ["Sie war so aufgeregt, dass sie kein Wort sagen konnte.", "She was so excited that she couldn't say a word."],
    ["Es war neblig, sodass man kaum etwas sehen konnte.", "It was foggy, so you could hardly see anything."],
    ["Er hat so viel gegessen, dass ihm schlecht wurde.", "He ate so much that he felt sick."],
    ["Die Prüfung war schwer, sodass viele Schüler durchfielen.", "The exam was hard, so many students failed."],
    ["Der Vortrag war so langweilig, dass viele einschliefen.", "The lecture was so boring that many fell asleep."],
    ["Sie kam zu spät, sodass sie den Zug verpasste.", "She arrived late, so she missed the train."]
  ]));

  out.push(h2("3.11 Exercises"));

  out.push(h3("Fill in the Blanks (choose sodass or so ... dass and complete)"));
  out.push(exerciseItems([
    "Es war ___ kalt, ___ wir zu Hause blieben.",
    "Er lief schnell, ___ er den Bus erreichte.",
    "Sie war ___ krank, ___ sie zum Arzt musste.",
    "Der Film war spannend, ___ wir bis Mitternacht wach blieben.",
    "Das Zimmer war ___ dunkel, ___ ich nichts sehen konnte.",
    "Er hat viel gearbeitet, ___ er sehr müde war.",
    "Die Musik war ___ laut, ___ ich sie im ganzen Haus hörte.",
    "Sie hatte ___ viel zu tun, ___ sie keine Pause machte."
  ]));
  out.push(...answerKey([
    "so ... dass", "sodass", "so ... dass", "sodass", "so ... dass", "sodass", "so ... dass", "so ... dass"
  ]));

  out.push(h3("Sentence Transformation (sodass ↔ so ..., dass)"));
  out.push(exerciseItems([
    "Er war müde, sodass er einschlief. → (use 'so ..., dass')",
    "Sie war so glücklich, dass sie weinte. → (use 'sodass')",
    "Es war laut, sodass wir nichts verstanden. → (use 'so ..., dass')",
    "Er hatte so großen Durst, dass er zwei Flaschen Wasser trank. → (use 'sodass')",
    "Der Test war schwer, sodass viele durchfielen. → (use 'so ..., dass')",
    "Sie sang so schön, dass alle applaudierten. → (use 'sodass')"
  ]));
  out.push(...answerKey([
    "Er war so müde, dass er einschlief.",
    "Sie war glücklich, sodass sie weinte.",
    "Es war so laut, dass wir nichts verstanden.",
    "Er hatte großen Durst, sodass er zwei Flaschen Wasser trank.",
    "Der Test war so schwer, dass viele durchfielen.",
    "Sie sang schön, sodass alle applaudierten."
  ]));

  out.push(h3("Translation: English → German"));
  out.push(exerciseItems([
    "It was so cold that we couldn't go outside.",
    "He studied hard, so he passed the test.",
    "She was so nervous that her hands were shaking.",
    "The traffic was bad, so we arrived late."
  ]));
  out.push(...answerKey([
    "Es war so kalt, dass wir nicht nach draußen gehen konnten.",
    "Er lernte fleißig, sodass er den Test bestand.",
    "Sie war so nervös, dass ihre Hände zitterten.",
    "Der Verkehr war schlecht, sodass wir spät ankamen."
  ]));

  out.push(h3("Translation: German → English"));
  out.push(exerciseItems([
    "Er redete so viel, dass mir der Kopf wehtat.",
    "Es war dunkel, sodass wir eine Taschenlampe brauchten.",
    "Sie war so wütend, dass sie nicht sprechen konnte.",
    "Der Wind war stark, sodass die Bäume sich bogen."
  ]));
  out.push(...answerKey([
    "He talked so much that my head hurt.",
    "It was dark, so we needed a flashlight.",
    "She was so angry that she couldn't speak.",
    "The wind was strong, so the trees bent."
  ]));

  out.push(h3("Error Correction"));
  out.push(exerciseItems([
    "Es war so kalt, dass wir blieben zu Hause.",
    "Er war müde, sodass einschlief er.",
    "Sie war müde so, dass sie einschlief.",
    "Der Film war so spannend dass wir wach blieben."
  ]));
  out.push(...answerKey([
    "Es war so kalt, dass wir zu Hause blieben. (verb to the end)",
    "Er war müde, sodass er einschlief. (subject before verb, verb to the end)",
    "Sie war so müde, dass sie einschlief. ('so' must precede the adjective)",
    "Der Film war so spannend, dass wir wach blieben. (comma required before 'dass')"
  ]));

  return out;
}

module.exports = topic3;
const {
  h1, h2, h3, p, bullet, box, spacer, dataTable, examplesList, exerciseItems, answerKey,
  GOLD, LIGHTGOLD, LIGHTGREEN, LIGHTRED
} = require("./build");

function topic4() {
  const out = [];
  out.push(h1("4. Passiv Präsens"));

  out.push(h2("4.1 What Is the Passive Voice?"));
  out.push(p("In the passive voice, the focus shifts from WHO performs an action to WHAT happens to the object of the action. The person doing the action (the agent) becomes optional and, if mentioned at all, is introduced with 'von' (+ Dativ) or 'durch' (+ Akkusativ)."));

  out.push(h2("4.2 Active vs. Passive"));
  out.push(dataTable(
    ["Aktiv", "Passiv"],
    [
      ["Subject = doer of the action", "Subject = receiver of the action"],
      ["Der Lehrer korrigiert die Prüfung.", "Die Prüfung wird (vom Lehrer) korrigiert."],
      ["Focus: who does it", "Focus: what happens to it"]
    ],
    [4500, 4500]
  ));

  out.push(h2("4.3 Formula"));
  out.push(box("Formula", "werden (conjugated in Präsens) + Partizip II (at the end of the clause)", LIGHTGOLD, GOLD));
  out.push(p("Conceptually: 'werden' carries the tense and person information, while the Partizip II (past participle) carries the core meaning of the action — exactly like English 'is/are + past participle' (is corrected, are built)."));

  out.push(h2("4.4 werden — Präsens Conjugation"));
  out.push(dataTable(
    ["Pronomen", "werden (Präsens)"],
    [["ich", "werde"], ["du", "wirst"], ["er/sie/es", "wird"], ["wir", "werden"], ["ihr", "werdet"], ["sie/Sie", "werden"]],
    [3000, 3000]
  ));

  out.push(h2("4.5 Forming the Partizip II"));
  out.push(h3("Regular (weak) verbs"));
  out.push(box("Formula", "ge- + Stamm + -t", LIGHTGOLD, GOLD));
  out.push(dataTable(["Infinitiv", "Partizip II"], [["machen", "gemacht"], ["kaufen", "gekauft"], ["lernen", "gelernt"]], [4500, 4500]));

  out.push(h3("Irregular (strong) verbs"));
  out.push(p("Strong verbs usually take ge- + a (often vowel-changed) stem + -en, and must be memorised individually."));
  out.push(dataTable(["Infinitiv", "Partizip II"], [["schreiben", "geschrieben"], ["nehmen", "genommen"], ["essen", "gegessen"], ["lesen", "gelesen"], ["sehen", "gesehen"]], [4500, 4500]));

  out.push(h3("Separable verbs"));
  out.push(p("The '-ge-' is inserted BETWEEN the separable prefix and the stem."));
  out.push(dataTable(["Infinitiv", "Partizip II"], [["aufmachen", "aufgemacht"], ["einladen", "eingeladen"], ["mitbringen", "mitgebracht"]], [4500, 4500]));

  out.push(h3("Verbs without ge- (inseparable prefixes / -ieren verbs)"));
  out.push(p("Verbs with inseparable prefixes (be-, ge-, er-, ver-, zer-, ent-, emp-, miss-) and verbs ending in -ieren do NOT take 'ge-'."));
  out.push(dataTable(["Infinitiv", "Partizip II"], [["bezahlen", "bezahlt"], ["verkaufen", "verkauft"], ["reparieren", "repariert"]], [4500, 4500]));

  out.push(h2("4.6 Active → Passive Transformation"));
  out.push(box("Steps", "1) Akkusativ object of the active sentence becomes the Nominativ subject.\n2) The active verb becomes werden (matching the new subject) + Partizip II.\n3) The old subject (the doer) becomes optional: von + Dativ (person) or durch + Akkusativ (cause/means).", LIGHTGOLD, GOLD));
  out.push(p("Der Koch kocht die Suppe. → Die Suppe wird (vom Koch) gekocht."));

  out.push(h2("4.7 Passive → Active Transformation"));
  out.push(p("Reverse the steps: the von/durch-phrase (or an implied 'man') becomes the subject; the Nominativ subject of the passive sentence becomes the Akkusativ object; werden + Partizip II becomes the matching active tense form of the main verb."));
  out.push(p("Das Fenster wird (von dem Jungen) geöffnet. → Der Junge öffnet das Fenster."));

  out.push(h2("4.8 Common Mistakes"));
  out.push(box("Common Mistake", "Confusing 'werden' (passive auxiliary) with 'werden' (become) or with the Futur auxiliary — check whether a Partizip II follows.", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Using 'sein' instead of 'werden': ✗ Die Tür ist geöffnet (this is a STATE — Zustandspassiv) vs. ✓ Die Tür wird geöffnet (the ACTION of opening — Vorgangspassiv).", LIGHTRED, "C0392B"));
  out.push(box("Common Mistake", "Using 'von' with an inanimate cause instead of 'durch': prefer 'durch den Sturm zerstört' over 'von dem Sturm zerstört' when the agent is a force, not a person.", LIGHTRED, "C0392B"));

  out.push(h2("4.9 Memory Tricks"));
  out.push(box("Remember", "werden + Partizip II = the passive 'engine + cargo': werden changes with tense/person, the participle stays fixed at the end.", LIGHTGREEN, "2E7D32"));
  out.push(box("Remember", "Person doing it → von. Thing/force causing it → durch.", LIGHTGREEN, "2E7D32"));

  out.push(h2("4.10 Short Summary"));
  out.push(p("Passiv Präsens = werden (conjugated) + Partizip II. The receiver of the action becomes the subject; the doer becomes an optional von/durch phrase. Partizip II formation depends on whether the verb is weak, strong, separable, or has an inseparable/-ieren prefix."));

  out.push(h2("4.11 Example Sentences"));
  out.push(examplesList([
    ["Die Suppe wird gekocht.", "The soup is being cooked."],
    ["Das Auto wird repariert.", "The car is being repaired."],
    ["Die Aufgaben werden von den Schülern gelöst.", "The tasks are solved by the students."],
    ["Der Brief wird geschrieben.", "The letter is being written."],
    ["Das Haus wird gebaut.", "The house is being built."],
    ["Die Tür wird geöffnet.", "The door is being opened."],
    ["Das Fenster wird durch den Sturm zerstört.", "The window is destroyed by the storm."],
    ["Die Rechnung wird bezahlt.", "The bill is being paid."],
    ["Die Bücher werden verkauft.", "The books are being sold."],
    ["Das Zimmer wird jeden Tag geputzt.", "The room is cleaned every day."],
    ["Der Kuchen wird von meiner Mutter gebacken.", "The cake is baked by my mother."],
    ["Die E-Mails werden sofort beantwortet.", "The emails are answered immediately."]
  ]));

  out.push(h2("4.12 Practice Questions"));
  out.push(exerciseItems([
    "Change to passive: Der Lehrer erklärt die Grammatik.",
    "Change to passive: Die Firma stellt viele Mitarbeiter ein.",
    "Change to passive: Man liest das Buch in der Schule.",
    "Change to passive: Der Sturm zerstört das Dach.",
    "Change to active: Die Aufgabe wird von dem Schüler gelöst.",
    "Change to active: Das Essen wird gekocht.",
    "Change to active: Die Fenster werden geputzt.",
    "Fill in the correct form of werden: Das Auto ___ repariert.",
    "Fill in the correct form of werden: Die Briefe ___ geschrieben.",
    "Fill in the Partizip II: Die Tür wird ___ (öffnen).",
    "Fill in the Partizip II: Das Essen wird ___ (kochen).",
    "Fill in the Partizip II: Die Aufgabe wird ___ (lösen).",
    "Fill in the Partizip II: Das Haus wird ___ (bauen).",
    "Identify Aktiv or Passiv: Die Suppe wird gekocht.",
    "Identify Aktiv or Passiv: Der Koch kocht die Suppe.",
    "Translate to Passiv Präsens: The letter is being read.",
    "Translate to Passiv Präsens: The car is being washed.",
    "Translate to Passiv Präsens: The homework is done by the students.",
    "Rewrite with 'durch' instead of 'von' where appropriate: Das Feld wird von dem Regen bewässert.",
    "Combine into one passive sentence: Der Bäcker backt das Brot. + Präsens Passiv."
  ]));
  out.push(...answerKey([
    "Die Grammatik wird (vom Lehrer) erklärt.",
    "Viele Mitarbeiter werden (von der Firma) eingestellt.",
    "Das Buch wird in der Schule gelesen.",
    "Das Dach wird durch den Sturm zerstört.",
    "Der Schüler löst die Aufgabe.",
    "Man kocht das Essen. / Jemand kocht das Essen.",
    "Man putzt die Fenster.",
    "wird",
    "werden",
    "geöffnet",
    "gekocht",
    "gelöst",
    "gebaut",
    "Passiv",
    "Aktiv",
    "Der Brief wird gelesen.",
    "Das Auto wird gewaschen.",
    "Die Hausaufgaben werden von den Schülern gemacht.",
    "Das Feld wird durch den Regen bewässert.",
    "Das Brot wird (vom Bäcker) gebacken."
  ]));

  return out;
}

module.exports = topic4;
// ---------- CORE DOCUMENT GENERATION ----------
const { Document, Packer } = require("docx");

async function buildWordDocument() {
  // Collect all your layout arrays into one master timeline
  const documentElements = [
    ...topic1(),
    pageBreak(),
    ...topic2(),
    pageBreak(),
    ...topic3(),
    pageBreak(),
    ...topic4()
  ];

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "bullet-list",
          levels: [
            {
              level: 0,
              format: "bullet",
              text: "•",
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: documentElements,
      },
    ],
  });

  // Convert the document layout to a binary buffer
  const buffer = await Packer.toBuffer(doc);
  
  // Save it as a real Microsoft Word file
  fs.writeFileSync("German_Grammar_Mastery.docx", buffer);
  console.log("Success! Created 'German_Grammar_Mastery.docx' in this folder.");
}

// Execute the compiler
buildWordDocument().catch(err => console.error("Error generating doc:", err));
