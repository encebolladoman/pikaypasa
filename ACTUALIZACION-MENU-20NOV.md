# PikayPasa · Actualización de la web (20 nov 2026)

Brief para Claude Code. Sitio: https://pikaypasa.vercel.app
Estructura actual: `index.html` + `data/menu.js` (objeto global `window.PIKAYPASA`) + `js/app.js`.
**Regla:** casi todo el cambio va en `data/menu.js`. Mantén los nombres de campos que ya existen en ese archivo; solo cambia valores, quita o agrega entradas. Toca `app.js` únicamente para lo que se indica en la sección 3.

---

## 1. Qué cambió en el negocio

- **Salen los tenders.** Ya no se venden (ni sueltos ni en combos).
- **Entran las alitas** (corte BBQ: cada pieza es un muslito o una alita de dos huesos).
- **Sabores, para boneless y alitas:** Naturales · Bañados en BBQ · Bañados en honey mustard. Sin recargo.
- **Todo viene con papas y 1 aderezo de 2 oz gratis** (boneless y alitas, cualquier tamaño). Aderezos: BBQ, Hot honey, Ranch, Clásica.
- **Bebidas nuevas:** Agua $0.50 y Jugos $0.50 (sin alcohol, se muestran siempre).
- Envío, horario, dirección y WhatsApp **no cambian**.

## 2. Datos nuevos para `data/menu.js`

### 2.1 Menú (`menu`)

| id | Nombre | Porciones y precios | Aderezos incl. | Elige sabor | Nota |
|---|---|---|---|---|---|
| `boneless` | Boneless | 5 piezas $3.99 · 8 piezas $5.75 · 10 piezas $6.75 | 1 | sí | Con papas y 1 aderezo de 2 oz gratis. |
| `alitas` | Alitas | 6 piezas $4.99 · 12 piezas $9.80 · 24 piezas + cola 1 L $19.80 | 1 | sí | Con papas y 1 aderezo de 2 oz gratis. |

- **Quitar** la entrada `tenders`.
- Texto de la tarjeta (los dos): "Con papas y 1 aderezo de 2 oz gratis. Naturales, bañados en BBQ o en honey mustard."
- La porción de 24 alitas debe mostrar "+ cola 1 L" en su etiqueta.

### 2.2 Sabores

La opción que hoy se llama "Cómo los quieres" (Naturales / Bañados en BBQ) pasa a tener **3 opciones**:
1. Naturales
2. Bañados en BBQ
3. Bañados en honey mustard

- Si hoy están en el código como texto fijo, muévelas a un arreglo en `menu.js` (por ejemplo `sabores`) y úsalo en todo el sitio.
- `recargoBBQ` sigue en 0. Si se generaliza, que sea un recargo por salsa (BBQ o honey mustard), también en 0 por ahora.

### 2.3 Combos sin michelada (`combos`)

| id | Nombre | Descripción | Precio | Por separado | Ahorras | Aderezos |
|---|---|---|---|---|---|---|
| `mixto` | Mixto | 5 boneless + 6 alitas + papas + 2 aderezos | $8.49 | $8.98 | $0.49 | 2 |
| `pareja` | Combo Pareja | Boneless 8 + Alitas 6, cada uno con papas y aderezo | $9.99 | $10.74 | $0.75 | 2 |
| `parche` | Combo Parche (4 personas) | Boneless 10 + Alitas 12 + papas + 4 aderezos | $15.99 | $18.55 | $2.56 | 4 |

Agregar el campo de "por separado" a estos combos si hoy no lo tienen, para mostrar "Por separado $X · ahorras $Y" igual que en los combos con chela.

### 2.4 Combos con chela (`combosChela`) · +18

| id | Nombre | Descripción | Precio | Por separado | Aderezos |
|---|---|---|---|---|---|
| `boneless-chela` | Boneless + Chela | Boneless 5 + 1 michelada Coronita | $5.75 | $6.49 | 1 |
| `alitas-chela` | Alitas + Chela | Alitas 6 + 1 michelada Coronita | $6.75 | $7.49 | 1 |
| `mixto-chela` | Mixto + Chela | Mixto + 1 michelada Coronita | $10.25 | $10.99 | 2 |
| `pareja-chelera` | Pareja Chelera | Combo Pareja + 2 micheladas Coronita | $13.99 | $14.99 | 2 |
| `parche-chelero` | Parche Chelero (4 personas) | Combo Parche + 4 micheladas Coronita | $23.99 | $25.99 | 4 |

- **Quitar** `tenders-chela`. Todos siguen con escarchado (clásico o picante) y marcados como alcohol.

### 2.5 Extras y bebidas (`extras`)

| id | Nombre | Precio | Alcohol | Nota |
|---|---|---|---|---|
| `aderezo-extra` | Aderezo extra | $1.00 | no | 2 oz, del sabor que quieras. |
| `michelada` | Michelada Coronita | $2.50 | sí | Escarchado clásico o picante. |
| `cerveza` | Cerveza Coronita sola | $1.50 | sí | |
| `agua` | Agua | $0.50 | no | Nuevo. |
| `jugo` | Jugos | $0.50 | no | Nuevo. Sabores: **por confirmar** (dejar sin selector por ahora o con texto "pregunta los sabores del día"). |

- El aviso +18 de la sección debe quedar solo sobre michelada y cerveza, no sobre agua y jugos.
- Si `mostrarAlcohol` es false, agua y jugos siguen visibles.

### 2.6 Sin cambios
- `negocio`, `horario` (vie, sáb y dom, 6 a 11 pm), `envios` (Renacer gratis · Jardines del Salado $1.00 · Girasoles $1.00 · Retiro en el local gratis), `aderezos`, `escarchados`.

## 3. Cambios en la lógica (`js/app.js`)

1. **Selector de sabor en combos con boneless y alitas** (Mixto, Pareja, Parche y sus versiones con chela): un selector de sabor para los boneless y otro para las alitas.
2. **Alitas 24: mitad y mitad.** Permitir elegir dos sabores (12 + 12). Si es complejo, basta con un segundo selector opcional "Sabor de la otra mitad".
3. **Mensaje de WhatsApp:** cada línea debe llevar el sabor y el aderezo. Ejemplo:
   ```
   ¡Hola PikayPasa! Quiero pedir:
   • 1 × Alitas 12 (bañadas en honey mustard) · aderezo Ranch — $9.80
   • 1 × Boneless 8 (naturales) · aderezo BBQ — $5.75
   • 2 × Agua — $1.00
   Subtotal: $16.55
   Envío (Jardines del Salado): $1.00
   Total: $17.55
   Nombre: …
   Dirección: Mz. … Villa …
   Nota: …
   ```
4. Quitar cualquier referencia fija a "tenders" en el código (ids, anclas, textos).

## 4. Textos y metadatos

| Lugar | Hoy | Nuevo |
|---|---|---|
| `<title>` | PikayPasa · Boneless, tenders y micheladas en Renacer | PikayPasa · Boneless, alitas y micheladas en Renacer |
| meta description / og:description | menciona tenders | "Boneless y alitas con papas y aderezo gratis, naturales o bañados en BBQ o honey mustard. Micheladas. Pide por WhatsApp. Vie, sáb y dom de 6 a 11 pm. Envío gratis en Renacer." |
| Hero, título | Boneless, tenders y micheladas en tu urbanización | Boneless, alitas y micheladas en tu urbanización |
| Hero, debajo del título | — | Agregar: "Todo viene con papas + 1 aderezo gratis" |
| Navegación | … Boneless · Tenders … | … Boneless · Alitas … (ancla `#p-alitas`) |

## 5. Mejoras recomendadas (además de la actualización)

1. **Imagen para compartir (`og:image`).** Hoy no hay. Cuando alguien pega el link en WhatsApp no sale foto. Agregar una imagen de 1200 × 630 (puede salir del Post 6 del canvas) y las etiquetas `og:image`, `og:image:width`, `og:image:height` y `twitter:card`.
2. **Favicon propio.** El actual es un ícono genérico de color #C6613F que no es de la marca. Usar una "P" o "PP" en Anton, naranja #FF6A13 sobre negro #111111.
3. **Enlaces vacíos.** Instagram y otro enlace del pie apuntan a `#`. Si no hay Instagram, ocultarlos (`negocio.instagram` vacío = no mostrar).
4. **Fotos de producto.** No hay ninguna imagen. Aunque sea una foto real por producto (boneless y alitas) sube mucho la conversión. Formato WebP, ancho máximo 800 px, `loading="lazy"`.
5. **Aviso de tiempo para alitas.** Las alitas tardan más en freír. Agregar en "Cómo pedir": "Las alitas tardan un poco más; te confirmamos el tiempo por WhatsApp."
6. **Permiso de alcohol.** `mostrarAlcohol` está en true. Confirmar que ya está el permiso; si no, ponerlo en false.

## 6. Identidad (para cualquier pieza nueva)

- Colores: negro #111111 · naranja #FF6A13 (sobre fondo claro, texto naranja #C2410C) · hueso #EDE6DA.
- Tipografía: Anton (logo "PIKAY" hueso + "PASA" naranja), Sora ExtraBold (títulos), Sora Regular (textos).
- WhatsApp: 099 020 4178 (`593990204178`). Dirección: Cdla. Renacer, Mz. 147 Villa 10, Guayaquil.

## 7. Cómo verificar antes de publicar

- No queda la palabra "tenders" en ningún archivo: `grep -ri tenders .`
- Cada producto con sabor muestra las 3 opciones; Alitas 24 dice "+ cola 1 L".
- Los "ahorras" de cada combo coinciden con la tabla.
- Un pedido de prueba arma bien el mensaje de WhatsApp con sabor, aderezo, envío y total.
- Con `mostrarAlcohol: false` se ocultan michelada, cerveza y combos con chela, pero agua y jugos siguen.
- Se ve bien en el celular (390 px de ancho).
