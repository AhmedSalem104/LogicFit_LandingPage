# LogicFit Landing Page Design Contract

This document is the local, AI-readable design source of truth for the LogicFit landing page. It follows the `DESIGN.md` approach described by [getdesign.md](https://getdesign.md/): define the visual language, the reasoning behind it, and the rules that keep future pages consistent.

## Product brief

- Product: LogicFit, a SaaS operating system for modern gyms.
- Audience: gym owners, managers, reception teams, coaches, and members.
- Page job: make the operational value clear in one scan and move qualified gym teams to the free-trial registration flow.
- Stack constraint: static HTML, CSS, and vanilla JavaScript. Do not migrate frameworks or change backend contracts.
- Routes in scope: `/` (English) and `/ar/` (Arabic, RTL).

## Visual direction

**Operational athletic premium.** LogicFit should feel like the control room behind a high-performing gym: precise, calm, and confident. The interface uses a themed operations masthead and capability showcase, then opens into quiet content surfaces for proof, outcomes, and the member journey.

The direction borrows the useful qualities of premium automotive precision, athletic editorial confidence, and structured enterprise blue systems without copying any reference site. It avoids generic dashboard gradients, oversized marketing cards, and decorative chrome.

### Signature

The memorable device is the **connected operations line**: a full-width masthead that visually belongs to the hero, becomes a compact surface after scrolling, and keeps the current content area highlighted. The same blue signal is reused for the progress line, active navigation, live status, and primary action.

### Layout concept

One continuous operating story: the navigation and hero form one masthead, a compact proof rail validates the promise, outcome panels explain the value, the capability inventory proves breadth, and role/journey sections show how the system works in real life.

```text
FULL-WIDTH MASTHEAD
  brand | section navigation + active signal | language / access / primary action
  hero statement + operational image + live metric
PROOF RAIL
  trial signal | connected metrics | market promise
OUTCOMES -> CAPABILITY INVENTORY -> ROLE JOURNEY -> STORY / FAQ -> CTA
```

## Tokens

Use CSS custom properties from `assets/css/style.css`. Do not add one-off hex values inside page components.

### Color roles

| Role | Token | Value / intent |
| --- | --- | --- |
| Primary action | `--lf-action-primary-background` | `#1769E8`; the single confident action signal |
| Brand text | `--lf-text-brand` | LogicFit blue for labels and active states |
| Hero ink | `--lf-color-ink-deep` | `#020B18`; deep operational canvas |
| Hero surface | `--lf-color-ink` | `#061322`; layered dark surface |
| Light canvas | `--lf-color-canvas` | `#F7F9FC`; quiet page background |
| Light surface | `--lf-color-surface` | `#FFFFFF`; content surfaces |
| Blue support | `--lf-color-blue-soft` | `#65ACFF`; dark-theme/CTA support text |
| Semantic status | `--lf-color-success`, `--lf-color-warning`, `--lf-color-danger`, `--lf-color-info` | State is always supported by text or icon, never color alone |

### Typography

- Typeface: Cairo, already loaded by the product; no new font dependency.
- Display: 800-900 weight, tight tracking, used for the hero thesis and section headlines.
- Body: 400-600 weight, 1.58-1.86 line-height depending on surface.
- Utility: 700-900 weight, compact labels and short navigation names.
- English display headings may use negative tracking; Arabic headings keep natural spacing.
- Keep body text at or above 16px on mobile and avoid lines longer than roughly 75 characters on desktop.

### Spacing, radius, elevation

- Base rhythm: 4px / 8px increments, exposed as `--lf-space-*`.
- Main section rhythm: 120-152px on large desktop, 88-112px on laptop, 76-96px on tablet, and 64-80px on mobile. The rhythm intentionally contracts with the viewport instead of allowing desktop whitespace to overwhelm smaller screens.
- Content cards use a shared 24px desktop inset, reducing to 20px on tablet and 18px on mobile; standard card radius is 16px and featured conversion surfaces may use 24px.
- Radius roles: `--lf-radius-sm` for controls, `--lf-radius-md` for buttons and compact groups, `--lf-radius-lg` for content modules, `--lf-radius-xl` for hero media only.
- Elevation roles: soft shadow for separation, card shadow only for interactive or featured media. The hero image is the strongest elevation on the page.
- Do not stack a card inside a card unless the inner group represents an independent action or data set.

## Component rules

### Masthead and navigation

- The nav is full-width and fixed for access, and its top state is visually matched to the active hero theme so it reads as one masthead.
- After scrolling it becomes a compact themed surface with a clearer bottom rule and shadow.
- Navigation labels map to real content sections: Platform, Features, Solutions, Success, Resources.
- The active item is updated on click, hash navigation, and scroll. It has text, contrast, and a blue positional signal.
- Keep language, login, trial, theme, and menu controls at 44px minimum touch height.
- Mobile uses a single expandable menu, Escape-to-close, outside-click close, and no hover dependency.

### Hero

- The hero is the thesis, not a generic centered title. Keep the operational image, live badge, metric, and direct trial action.
- Use one primary CTA and one quieter discovery action.
- Keep the first viewport visually connected: nav, background field, grid texture, and hero media share the same active theme system.

### Cards and capability inventory

- Use cards to group a clear purpose: KPI, outcome, capability, role, or media story.
- Prefer compact padding, one strong title, and one supporting sentence.
- Capability cards use a large inline SVG as their visual anchor, with a restrained technical texture and accent-specific treatment instead of unrelated stock imagery.
- Interactive cards receive a restrained transform/border response; static cards do not pretend to be clickable.
- Icons are inline SVGs with one consistent stroke language. Emojis are not UI icons.

### Content sections

- Proof is a rail, not a large card wall.
- Features use a dense, scannable inventory with 13 real capabilities.
- Showcase imagery is allowed to carry visual weight; supporting benefits stay compact.
- FAQ uses accessible progressive disclosure with one open answer at a time, keyboard-focusable triggers, and a reduced-motion-safe height transition.
- Mobile adds a compact fixed trial action with safe-area spacing so the primary conversion remains reachable without hiding the final content.

## Responsive contract

Review at 1440, 1280, 1024, 768, 390, and 320px.

- Desktop: full masthead, two-column hero, dense capability grid, balanced max-width of 1180px.
- Laptop: reduce gaps and type before allowing overflow.
- Tablet: collapse the hero to a deliberate single-column story and use the expandable nav below 920px.
- Mobile: preserve hierarchy and touch comfort; make CTA controls full-width where useful; keep the sticky trial action within reach; never squeeze desktop tables/cards into a narrow viewport.
- Minimum page width is 320px. No accidental horizontal scrolling.

## RTL contract

Arabic is a first-class layout. Use logical properties (`margin-inline`, `inset-inline`, `padding-inline`) and explicit direction rules only where visual order needs to remain LTR, such as the brand lockup and numeric utility content. Directional indicators must mirror naturally; do not mirror brand marks.

## Motion and states

- Micro-interactions: 150-300ms, transform/opacity/color only.
- Scroll reveal: short and staggered, never required to understand content.
- The nav transition communicates spatial continuity: transparent hero state -> compact scrolled state.
- All focus, hover, active, pressed, and disabled states must be visible in both themes.
- `prefers-reduced-motion: reduce` disables decorative motion and keeps content immediately available.

## Accessibility and performance

- Maintain the skip link, sequential heading structure, descriptive image alt text, visible focus rings, and semantic links/buttons.
- Do not rely on color alone to convey live, success, warning, or active states.
- Reserve image space with intrinsic dimensions. Lazy-load below-fold imagery; keep the hero image eager.
- Keep the external free-trial URL unchanged: `https://gym-membership-app-smoky.vercel.app/register-gym`.
- Preserve the two routes, existing copy/data, theme storage, language switch, and all current front-end behavior.

## Screen inventory and review status

The current product is a two-route marketing surface, not the authenticated gym dashboard. Both routes share the same screen inventory and presentation system:

| Screen / state | English | Arabic RTL | Status |
| --- | --- | --- | --- |
| Hero + masthead | `/` | `/ar/` | discovered / reviewed / improved / responsive / dark-light / RTL / verified statically |
| Proof and outcomes | `/` | `/ar/` | discovered / reviewed / improved / responsive / dark-light / RTL / verified statically |
| 13-capability inventory | `/` | `/ar/` | discovered / reviewed / improved / responsive / dark-light / RTL / verified statically |
| Showcase and member journey | `/` | `/ar/` | discovered / reviewed / improved / responsive / dark-light / RTL / verified statically |
| Roles, story, FAQ, CTA, footer | `/` | `/ar/` | discovered / reviewed / improved / responsive / dark-light / RTL / verified statically |
| Mobile nav open/closed + keyboard escape | `/` | `/ar/` | discovered / reviewed / improved / responsive / RTL / verified statically |
| Theme light/dark | `/` | `/ar/` | discovered / reviewed / improved / responsive / dark-light / RTL / verified statically |

There are no authenticated dashboard routes, forms, tables, modals, drawers, tabs, filters, pagination controls, toasts, or charts in this landing-page repository. They must not be invented as part of a visual-only pass.
