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
- 13 connected management capabilities
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
  scroll reveal, counters, lightweight pointer motion, and theme switching.
- Light and dark themes use semantic token values from the Figma landing page.
- The current brand mark is `assets/brand/logicfit-new-logo.png`; the original Figma
  assets remain available under `assets/figma-next/`.
- `Start free trial` links directly to the registration route at
  `https://gym-membership-app-smoky.vercel.app/register-gym`.

## Section flow

Hero → proof metrics → operating outcomes → 13-capability inventory → product showcase
→ member journey → role views → customer story → FAQ → call to action → footer.

The visual proof section uses male-only gym photography, lazy loading, responsive
cropping, hover transitions, and accessible alternative text. The same section is
translated in `ar/index.html` and uses the shared RTL layout.

The current landing page does not contain a local lead form or sales modal. The primary
conversion action is an external link to the registration route; the page itself does
not create an account, tenant, subscription, or lead record.

## Accessibility and performance

- Semantic sections, a skip link, labelled navigation, descriptive image `alt` text,
  visible focus states, and keyboard-focusable controls.
- `loading="lazy"`, `decoding="async"`, and intrinsic dimensions are used for below-the-fold imagery.
- All animations respect `prefers-reduced-motion`.
- No framework or runtime dependency is required; the page is deployable as static files.

## Design source of truth

The visual language for the landing page is documented in [`DESIGN.md`](DESIGN.md). It follows the reusable design-brief approach from [getdesign.md](https://getdesign.md/) and records the LogicFit direction, tokens, masthead behavior, responsive contract, RTL rules, motion, accessibility, and screen inventory. Read it before adding or restyling a page so the experience stays connected to the product rather than drifting into a generic template.

## Customising

- **Brand accent** — change the semantic color tokens in `assets/css/style.css` (both themes).
- **Page copy** — edit the matching English and Arabic sections in `index.html` and
  `ar/index.html` without changing their shared ids or routes.
- **Add a language** — copy a page, set `<html lang dir>`, translate the content, and add
  a matching `html[lang="xx"]` font block in `style.css`.

## Documentation

التفاصيل الكاملة للصفحات والأقسام وكل تفاعل وعقد التخزين المحلي والاختبارات موجودة في
[docs/COMPLETE-LANDING-DOCUMENTATION.md](docs/COMPLETE-LANDING-DOCUMENTATION.md).

---

© 2026 LogicFit · Gym management platform.
