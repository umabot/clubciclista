# TAC-001: Technical Architecture

## 1. Overview
Club Ciclista is a static, single-page application designed for simplicity, zero-maintenance, and low cost. It operates without a backend server, build process, or complex deployment pipeline.

## 2. Architectural Principles

### 2.1 Zero Build
- **No Compilation**: Source code is written in pure HTML, CSS, and JavaScript.
- **No Bundlers**: No Webpack, Vite, or Parcel.
- **Direct Execution**: The repository can be cloned and opened directly in a browser (file:// protocol) for development.

### 2.2 Client-Side Only
- All logic executes in the user's browser.
- Data persistence for user-specific actions uses `localStorage`.
- Content updates are fetched dynamically at runtime.

### 2.3 Dependency Management
- **No Package Manager**: npm/yarn/pnpm are not used for the runtime.
- **CDN-Based**: All external libraries (Tailwind, Lucide, etc.) are loaded via CDN.
- **Security**: All CDNs must use specific versions and Subresource Integrity (SRI) hashes (see `CDN_INVENTORY.md`).

## 3. Component Architecture

### 3.1 HTML Structure (`index.html`)
The application is a single semantic HTML5 document. The page layout is divided into the following key sections:

| Section ID | Description | Key Elements |
|------------|-------------|--------------|
| `nav.top-nav` | **Top Navigation** | Logo, desktop links, language switcher, mobile hamburger menu. |
| `#inicio` | **Hero Carousel** | Full-width image slider with call-to-action buttons and auto-play logic. |
| `#unete` | **Intro / Features** | Grid layout highlighting club benefits (Guided Routes, Community, Events). |
| `#rutas` | **Routes Section** | Dynamic container (`#routes-track`) where route cards are injected via JS. |
| `#miembros` | **Members Section** | Grid container (`#members-grid`) for displaying club staff/members. |
| `#contacto` | **About & Contact** | Informational text and a functional contact form (`#contact-form`). |
| `footer` | **Footer** | Legal links, copyright, and social information. |

### 3.2 Styling (`css/style.css` + Tailwind)
- **Tailwind CSS**: Loaded via CDN for utility classes.
- **Custom CSS**: `css/style.css` handles specific overrides, variables for theming, and complex animations.

### 3.3 Application Logic (`js/script.js`)
A single, self-contained JavaScript file wrapped in an IIFE (Immediately Invoked Function Expression) to avoid polluting the global namespace.

**Function Reference:**

| Function Name | Description |
|---------------|-------------|
| `showToast(message)` | Displays a temporary "toast" notification at the bottom of the screen. |
| `checkScriptLoad()` | Verifies if the Google Translate script has loaded and handles errors. |
| `renderMembers()` | Generates member cards from a local data array and injects them into `#members-grid`. |
| `parseCSV(csvText)` | Utility that parses raw CSV string data into an array of route objects. |
| `renderRoutes()` | Fetches the CSV from Google Sheets, parses it, and renders route cards into `#routes-track`. |
| `initIcons()` | Initializes Lucide icons (runs after DOM updates to catch dynamically added icons). |
| `initHeroCarousel()` | Manages the hero slider logic, including autoplay, manual navigation arrows, and dots. |
| `initLanguageSwitcher()` | Handles Google Translate integration, persistent language preferences (`localStorage`), and UI updates. |
| `initMobileNav()` | Toggles the mobile navigation menu when the hamburger button is clicked. |
| `initContactForm()` | Intercepts form submission to save messages to `localStorage` (demo mode) and show success feedback. |
| `initPastRoutes()` | Handles the "Past Routes" link click event (currently a placeholder action). |

## 4. Data Architecture

### 4.1 Google Sheets as CMS
To allow non-technical users to update content (specifically cycling routes), we use Google Sheets as a headless CMS.

**Workflow:**
1.  **Edits**: Club administrators edit a Google Spreadsheet.
2.  **Publication**: The sheet is "Published to the Web" as a CSV file.
3.  **Consumption**: The application fetches this CSV URL directly at runtime using the `fetch` API.
4.  **Parsing**: A client-side CSV parser converts the data to JSON for rendering.

See [ADR-002](ADR-002-client-side-csv.md) for decision context.

### 4.2 Strava Routes Configuration
The specific implementation for the Route tracking is configured as follows:

- **Name**: Strava Routes
- **Data Source**: Google Spreadsheet
- **Source Link**: [Club Ciclista Routes Sheet](https://docs.google.com/spreadsheets/d/1OMCixIDvGediMD9slf6aS0S1ibQWhCvQqZWUGC-knGU/edit?usp=sharing)
- **Owner**: `scasagra@gmail.com` (Shared with `silvio@innovumabot.com`)
- **Sheet Name**: `Sheet1` (default)
- **Data Schema**:
    The sheet contains a table with the following mandatory columns (order does not matter, headers are case-insensitive):
    
    | Column | Description |
    |--------|-------------|
    | `title` | Name of the route |
    | `date` | Date (ISO 8601: `YYYY-MM-DD`, e.g., `2026-03-29`) |
    | `time` | Start time (24h format: `HH:mm`) |
    | `distance` | Distance in km (number only, e.g., `85`) |
    | `desc` | Brief description of the route|
    | `bgClass` | CSS class for background image (e.g., `placeholder-bg-1`) |

    *Note: These columns map directly to the parsing logic in `js/script.js`.*

- **Integration**:
    - The sheet is published via **File -> Share -> Publish to Web**.
    - Format: **CSV**
    - The application references this CSV via the `ROUTES_CSV_URL` constant in `js/script.js`.

## 5. Deployment

### 5.1 GitHub Actions Workflow
The project uses a standard GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) to build and deploy the site to GitHub Pages.

**Workflow Configuration:**
- **Trigger**: Pushes to the `main` branch or manual `workflow_dispatch`.
- **Environment**: Deploys to the `github-pages` environment.
- **Concurrency**: Ensures only one deployment runs at a time (`cancel-in-progress: false`).

**Job Steps:**
1.  **Checkout**: Uses `actions/checkout@v4` to fetch the repository code.
2.  **Setup Pages**: Uses `actions/configure-pages@v5` to configure metadata for GitHub Pages.
3.  **Upload Artifact**: Uses `actions/upload-pages-artifact@v3` to package the root directory (`.`).
4.  **Deploy**: Uses `actions/deploy-pages@v4` to publish the artifact to the live URL.

### 5.2 Content Updates vs Code Updates
- **Code Updates** (HTML/CSS/JS): Require a commit and push to `main`, which triggers the deployment workflow (~1-2 min).
- **Data Updates** (Routes): Do *not* trigger a deployment. Updates made in the Google Sheet are live immediately (subject to Google's ~5 min caching) because the fetch happens client-side at runtime.

## 6. Security and Compliance
- **SRI**: Strict enforcement of Subresource Integrity for all third-party scripts.
- **Secrets**: No API keys or private credentials are stored in the client-side code.
