# Verity

Verity is a research transparency platform for exploring where evidence about women is visible, limited, or missing in scientific and medical research. It helps readers inspect evidence coverage and research gaps; it is informational and is not medical advice.

## Features

- Browse condition profiles and their evidence summaries.
- Explore the Gap Index and compare research coverage.
- Read about the project and its approach to evidence quality.
- Ask the Verity assistant questions through the serverless API.
- Responsive single-page interface with hash-based routes.

## Run locally

The frontend is built with HTML, CSS, and native JavaScript modules. To preview the static interface, serve this directory with any local static web server and open `index.html`.

The `/api` endpoints use Vercel serverless functions. To run the full app locally, install the [Vercel CLI](https://vercel.com/docs/cli) and start the project with `vercel dev` from this directory. The assistant endpoint also needs a Groq API key configured in the local environment:

```sh
GROQ_API_KEY=your_groq_api_key vercel dev
```

Keep local environment files (such as `.env.local`) private. They are excluded from this project archive and should never be committed.

## Project structure

```text
api/       Vercel serverless API handlers
assets/    Images and other static assets
css/       Stylesheets and design tokens
js/        Browser app, routes, components, and data
lib/       Shared server-side API logic
index.html Main application page
```

## Routes

- `#/` — Home
- `#/conditions/<slug>` — Condition profile
- `#/gap-index` — Research Gap Index
- `#/about` — About Verity

## Configuration

| Variable | Purpose |
| --- | --- |
| `GROQ_API_KEY` | Enables the assistant's Groq API requests. |
| `GROQ_MODEL` | Optional model override; defaults to `openai/gpt-oss-120b`. |

## Deployment

Deploy the directory as a Vercel project to serve the frontend and `/api` functions together. Add the required environment variables in the Vercel project's settings before enabling the assistant.
