# ADR 002: Client-side CSV Fetching

## Status
Accepted

## Context
ADR-001 established Google Sheets as the CMS, but relied on a complex Zapier automation to physically update a JS file in the repository. usage showed this was fragile and had a delay in deployment (waiting for build/deploy).
We wanted a more direct way to show updates without triggering a full site build or relying on external automation services like Zapier.

## Decision
We have switched to **Client-side Fetching** of the published CSV from Google Sheets (`pub?output=csv`).

The new workflow:
1.  **Source of Truth**: Google Spreadsheet (same as before).
2.  **Publication**: The sheet is "Published to Web" as CSV.
3.  **Consumption**: `js/script.js` fetches the CSV URL directly at runtime.
4.  **Parsing**: A lightweight client-side CSV parser converts the data to JSON for rendering.

### Impact on CI/CD (GitHub Actions)
The `.github/workflows/deploy-pages.yml` workflow remains **required** for the project, but its role has shifted:
- **It is still needed** to deploy changes to the application code (`index.html`, `css/*`, `js/*`) and documentation.
- **It triggers** only on git pushes to the repository (e.g., code fixes, redesigns).
- **It is NOT triggered** by data updates in the Google Sheet (data is now fetched at runtime).

## Consequences

### Positive
- **Simplicity**: No Zapier, no GitHub Actions for content updates.
- **Speed**: Updates are available as soon as Google's cache clears (approx 5 mins), without waiting for a site rebuild.
- **Maintenance**: Reduced external dependencies.
- **Zero-backend**: Fits perfectly with the project's static nature.

### Negative / Risks
- **Client Load**: The client must download and parse the CSV on every load (mitigated by small file size).
- **Availability**: profound reliance on Google's `pub` endpoint uptime.
- **Caching**: Changes may take up to 5 minutes to propagate due to Google's internal caching. This is acceptable for this use case.

## Supersedes
[ADR 001: Google Sheets as CMS for Route Updates](ADR-001-google-sheets-cms.md)