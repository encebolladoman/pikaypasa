---
name: PikayPasa
description: The neighborhood street-food window, a roll-up shutter that rises at 6 pm over a lit bone counter.
colors:
  negro: "#111111"
  naranja: "#FF6A13"
  hueso: "#EDE6DA"
  naranja-osc: "#C2410C"
  acero: "#2A2826"
  acero-sombra: "#191817"
  acero-luz: "#3D3A36"
  hueso-suave: "rgba(237, 230, 218, 0.74)"
  hueso-linea: "rgba(237, 230, 218, 0.22)"
  negro-suave: "rgba(17, 17, 17, 0.72)"
  negro-linea: "rgba(17, 17, 17, 0.2)"
typography:
  logo:
    fontFamily: "Anton, Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(3.75rem, 19vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  display:
    fontFamily: "Sora, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 9.2vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Sora, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.125rem, 9vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Sora, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  price:
    fontFamily: "Sora, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  body:
    fontFamily: "Sora, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Sora, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 800
    lineHeight: 1.2
rounded:
  sm: "3px"
  none: "0px"
spacing:
  gutter-phone: "16px"
  gutter-desk: "32px"
  section-phone: "56px"
  section-desk: "80px"
  item: "20px"
components:
  button-primary:
    backgroundColor: "{colors.naranja}"
    textColor: "{colors.negro}"
    rounded: "{rounded.sm}"
    padding: "12px 22px"
    height: "52px"
    typography: "{typography.label}"
  button-primary-large:
    backgroundColor: "{colors.naranja}"
    textColor: "{colors.negro}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
    height: "60px"
  button-on-bone:
    backgroundColor: "{colors.negro}"
    textColor: "{colors.hueso}"
    rounded: "{rounded.sm}"
    padding: "12px 22px"
    height: "52px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.hueso}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "44px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.hueso}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.hueso}"
    textColor: "{colors.negro}"
    rounded: "{rounded.sm}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.negro}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
    height: "52px"
  section-nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.hueso}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "44px"
  section-nav-link-active:
    backgroundColor: "{colors.hueso}"
    textColor: "{colors.negro}"
  order-bar:
    backgroundColor: "{colors.negro}"
    textColor: "{colors.hueso}"
    height: "72px"
  order-panel:
    backgroundColor: "{colors.hueso}"
    textColor: "{colors.negro}"
    rounded: "{rounded.none}"
    width: "560px"
---

# Design System: PikayPasa

## Overview

**Creative North Star: "The Shutter and the Window"**

The page is the door of the local at night. A black street, a painted sign band with the PIKAYPASA wordmark, a corrugated steel shutter drawn in CSS stripes, and below it the one lit thing on the block: a bone counter framed in steel where the combos are set in black type with big dark-orange prices. Everything else on the page is the night around that window. When the local is open the shutter rolls up on load; when it is closed it stays down to the hanging state tag and the light goes out.

The system is dense, flat and loud in the way a street sign is loud: huge tight Sora 800 headings, prices as the largest thing in each row, thick flat buttons, 2px rules between items instead of cards. There are no photos and no decoration that is not part of the storefront itself (shutter slats, handle, sill, jambs, the hanging tag on its two wires). Every ground carries exactly two inks.

It refuses the default fast-food page: no hero over a grid of rounded product cards, no gradients-as-decoration, no third accent color.

**Key Characteristics:**
- Black ground, one bone window; the window is the only light.
- Two inks per ground: bone and orange on black, black and dark orange on bone.
- Shutter slats, steel jambs and a steel sill are the frame language.
- Lists separated by thick 2px rules, never cards.
- Square-cut corners (3px), thick flat buttons, 44px minimum targets.
- Motion is vertical only: things rise and drop like the shutter.

## Colors

A four-color street palette, "Naranja crujiente", plus three steel tones that exist only to draw the storefront.

### Primary
- **Crisp Orange** (naranja): the accent on black. Primary buttons (black text on it), prices, step numbers, the sign band's bottom stripe, the order bar's top edge, delivery costs, focus rings on black.

### Secondary
- **Burnt Counter Orange** (naranja-osc): orange as it must read on bone. Prices inside the window and the order panel, the "agregado" button state on bone, the "falta" warning, focus rings on bone, the live-state dot on the tag.

### Neutral
- **Night Black** (negro): the main ground of the page, the sign band, the order bar; the text and button ink on bone.
- **Bone** (hueso): text on black; the ground of the window, the hanging tag and the order panel.
- **Shutter Steel** (acero): slat face, window jambs and sill, shutter edge.
- **Steel Shadow** (acero-sombra): slat gaps, the handle, the closed-state ground.
- **Steel Highlight** (acero-luz): the 1px slat highlight and scrollbar thumb.
- **Bone Soft / Bone Line** (hueso-suave, hueso-linea): secondary text and 2px rules on black. They are bone at reduced alpha, not a new ink.
- **Black Soft / Black Line** (negro-suave, negro-linea): secondary text and rules on bone, same logic.

### Named Rules
**The Two Inks Rule.** On black, only bone and orange. On bone, only black and dark orange. Alpha tints of the ground's own ink are allowed for secondary text and rules; a third hue is not.

**The One Light Rule.** Bone is a ground only where something is lit: the window, the hanging tag, the order ticket. Every other section stays black.

**The Orange Is Not Text On Bone Rule.** Bright orange (#FF6A13) never sets text on bone; it switches to dark orange.

## Typography

**Logo Font:** Anton (with Oswald, Arial Narrow)
**Display / Body Font:** Sora 800 and 400 (with system-ui, Segoe UI)

**Character:** Anton is the painted sign and appears nowhere else. Sora at 800 with tight negative tracking does all the shouting; Sora 400 does the explaining. Only two weights of Sora are loaded.

### Hierarchy
- **Logo** (Anton 400, clamp(3.75rem, 19vw, 7.5rem), 0.95): the PIKAYPASA wordmark, PIKAY in bone and PASA in orange on black. Sign band and footer only.
- **Display** (Sora 800, clamp(2rem, 9.2vw, 4.25rem), 1.02, -0.035em): the line written on the shutter. Max 14ch phone, 18ch desktop.
- **Headline** (Sora 800, clamp(2.125rem, 9vw, 3.75rem), 1, -0.04em): section titles. Subheads step down to clamp(1.5rem, 6vw, 2.125rem).
- **Title** (Sora 800, 1.5rem, 1.1): product names; menu mains scale to clamp(2rem, 8vw, 2.75rem).
- **Price** (Sora 800, 2rem, tabular numerals): the largest element in each product row; menu mains clamp(2.25rem, 9vw, 3rem).
- **Body** (Sora 400, 1rem, 1.5): descriptions, max 46 to 60ch.
- **Label** (Sora 800, 0.875 to 0.9375rem): buttons, chips, nav links, option legends, the +18 seal. Sentence case, no uppercase tracking.

### Named Rules
**The Sign Only Rule.** Anton is the logo. Headings, numbers and buttons are Sora.

**The Price Is The Headline Rule.** In every product row the price is at least as large as the name, in tabular numerals, in the ground's orange.

## Layout

Single column on phones with a 16px gutter; at 760px and up the gutter becomes 32px and content sits in a 1120px container. Sections breathe at 56px top / 64px bottom on phone, 80 / 88 on desktop. Product lists are grids of rule-topped rows: one column on phone; on desktop combos go two columns (56px gap), menu mains two (48px), extras three (40px). The window is inset from the viewport by a steel jamb gap (0 on phone, clamp(16px, 3vw, 48px) on desktop) with 6px jambs (12px desktop) and a 16px sill. Fixed chrome: the order bar (72px) along the bottom on phone, centered at max 560px on desktop; the order panel is a bottom sheet up to 560px wide and 92dvh tall. Safe-area insets are respected on every fixed element.

## Elevation & Depth

Flat by default. Depth comes from the storefront itself: the slat stripes, the steel jambs, and a radial bone glow under the shutter that reads as light spilling from the window. Soft shadows appear only on things that hang or float over the street.

### Shadow Vocabulary
- **Hanging tag** (`box-shadow: 0 6px 16px rgba(0,0,0,0.45)`): the state tag hanging from the shutter.
- **Floating over the street** (`box-shadow: 0 6px 18px rgba(0,0,0,0.5)` / `0 -8px 24px rgba(0,0,0,0.5)`): the WhatsApp button and the order bar.
- **Painted-on legibility** (`text-shadow: 0 2px 10px rgba(0,0,0,0.55)`): the display line over the slats.
- **Closed window** (`box-shadow: inset 0 28px 28px -16px rgba(17,17,17,0.28)`): the shadow the lowered shutter casts into the window.

### Named Rules
**The No Cards Rule.** Content sits on its ground separated by 2px rules. Nothing is lifted into a shadowed card.

## Shapes

Square-cut forms: buttons, chips, fields, nav links and seals share a barely softened 3px corner; the window, the order panel and the shutter are fully square. Borders are thick (2px everywhere) and drawn in currentColor or the ground's line tint. The sign band and footer shutter end in a 6px orange stripe; the order bar and panel carry a 4px / 6px orange top edge. The shutter is a repeating 18px vertical cycle: 13px steel, 1px highlight, 4px shadow.

## Components

### Buttons
Thick, flat, confident.
- **Shape:** square-cut (3px), no border.
- **Primary (on black):** orange ground, black Sora 800 at 1.0625rem, min height 52px; large variant 60px.
- **On bone:** inverts to black ground with bone text; the added state turns dark orange with bone text. On black the added state turns bone with black text.
- **Hover / Active:** background shift on hover-capable devices; press nudges 1px down. Disabled uses the black line tint.
- **Outline ("Elegir y agregar"):** transparent with a 2px currentColor border, 44px; hover fills with the opposite ink.
- **Text button:** Sora 800 with a 2px underline at 4px offset. **Icon button:** 44px square with 2px currentColor border.

### Chips
- **Style:** 44px min, 2px line-tint border, Sora 400 0.9375rem with prices in 800.
- **Selected:** fills with the ground's opposite ink (bone on black, black on bone) and goes to 800.

### Inputs / Fields
- **Style:** transparent, 2px black border, 3px corner, 52px min, 16px text (prevents iOS zoom). Selects use a drawn chevron in the ground's ink.
- **Focus:** 3px dark orange outline at 1px offset. Delivery-zone radios are full-width bordered rows that darken their border and take a 6% black wash when chosen.

### Navigation
The sticky section rail: black band with a 2px bone-line bottom rule, a horizontally scrolling row of 44px bordered links (Sora 800, 0.9375rem). The current section fills bone with black text. It stays hidden until the visitor scrolls past the shutter, then drops in from above (320ms); it also appears when focused by keyboard.

### The Shutter (signature)
Sign band over a CSS slat shutter carrying the display line, the "Delivery gratis" strip and the primary button, ending in a steel edge with a handle. A bone state tag hangs from it on two bone wires. Open: the shutter rolls up on load (680ms, translateY 132px to 0) and the tag drops in after it; the window glows below. Closed: the shutter stays down to the tag, the glow goes out, the handle becomes a lock, and the tag's dot becomes a hollow ring. Reduced motion skips the roll.

### The Window and the Ticket (signature)
The window is a bone section framed by steel jambs and sill, holding the combos. The order bar rises from the bottom once something is in the cart; its total nudges up on each add. The order panel is a bone ticket with an orange top edge that slides up from the counter (420ms); the backdrop dims the street to 72% black.

### Floating WhatsApp
A 60px orange button with the black WhatsApp mark, bottom right. Hidden until the visitor passes the shutter, then rises in; it drops away again once the order bar is showing.

## Do's and Don'ts

### Do:
- **Do** keep two inks per ground: bone and orange on black, black and dark orange (#C2410C) on bone.
- **Do** separate list items with 2px rules (bone line on black, black on bone).
- **Do** frame any bone window with steel jambs and a sill; draw the shutter with the 13/1/4px slat stripe.
- **Do** make prices the largest element in a product row, Sora 800 with tabular numerals.
- **Do** keep every target at least 44px tall and buttons 52px or 60px.
- **Do** move things only on the vertical axis (rise, drop, slide up), with the `cubic-bezier(0.16, 1, 0.3, 1)` ease, and drop the motion under reduced motion.
- **Do** keep the sticky section nav and floating WhatsApp hidden until the visitor scrolls past the shutter.

### Don't:
- **Don't** use Anton for anything but the PIKAYPASA wordmark.
- **Don't** set bright orange text on bone.
- **Don't** introduce a third hue, a gradient fill on a component, or a rounded card.
- **Don't** round corners beyond 3px on buttons, chips, fields or panels.
- **Don't** animate horizontally, scale, or rotate.
- **Don't** add invented icons or decoration outside the storefront materials (shutter, steel, tag, rules); icons are inline stroked SVG, and the WhatsApp mark is the only brand glyph.
