# Club Ciclista

A modern, lightweight single-page template for cycling clubs. Built with pure HTML, CSS, and JavaScript—no build tools, no framework overhead, just a clean, fast website.

## Philosophy: Zero Build

Club Ciclista embraces the **zero build** philosophy:
- **No build process** — Write HTML, CSS, and JavaScript directly
- **No framework dependencies** — Pure vanilla JavaScript
- **No local development servers required** — Open `index.html` in your browser
- **No deployment complexity** — Static files deploying to any host

This means you can fork the project, customize it, and have a live website in minutes.

## Tech Stack

- **HTML5** — Semantic markup
- **CSS** — Tailwind CSS (via CDN)
- **JavaScript** — Vanilla JS (no frameworks)
- **Icons** — Lucide Icons (via CDN)
- **Hosting** — GitHub Pages or Netlify
- **Storage** — `localStorage` for client-side data (optional)

All external resources are pinned to specific versions with Subresource Integrity (SRI) hashes. See [CDN_INVENTORY.md](CDN_INVENTORY.md) for the complete list of dependencies.

## Project Structure

```
.
├── README.md                 # This file
├── AGENTS.md                 # Architecture and development standards
├── CDN_INVENTORY.md          # Pinned CDN dependencies and versions
├── index.html                # Main landing page
├── css/
│   └── style.css             # Custom styles
└── js/
    └── script.js             # Application logic
```

### Key Files

- **index.html** — The main page. Add navigation, hero sections, event listings, and member info here.
- **css/style.css** — Override or extend Tailwind classes for custom branding.
- **js/script.js** — Navigation, form handling, dynamic content, etc.

## Deployment

### GitHub Pages (Recommended)

1. Push your changes to the `main` branch
2. Go to **Settings → Pages** in your repository
3. Set source to `Deploy from a branch` → `main` branch
4. Your site will be live at `https://<username>.github.io/<repo-name>`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command to: *(leave empty)*
3. Set publish directory to: `.` (root)
4. Deploy

### Local Testing

Simply open `index.html` directly in your browser (no server needed):
```bash
# macOS / Linux
open index.html

# Windows
start index.html
```

## Customization

### Colors & Branding

Edit `css/style.css` to customize colors, fonts, and spacing:

```css
:root {
  --primary-color: #0066cc;    /* Adjust to your club colors */
  --secondary-color: #f0f0f0;
  --text-color: #333;
}
```

### Adding Content

1. **Club Information** — Update club name, logo, and description in `index.html`
2. **Events** — Add event listings in HTML with dynamic updates via `js/script.js`
3. **Members** — Use `localStorage` to store member data locally
4. **Images** — Place club photos, logos, and banners in a `/images/` directory

### Adding New Pages

Create additional `.html` files (e.g., `events.html`, `members.html`) and link them in the navigation. Keep the same CSS and JavaScript structure for consistency.

## CDN Dependencies

This project is committed to security and transparency. All external resources are:
- Pinned to exact versions (never `@latest`)
- Validated with Subresource Integrity (SRI) hashes
- Sourced from reputable CDNs (jsDelivr, Cloudflare, etc.)

For a complete list of current dependencies and their versions, see [CDN_INVENTORY.md](CDN_INVENTORY.md).

## Architecture & Standards

This project follows strict development standards for security, performance, and maintainability. See [AGENTS.md](AGENTS.md) for:
- Code style guidelines
- Security best practices
- Development workflow
- Testing requirements
- CDN management rules

## Security

- ✅ No API keys hardcoded in the source
- ✅ All external scripts validated with SRI hashes
- ✅ No user data sent to external services
- ✅ No eval() or inline event handlers
- ✅ Input validation for forms

## Performance

- Lightweight HTML/CSS/JS (typically < 50KB total)
- Fast CDN delivery for Tailwind and Lucide
- No JavaScript frameworks overhead
- Optimized for mobile and desktop

## License

MIT License — See LICENSE file for details.

## Contributing

Want to improve Club Ciclista? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test by opening `index.html` in your browser
5. Submit a pull request

## Questions?

See the troubleshooting section in [AGENTS.md](AGENTS.md) for common questions and answers.

---

**Built with ❤️ for cycling communities everywhere.**