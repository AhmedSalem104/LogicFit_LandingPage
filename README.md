# LogicFit Landing Page

Static bilingual landing page for LogicFit, implemented from the Figma `Landing • AR • Next Gen • Light/Dark` frames and mirrored into English.

The site uses one shared stylesheet and one shared script:

- English / LTR: `index.html`
- Arabic / RTL: `ar/index.html`

## Structure

```text
LogicFit_LandingPage/
├── index.html
├── ar/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── figma-next/
│   │   ├── logo-light.png
│   │   ├── logo-dark.png
│   │   ├── hero-athlete.png
│   │   ├── dashboard-mockup.png
│   │   ├── member-app-mockup.png
│   │   ├── journey-training.png
│   │   ├── journey-nutrition.png
│   │   ├── journey-progress.png
│   │   └── story-gym.png
│   └── js/
│       └── main.js
└── README.md
```

## Run

No build step or package install is required. Open either HTML file directly, or serve the folder with any static server:

```bash
python -m http.server 5173 --bind 127.0.0.1
```

Then visit:

- `http://127.0.0.1:5173/`
- `http://127.0.0.1:5173/ar/`

## Current Sections

- Navigation with persistent active tab state
- Next Gen hero
- Social proof strip
- Operating outcomes
- Connected operations dashboard
- White-label member app
- Member journey visuals
- Team roles
- Customer story
- FAQ
- Final CTA
- Footer

## Notes

- The Arabic page follows the Figma `landing.ar.next` structure; the English page mirrors the same layout and content hierarchy.
- Shared behavior lives in `assets/js/main.js`: mobile menu, active navigation state, scroll reveal, and theme switching.
- Light and dark themes use semantic token values from the Figma landing page.
- The real Figma-exported LogicFit logo is stored under `assets/figma-next/` with separate light and dark versions.
