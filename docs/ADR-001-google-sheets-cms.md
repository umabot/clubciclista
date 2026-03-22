# ADR 001: Google Sheets as CMS for Route Updates

## Status
Accepted

## Context
The project requires a simple, low-cost solution for a small business (specifically a biking club) to update their single-page landing page. The specific content that needs frequent updates includes:
- Cycling routes
- Member lists
- Future content: Ride stories and pictures

The end users are non-technical and require a familiar interface for data entry. The solution needs to minimize hosting costs and complexity while ensuring the website remains up-to-date.

## Decision
We have decided to use **Google Spreadsheets** as the Content Management System (CMS) for this project. Specifically, a sheet named "Strava Routes" will be used to input route information.

The integration pipeline is designed as follows:
1.  **Source of Truth**: Google Spreadsheet ("Strava Routes").
2.  **Automation Middleware**: Zapier.
3.  **Hosting**: GitHub Pages.

### Automation Logic (Zapier)
A Zapier ZAP is configured to listen for new or updated rows in the spreadsheet, using the "Title" column as the specific trigger.

Upon triggering, the Zapier business logic executes the following steps:
1.  **Read**: Fetches the full content of the target file `js/routes-data.js` from the repository.
2.  **Parse & format**: Locates the end of the data structure and inserts the new spreadsheet row formatted as a JSON record.
3.  **Update**: Rewrites the file with the new data.
4.  **Commit**: Performs a Git commit to the repository.

### Hosting
The repository is hosted on GitHub, utilizing **GitHub Pages**. A GitHub Action is configured to trigger a deployment whenever a commit is made (including those made by the Zapier automation), ensuring the live site reflects the spreadsheet changes within minutes.

## Consequences

### Positive
- **Cost**: Extremely low operational cost.
- **Usability**: End users work within Google Sheets, a tool they are already effectively using.
- **Maintenance**: Zero-backend architecture significantly reduces security risks and maintenance overhead.

### Negative / Risks
- **Scalability**: As routes accumulate (100, 1,000, 10,000 records), the `js/routes-data.js` file size will grow, potentially impacting load times and Zapier processing limits.
- **Data Integrity**: The "find and append" logic in Zapier is somewhat fragile compared to a true database.

### Mitigation Strategies
- **Manual Maintenance**: Currently, scalability is managed manually. A technical administrator must periodically check the file and truncate old records to keep the file size reasonable.
- **Display Logic**: The frontend (`index.html`) is designed to display only the next 5 upcoming routes (starting from "today").
- **Data Retention**: The operational goal is to maintain approximately 10 records in the active file (5 upcoming, 5 recent usage).
- **Archival**: Future development may include moving historic routes to a separate archive file to preserve data without bloating the active application payload.
