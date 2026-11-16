# PikayPasa: página web del negocio

Este archivo explica el negocio y lo que debe tener la página. Léelo completo antes de escribir código. Todo el texto de la página va en **español (Ecuador)**, con un tono cercano y de barrio.

## 1. El negocio

- **Nombre:** PikayPasa (se escribe así; en el logo va "PIKAYPASA").
- **Qué es:** comida al paso con **boneless**, **chicken tenders** y **micheladas**. Empezó con delivery y abrió un local pequeño el viernes 13 de noviembre de 2026.
- **Local:** Cdla. Renacer, Mz. 147 Villa 10. Los clientes no entran: se atiende desde la puerta.
- **Pedidos por WhatsApp:** 099 020 4178 (formato internacional: `593990204178`).
- **Horario:** viernes, sábado y domingo, de 6 a 11 pm.
- **Delivery por urbanización** (ver sección 2.1): gratis en Renacer; $1.00 en Jardines del Salado y en Girasoles. Retiro en el local, gratis.
- **Público:** la urbanización Renacer (unas 300 familias) y las urbanizaciones vecinas. La mayoría verá la página en el celular, desde un enlace en el grupo de WhatsApp de la urbanización.

## 2. Objetivo de la página

Es un **catálogo para pedir por WhatsApp**. No hay pagos en línea, inicio de sesión ni servidor. **La lógica de la página tiene que ser mínima:** la página solo arma el mensaje y abre WhatsApp. Todo lo demás lo resuelve una persona en el chat.

El cliente:
1. ve el menú y los combos,
2. agrega productos y combos al carrito,
3. elige su urbanización (o retiro en el local) y escribe su nombre y dirección (manzana y villa),
4. ve el desglose: subtotal + envío = total,
5. toca **"Enviar pedido por WhatsApp"** y se abre un chat directo con el 099 020 4178 con el mensaje ya escrito (`https://wa.me/593990204178?text=...`, con el texto codificado con `encodeURIComponent`).

**Lo que pasa después no es parte de la página:** quien atiende el WhatsApp responde para confirmar el pedido, pide la ubicación GPS y da un tiempo aproximado de entrega. Por eso la página **no** pide GPS, no calcula tiempos de entrega y no marca el pedido como "confirmado". Al enviar, muestra un aviso corto: "Te vamos a responder por WhatsApp para confirmar tu pedido y el tiempo de entrega."

### 2.1 Envío por urbanización

En el carrito, un selector obligatorio "¿Dónde lo entregamos?":

| Opción | Costo de envío |
|---|---|
| Renacer | Gratis |
| Jardines del Salado | $1.00 |
| Girasoles | $1.00 |
| Retiro en el local (Cdla. Renacer, Mz. 147 Villa 10) | Gratis |

- Guarda esta lista en el archivo de datos, junto al menú, para poder agregar urbanizaciones o cambiar los precios después.
- El costo de envío se suma una sola vez por pedido, sin importar cuántos productos tenga.
- Si elige "Retiro en el local", no se pide la dirección.
- El botón de enviar se activa solo cuando hay productos, una urbanización elegida y nombre (y dirección, si es delivery).

Desglose que se ve en el carrito:
```
Subtotal            $13.99
Envío (Girasoles)    $1.00
Total               $14.99
```
Con Renacer, la línea dice "Envío (Renacer): Gratis".

### 2.2 Mensaje de WhatsApp

Ejemplo del mensaje que se genera:
```
¡Hola PikayPasa! Quiero hacer este pedido:

- 1 × Combo Pareja: $8.99
- 2 × Michelada Coronita (escarchado picante): $5.00
Aderezos: BBQ, Ranch

Subtotal: $13.99
Envío (Girasoles): $1.00
TOTAL: $14.99

Nombre: Ana
Entrega: Delivery, Girasoles, Mz. 12 Villa 4
Nota: sin cebolla en la michelada

Quedo atento a la confirmación.
```
Si es retiro: `Entrega: Retiro en el local` y la línea de envío dice `Envío: Gratis (retiro)`. Incluye la nota solo si el cliente escribió una (campo opcional en el carrito).

## 3. Menú y precios (en dólares)

Todos los boneless y tenders vienen **con papas y 1 aderezo de 2 oz gratis**. Aderezos para elegir: **BBQ, Hot honey, Ranch o Clásica**. Se pueden pedir **naturales o bañados en BBQ** (si hay recargo por bañarlos, aún no está decidido: déjalo configurable y sin recargo por ahora).

### Boneless
| Porción | Precio |
|---|---|
| 5 piezas | $3.99 |
| 8 piezas | $5.75 |
| 10 piezas | $6.75 |

### Tenders
| Porción | Precio |
|---|---|
| 3 piezas | $4.25 |
| 5 piezas | $6.25 |
| 7 piezas | $7.99 |

### Extras y bebidas
| Producto | Precio |
|---|---|
| Aderezo extra | $1.00 |
| Michelada Coronita (escarchado clásico o picante) | $2.50 |
| Cerveza Coronita sola | $1.50 |

### Combos
| Combo | Qué trae | Precio |
|---|---|---|
| Mixto | 5 boneless + 3 tenders + papas + 2 aderezos | $7.50 |
| Combo Pareja | Boneless 8 + Tenders 3 | $8.99 |
| Combo Parche (4 personas) | Boneless 10 + Tenders 7 + 4 aderezos | $14.99 |

### Combos con chela (michelada Coronita)
| Combo | Qué trae | Precio | Por separado |
|---|---|---|---|
| Boneless + Chela | Boneless 5 + 1 michelada | $5.75 | $6.49 |
| Tenders + Chela | Tenders 3 + 1 michelada | $5.99 | $6.75 |
| Mixto + Chela | Mixto + 1 michelada | $9.50 | $10.00 |
| Pareja Chelera | Combo Pareja + 2 micheladas | $12.99 | $13.99 |
| Parche Chelero | Combo Parche + 4 micheladas | $22.99 | $24.99 |

En los combos con chela, muestra el precio "por separado" tachado para que se vea el ahorro.

**Alcohol:** todo lo que lleve cerveza o michelada debe decir "Solo para mayores de 18 años". Pon un aviso visible en esa sección. El permiso para vender alcohol todavía está por confirmar, así que las bebidas con alcohol y los combos con chela deben poder **ocultarse con un solo cambio** (por ejemplo, una opción `mostrarAlcohol: true/false` en el archivo de datos).

**Importante:** guarda el menú, los precios, el horario y el número de WhatsApp en **un solo archivo de datos** (por ejemplo `data/menu.json` o `menu.js`) para que el dueño pueda cambiar un precio sin tocar el diseño.

## 4. Marca

### Logo
- La palabra **PIKAYPASA** en una sola línea, en **Anton**, todo en mayúsculas.
- Sobre fondo negro: **PIKAY** en hueso (#EDE6DA) y **PASA** en naranja (#FF6A13).
- Hazlo como texto o como SVG con esas fuentes y colores; no inventes un ícono.
- No uses la versión vieja en minúsculas ("pikay.pasa") ni íconos de tenders.

### Colores ("Naranja crujiente")
| Color | Hex | Uso |
|---|---|---|
| Negro | #111111 | Fondo principal |
| Naranja | #FF6A13 | Solo acentos: botones, precios, detalles |
| Hueso | #EDE6DA | Textos sobre negro, fondos claros |
| Naranja oscuro | #C2410C | Texto naranja cuando va sobre fondo claro (para que se lea) |

No uses la paleta vieja (mostaza, rojo, café).

### Tipografía (Google Fonts)
- **Anton**: solo el logo.
- **Sora ExtraBold (800)**: títulos.
- **Sora Regular (400)**: textos.

### Estilo
Oscuro, con mucho contraste, directo y con apetito: precios grandes en naranja, botones gruesos, poca decoración. Se tiene que ver bien y cargar rápido en un celular de gama media con datos móviles.

## 5. Secciones de la página

1. **Inicio:** logo, una frase corta (por ejemplo "Boneless, tenders y micheladas en tu urbanización"), el horario, "Delivery gratis en Renacer" y un botón "Ver menú".
2. **Combos y promos:** primero, porque es lo que más se vende.
3. **Menú:** Boneless, Tenders, Extras y Bebidas. En cada producto: elegir porción, aderezo y natural o BBQ, y botón "Agregar".
4. **Carrito:** una barra fija abajo en el celular con la cantidad de productos y el total. Al tocarla se abre un panel con:
   - la lista de productos y combos, con botones + / − y quitar (cada producto con su porción, aderezo y natural/BBQ),
   - el selector de urbanización (sección 2.1),
   - nombre, dirección (Mz. y villa) y una nota opcional,
   - el desglose subtotal + envío = total,
   - el botón **"Enviar pedido por WhatsApp"**.
   Guarda el carrito en `localStorage` para que no se pierda si el cliente recarga la página, y vacíalo después de enviar.
5. **Cómo pedir:** 3 pasos simples: arma tu pedido, envíalo por WhatsApp, y te confirmamos el pedido y el tiempo de entrega.
   Abajo, una tabla corta con el costo de envío por urbanización.
6. **Ubicación y horario:** dirección del local, horario y un botón de WhatsApp. Si el local está cerrado según el horario (hora de Ecuador, UTC-5), muestra "Ahora cerrado, abrimos el viernes a las 6 pm", pero deja que igual armen el pedido.
7. **Pie de página:** logo, WhatsApp, "Solo para mayores de 18 años" (si hay alcohol) y el año.

## 6. Requisitos técnicos

- Página estática, sin servidor: **HTML + CSS + JavaScript** sin frameworks (o Astro/Vite si hace falta, pero que el resultado sea estático).
- Diseñada primero para celular y que también se vea bien en computadora.
- Que se pueda publicar gratis en **Netlify, Vercel o GitHub Pages**. Al final, explica en pasos simples cómo publicarla.
- **Fotos:** todavía no hay fotos de los productos. Deja una carpeta `img/` con imágenes de reemplazo (un fondo de color con el nombre del producto) y nombres de archivo claros (`boneless.jpg`, `tenders.jpg`, `michelada.jpg`, etc.) para cambiarlas después.
- Etiquetas para compartir en WhatsApp (Open Graph): título "PikayPasa", descripción corta y una imagen `img/og.jpg` de 1200×630.
- Accesible: buen contraste, botones de al menos 44 px de alto y textos alternativos en las imágenes.

## 7. Lo que no debe salir en la página

- Costos, márgenes, ganancias ni datos de compras o ventas.
- Nombres de clientes.
- Promos que ya terminaron (la promo de apertura de los primeros 5 pedidos ya pasó).

## 8. Pendientes del negocio (preguntar antes de inventar)

- Ciudad exacta para mostrar con la dirección.
- Si hay recargo por bañar los boneless/tenders en BBQ.
- Confirmar el permiso para vender alcohol (por eso existe el interruptor `mostrarAlcohol`).
- Fotos reales de los productos.
- Usuario de Instagram/TikTok/Facebook, si tienen.
