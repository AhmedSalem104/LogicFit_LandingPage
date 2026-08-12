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
│   │   ├── favicon-lf.png
│   │   ├── logo-light.png
│   │   ├── logo-dark.png
│   │   ├── hero-athlete.png
│   │   ├── web-app-showcase.png
│   │   ├── web-app-showcase-dark.png
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
- Web and mobile product showcase
- Member journey visuals
- Team roles
- Customer story
- FAQ
- Final CTA
- Footer

## Notes

- The Arabic page follows the Figma `landing.ar.next` structure; the English page mirrors
  the same layout and content hierarchy.
- Shared behavior lives in `assets/js/main.js`: mobile menu, active navigation state,
  scroll reveal, and theme switching.
- Light and dark themes use semantic token values from the Figma landing page.
- The real Figma-exported LogicFit logo is stored under `assets/figma-next/` with separate
  light and dark versions, plus a cropped `LF` favicon.
- The "Your app. Your name." section has a live demo: tapping a brand swatch recolours
  the member-app mock (`--brand` CSS variable) and swaps its name + logo initial.

## Sections

Hero + live console → The problem → Nine systems → Training (results in numbers) →
People visual proof → White-label app → Roles → Metrics strip → Call to action.

The visual proof section uses male-only gym photography, lazy loading, responsive
cropping, hover transitions, and accessible alternative text. The same section is
translated in `ar/index.html` and uses the shared RTL layout.

The conversion flow is intentionally split: **Start free trial** uses a lightweight
work-email capture form, while **Book a demo** opens a dedicated sales modal with gym
name, email, and branch count. Both forms validate inline, keep the page in place, and
store a local lead receipt for the next integration step (`logicfit_trial_lead` and
`logicfit_demo_lead`). Replace that storage call with the production lead endpoint when
the CRM contract is enabled.

## Accessibility and performance

- Semantic sections, labelled navigation, descriptive image `alt` text, and keyboard-focusable controls.
- `loading="lazy"` is used for below-the-fold photography; the hero remains CSS/vector-based for fast first paint.
- All animations respect `prefers-reduced-motion`.
- No framework or runtime dependency is required; the page is deployable as static files.

## Customising

- **Copy / colours per gym** — edit the swatch `data-c` / `data-name` / `data-i`
  attributes in the white-label section.
- **Brand accent** — change `--ember` in `assets/css/style.css` (both themes).
- **Add a language** — copy a page, set `<html lang dir>`, translate the content, and add
  a matching `html[lang="xx"]` font block in `style.css`.

## Documentation

التفاصيل الكاملة للصفحات والأقسام وكل تفاعل وعقد التخزين المحلي والاختبارات موجودة في
[docs/COMPLETE-LANDING-DOCUMENTATION.md](docs/COMPLETE-LANDING-DOCUMENTATION.md).

---

© 2026 LogicFit · Gym management platform.
