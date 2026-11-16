# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML + CSS + JavaScript, no frameworks, no server (per CLAUDE.md §6). Must deploy free on Netlify, Vercel or GitHub Pages and work when `index.html` is opened directly from disk. All editable business data (menu, prices, delivery zones, hours, WhatsApp number, `mostrarAlcohol`, `recargoBBQ`, Instagram) lives in one data file.

## Users

Families in Urbanización Renacer (about 300 households) and neighboring urbanizations (Jardines del Salado, Girasoles) in Guayaquil, Ecuador. They arrive on a mid-range phone over mobile data, from a link posted in the urbanization's WhatsApp group, usually Friday to Sunday evening, wanting to order food for themselves, a couple, or a group of four.

## Product Purpose

A catalog that builds a WhatsApp order. The visitor browses combos and menu, assembles a cart, picks a delivery zone (or pickup), writes name and address, and taps "Enviar pedido por WhatsApp", which opens a chat with 099 020 4178 with the order already written. Success: a complete, correctly totaled message lands in the business's WhatsApp. Everything after (confirmation, GPS location, delivery time) happens by a person in the chat, not on the page.

## Positioning

The neighborhood's own street-food window: boneless, chicken tenders and micheladas served from the door of a small local in Cdla. Renacer, with free delivery inside Renacer. It is from the barrio, for the barrio.

## Operating Context

- Local: Cdla. Renacer, Mz. 147 Villa 10, Guayaquil. Customers do not enter; service is from the door. Opened Friday 13 November 2026, after starting as delivery only.
- Hours: Friday, Saturday, Sunday, 6 to 11 pm (Ecuador time, UTC-5). When closed, the page says so ("abrimos hoy a las 6 pm" on Fri–Sun before 6 pm, otherwise "abrimos el viernes a las 6 pm") but still lets people build an order.
- Orders: WhatsApp 099 020 4178 (`593990204178`), via `https://wa.me/593990204178?text=...`.
- Delivery: Renacer free; Jardines del Salado $1.00; Girasoles $1.00; pickup at the local free. One shipping charge per order.

## Capabilities and Constraints

- No online payments, login, accounts or server. Page logic stays minimal: build the message and open WhatsApp.
- Does not ask for GPS, estimate delivery times, or mark orders as confirmed. After sending it shows: "Te vamos a responder por WhatsApp para confirmar tu pedido y el tiempo de entrega."
- Cart persists in `localStorage` and empties after sending.
- Boneless and tenders come with fries and one free 2 oz sauce (BBQ, Hot honey, Ranch, Clásica), natural or bathed in BBQ. BBQ bath has no surcharge (confirmed), kept configurable.
- Alcohol sale is permitted (confirmed). Alcohol items and "combos con chela" remain hideable with one switch (`mostrarAlcohol`) and carry "Solo para mayores de 18 años".
- Combo sauce counts: Mixto 2, Pareja 2, Parche 4, Boneless + Chela 1, Tenders + Chela 1, Mixto + Chela 2, Pareja Chelera 2, Parche Chelero 4 (confirmed). Combos let the customer choose natural or BBQ (confirmed).
- All copy in Spanish (Ecuador), close and neighborhood tone.

## Brand Commitments

- Name written PikayPasa; logo is the word PIKAYPASA on one line in Anton, uppercase; on black, PIKAY in bone #EDE6DA and PASA in orange #FF6A13. Text or SVG only, no invented icon. Never the old lowercase "pikay.pasa" or tender icons.
- Palette "Naranja crujiente": black #111111 (main ground), orange #FF6A13 (accents only: buttons, prices, details), bone #EDE6DA (text on black, light grounds), dark orange #C2410C (orange text on light grounds). Never the old mustard/red/brown palette.
- Type: Anton for the logo only; Sora 800 for headings; Sora 400 for body.
- Style per brief: dark, high contrast, direct and appetizing; big orange prices, thick buttons, little decoration; fast on a mid-range phone on mobile data.

## Evidence on Hand

- Real menu and prices (CLAUDE.md §3), real address, hours and WhatsApp number.
- No product photos yet; the owner asked not to generate images for now. No social accounts yet: Instagram field exists in data, left blank and hidden until filled.
- Must never show: costs, margins, profits, purchase or sales data, customer names, or finished promos (the opening promo for the first 5 orders is over). No testimonials or invented claims.

## Product Principles

1. The order message is the product: every choice on the page exists to make that WhatsApp text complete and correct.
2. The owner edits one data file, never the design.
3. Phone first, data-light: it must load and work fast on mobile data from a WhatsApp link.
4. Combos lead, because they sell most.
5. Say only what is true: real prices, real hours, nothing invented.

## Accessibility & Inclusion

Strong contrast, touch targets at least 44 px tall, alt text on any image, usable one-handed on a phone.
