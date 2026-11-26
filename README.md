# Verity

**Research transparency for women's representation in science and medicine.** Verity makes it easier to see where women are included in research, where results are analyzed by sex, and where evidence remains limited.

Live project: [verityproject.xyz](https://verityproject.xyz)

Verity is an evidence visibility tool, not a medical advice service. Its scores and summaries describe the dataset maintained in this project; consult the cited research and qualified clinicians for decisions about health.

## Purpose

Many studies include women without reporting whether results differ by sex. Verity brings together condition-level study counts, representation measures, evidence-quality ratings, findings, and citations so readers can explore those gaps in one place.

## Features

- **Condition profiles:** Browse 10 indexed conditions with study counts, women’s inclusion, female-only study counts, sex-disaggregated analysis, evidence quality, findings, sources, and methodology notes.
- **Research Gap Index:** Compare conditions, filter by gap type or evidence quality, and sort by representation score.
- **Condition search:** Find a profile by condition name or supported search term.
- **Evidence indicators:** Review a 0–100 representation score, one of four research-gap categories, and a five-level evidence-quality rating.
- **Verity assistant:** Ask general questions about the index, its measures, and supported condition data. A local safety check declines requests for personal medical advice.
- **Responsive interface:** A single-page experience with hash-based routes.

## How the index is organized

The Gap Index describes a composite representation score based on four measures: studies including women, female-only studies, sex-disaggregated analysis, and evidence quality. Profiles group reported findings and link to publication details. The interface labels four gap types:

1. No female representation
2. Women included, not studied
3. No significant differences found
4. Insufficient evidence

The underlying data is curated in the repository. Read each profile's methodology and citations when interpreting a figure; a score is a summary of this dataset, not a clinical guideline or a substitute for reviewing the source studies.

## Tech stack

- HTML5, CSS, and browser-native JavaScript modules; no frontend framework or build step.
- Node.js ES modules for Vercel serverless functions in `api/`.
- Shared assistant, condition, FAQ, and safety logic in `lib/`.
- Groq Chat Completions API for optional natural-language phrasing in the assistant. The application resolves facts locally before asking the model to phrase them.
- Google Fonts (Instrument Serif, Inter, and JetBrains Mono) and Vercel hosting/analytics.

## Run locally

### Full app, including API routes

1. Install Node.js and the Vercel CLI. The project has no npm package dependencies or build step. Vercel documents the CLI installation and local development commands in its [CLI guide](https://vercel.com/docs/cli) and [`vercel dev` reference](https://vercel.com/docs/cli/dev).

   ```sh
   npm install --global vercel
   ```

2. Clone the repository and enter its directory:

   ```sh
   git clone https://github.com/aanyabajpai670-creator/verity.git
   cd verity
   ```

3. If prompted, sign in to Vercel and link this local directory to a Vercel project. Create a local environment file and add a Groq key to enable assistant phrasing:

   ```sh
   cp .env.example .env.local
   ```

   Set `GROQ_API_KEY` in `.env.local`. Keep that file private; it is ignored by Git.

4. Start Vercel's local development server:

   ```sh
   vercel dev
   ```

5. Open the local URL printed by Vercel, usually `http://localhost:3000`.

The frontend and deterministic API responses can run without a Groq key, but assistant responses that require model phrasing will use the application's fallback behavior.

### Frontend preview only

To preview the static interface without the serverless API, run a local web server from the project directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. The assistant's `/api` requests require the full Vercel setup above.

## Use the app

- `#/` — Home and condition search
- `#/conditions/<slug>` — Condition profile, for example `#/conditions/adhd`
- `#/gap-index` — Filterable and sortable Research Gap Index
- `#/conditions/adhd/pilot` — ADHD audit snapshot, scoring inputs, and source-linked evidence
- `#/about` — Project and methodology information

Use the profile citations and methodology notes to follow a finding back to its source. The assistant is for general questions about Verity's data and does not provide personal diagnosis or treatment advice.

## ADHD pilot preview

Run `python3 scripts/adhd_pilot.py` to regenerate the preview snapshot from the saved extraction records without any network calls. Run `node dev-preview.mjs` and open `http://127.0.0.1:8000/#/conditions/adhd/pilot`.

The build reads the prompt-versioned checkpoints in `research/adhd-pilot-v2/<version>/`, which were produced from locally cached article text. Those full-text caches are copyrighted and are therefore excluded from the repository (`research/fulltext/`, `research/adhd-pilot-v2/sources/`). If a cache file is missing the build stops with an explicit error rather than publishing numbers that disagree with the reviewed ledger. To reproduce the published snapshot you need the same caches; without them the previously published `report.json` and `assets/adhd-pilot*.{js,csv}` remain the authoritative output.

To collect the revised fields and follow up with available article text, run:

```sh
python3 scripts/adhd_pilot.py --run --fulltext --background
```

Enter the hosted-model API key at the hidden prompt. The run processes the human reference set first, then continues through the fixed sample. It checkpoints responses and refreshes the snapshot during the run. Start it again with the same command to resume after a provider interruption. Use `--limit 5` for a foreground test, or leave out `--fulltext` for an abstract-only run.

The browser snapshot and downloadable ledger are generated in `assets/`. Blank ledger cells represent unavailable or unresolved values. The prompt-versioned raw responses, normalized evidence with exact quotes, review queue, and scoring inputs are under `research/adhd-pilot-v2/`. The original extraction files remain in their original run directory. A published snapshot uses the March 2025 score in the Gap Index and presents any revised result separately as provisional.

The revised calculation uses the 25/25/35/15 weights from the methodology specification and counts reporting levels 2 and 3 per §6.1. A composite requires resolved eligibility and inclusion/reporting coverage, a computable median, and a supported evidence strength rating. `--screened-corpus-size` takes a documented eligible count, never the count of search hits. `--consistent-findings` takes a documented synthesis when the strongest evidence tier is otherwise met. Omit either input when it is unresolved.

## Project layout

```text
index.html       Main hosted application
index_multi.html Alternate modular frontend entry point
assets/          Logo and static imagery
css/             Styles and design tokens
js/              Browser modules, components, pages, and condition data
api/             Vercel serverless function entry points
lib/             Shared server-side condition, FAQ, safety, and Groq logic
```

The browser condition data is in `js/data/conditions.js`; assistant condition data and routing logic are maintained in `lib/`. Keep both representations aligned when updating condition information.

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `GROQ_API_KEY` | For model phrasing | Groq API key used server-side by the assistant. Never place it in browser code or commit it. |
| `GROQ_MODEL` | No | Optional Groq model override. Defaults to `openai/gpt-oss-120b`. |

For production, set these in the Vercel project environment settings. The local `.env.local`, `.vercel/` directory, and all credential files are excluded from version control and the submission ZIP.

## Deploy

The production site is hosted at [verityproject.xyz](https://verityproject.xyz). To deploy a separate copy, import the repository into Vercel, set the server-side environment variables above, and deploy. Vercel serves `index.html` and maps files in `api/` to serverless routes.

## Data and safety notes

- The condition dataset and its metrics are project-maintained summaries. Review the per-condition citations and methodology before reusing a claim.
- Verity provides evidence visibility, not medical advice, diagnosis, or treatment recommendations.
- The assistant uses locally defined condition/FAQ resolution and a local personal-medical-request safety gate; a configured Groq key enables model phrasing for applicable responses.

## License

No license file is currently included. Contact the project owner before redistributing or reusing this project beyond the permissions that apply to the repository.
