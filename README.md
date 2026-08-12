# LogicFit — Landing Page

Marketing landing page for **LogicFit**, a gym-management platform that runs an entire
gym from one place and gives members a white-label app carrying the gym's own brand.

Ships in two languages that share a single design system:

- **English / LTR** — `index.html` (for international pitches)
- **Arabic / RTL** — `ar/index.html` (primary MENA market)

A language switcher in the top navigation links the two.

## Structure

```
LogicFit_LandingPage/
├── index.html            # English (LTR) — site root
├── ar/
│   └── index.html        # Arabic (RTL)
├── assets/
│   ├── css/
│   │   └── style.css     # Shared stylesheet (both pages)
│   └── js/
│       └── main.js       # Shared interactions (both pages)
└── README.md
```

Both pages load the **same** `style.css` and `main.js`. Direction is set on the
`<html dir>` attribute and the display typeface is switched per language via
`html[lang="en"]` / `html[lang="ar"]` selectors, so there is no duplicated styling
or scripting to keep in sync.

## Running it

It's a static site — no build step, no dependencies. Either:

- Open `index.html` directly in a browser, **or**
- Serve the folder (recommended, so relative asset paths resolve cleanly):

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000/> (English) or <http://localhost:8000/ar/> (Arabic).

## Design system

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--ember` | `#0063FF` | `#0063FF` | Pacific-blue primary accent used for CTAs and interaction states |
| `--hero` | `#080808` | `#080808` | Deep ink foundation for console and proof sections |
| `--ember-soft` | `#E7EBFF` | `#182C59` | Blue-tinted surfaces for badges and feature icons |
| `--ink` | `#14171C` | `#EDEFF2` | Primary text |
| `--paper` | `#ECEEF1` | `#0E1116` | Page ground (steel-biased neutral) |
| `--steel` | `#2E6E8E` | `#6FB6D6` | Data / chart tone |
| `--good` | `#1F9D6B` | `#39C08A` | "Good" status only — not the accent |

- **Type** — a characterful display face (condensed *Oswald* stack for EN, *Noto Kufi
  Arabic* for AR), a system-UI body face, and a monospace with `tabular-nums` for every
  metric and label. Fonts use system stacks with graceful fallbacks (no external CDN).
- **Theming** — light + dark, driven entirely by CSS custom properties. Respects the OS
  `prefers-color-scheme`; the in-page ◐ button overrides it via `data-theme` on `<html>`.
- **Motion** — count-up stats, a Canvas subscription-growth sparkline, growing volume
  bars, and scroll reveals. All disabled under `prefers-reduced-motion`.

## Interactive white-label demo

The "Your app. Your name." section has a live demo: tapping a brand swatch recolours the
member-app mock (`--brand` CSS variable) and swaps its name + logo initial — the fastest
way to show a prospect what their own branded app would look like.

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
