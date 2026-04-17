# Design System Document: The Silent Curator

## 1. Overview & Creative North Star
This design system is built upon the philosophy of **"The Silent Curator."** In an era of digital noise and intrusive data practices, this system acts as a sanctuary for information. We are moving away from the "Dashboard" aesthetic and toward a "High-End Editorial" experience.

The Creative North Star is defined by **intentional absence.** We do not fill space; we curate it. By utilizing aggressive white space (dark space), sophisticated serif-to-sans-serif juxtapositions, and intentional asymmetry, we create a layout that feels human, authoritative, and calm. This system rejects the rigid, boxy constraints of standard Material Design in favor of fluid, tonal layering that guides the eye without shouting.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the "Deep Midnight" spectrum to reduce eye strain and provide a premium, cinematic backdrop for the emerald "Signal."

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders are prohibited for sectioning or defining containers. 
Boundaries must be created through:
- **Tonal Shifts:** Placing a `surface-container-low` element against a `surface` background.
- **Negative Space:** Using the spacing scale to create clear mental groupings.
- **Soft Shadows:** Only when a floating interaction is required.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium cardstock. 
- **Base Layer:** `surface` (#111318) for the main application background.
- **Nesting Tier 1:** `surface-container-low` (#1a1c20) for secondary sidebars or navigation zones.
- **Nesting Tier 2:** `surface-container-lowest` (#0c0e12) for content cards, creating a "sunken" or "embedded" feel that recedes into the background.

### The "Glass & Gradient" Rule
To elevate the "Calm Tech" feel, use **Glassmorphism** for floating elements (e.g., mobile navigation bars, dropdowns). 
- **Style:** Use `surface-container-high` at 70% opacity with a `24px` backdrop-blur. 
- **CTAs:** Use subtle linear gradients for `primary` elements (transitioning from `primary` #4edea3 to `primary-container` #10b981) at a 135-degree angle. This adds a "lithographic" depth that flat hex codes cannot achieve.

---

## 3. Typography: The Editorial Engine
Typography is our primary tool for hierarchy. We use a "Serif-for-Story, Sans-for-System" approach.

- **The Voice (Newsreader):** Used for all `display`, `headline`, and `title-lg` styles. This serif conveys trust, privacy, and an editorial legacy. It slows the reader down, encouraging deep focus rather than scanning.
- **The Engine (Manrope):** Used for `body`, `label`, and `title-sm` styles. This modern sans-serif provides technical precision and high legibility for metadata and system-level actions.

**Hierarchy Note:** Maintain high contrast in scale. A `display-lg` headline should feel significantly more "important" than the metadata below it. Use `on-surface-variant` (#bbcabf) for body text to maintain a soft, low-contrast reading experience that honors the "Calm Tech" requirement.

---

## 4. Elevation & Depth
We replace structural lines with **Tonal Layering.**

- **The Layering Principle:** Depth is achieved by "stacking." A card should not have a shadow by default; it should be defined by being one step lighter or darker than its parent container.
- **Ambient Shadows:** For "floating" components like modals or tooltips, use a shadow with a `48px` blur and `6%` opacity. The shadow color must be a dark indigo-tinted black, never pure #000.
- **The "Ghost Border":** If accessibility requires a container boundary, use `outline-variant` (#3c4a42) at **15% opacity**. It should be barely felt, not seen.

---

## 5. Components

### Cards & Feed Items
- **Structure:** No borders, no dividers. Use `surface-container-low` backgrounds. 
- **Spacing:** Minimum `24px` padding. 
- **Signal Indicator:** Use a `2px` wide vertical pill of `primary` (#4edea3) on the far left of "High Signal" items.

### Buttons
- **Primary:** Gradient fill (Primary to Primary-Container), `8px` (lg) roundedness. Text is `on-primary` (#003824).
- **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
- **Tertiary:** Pure text using `label-md` in `primary` color. Use for low-emphasis actions like "Dismiss."

### Input Fields
- **Background:** `surface-container-lowest`.
- **Active State:** A subtle `1px` "Ghost Border" using `primary` at 40% opacity. 
- **Typography:** Placeholder text must be `on-surface-variant` at 50% opacity.

### Selection Chips
- **Unselected:** `surface-container-high` background, no border.
- **Selected:** `primary-container` background with `on-primary-container` text.
- **Shape:** `full` (pill shape) to contrast against the geometric cards.

### Navigation (Mobile-Responsive)
- **Bottom Bar:** Glassmorphism (`surface-container-high` @ 80% + blur). 
- **Active State:** A single `4px` emerald dot (`primary`) below the icon. No labels unless the icon is non-standard.

---

## 6. Do’s and Don’ts

### Do:
- **Do** lean into asymmetry. Align headers to the left while keeping metadata right-aligned to create "Editorial Tension."
- **Do** use `80px` to `120px` vertical spacing between major sections to allow the user's eyes to rest.
- **Do** use `primary` (#4edea3) only for "The Signal." If everything is green, nothing is important.

### Don’t:
- **Don't** use 100% white (#FFFFFF) for text. It creates "halation" (glow) on dark backgrounds which causes eye fatigue. Use `on-surface` (#e2e2e8).
- **Don't** use dividers or lines to separate list items. Use vertical padding and tonal shifts.
- **Don't** use "Standard" easing. Use `cubic-bezier(0.2, 0, 0, 1)` for all transitions to create a sophisticated, "heavy" feel to animations.

### Accessibility Note:
While we use low-contrast grays for "Calm Tech," ensure all critical reading text (headlines/body) meets a minimum contrast ratio of 4.5:1 against its specific surface-container tier. Use the `primary-fixed` tokens for any text that must remain legible over varying background tones.